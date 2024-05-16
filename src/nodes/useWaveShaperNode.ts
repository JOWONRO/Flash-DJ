import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { DistortionCurve } from '@src/static/distortionCurves'
import { NodeReturnType } from '@src/types'

const useWaveShaperNode = (
  curve: DistortionCurve,
  oversample: OverSampleType,
  onChange?: (value: number) => void,
): NodeReturnType => {
  const { audioNode, context, handler } = useNodeHandler(async context => {
    const waveShaper = context.createWaveShaper()
    waveShaper.oversample = oversample
    return waveShaper
  })

  const controller = useController(curve.option)

  useEffect(() => {
    if (audioNode && controller.value !== undefined) {
      audioNode.curve = curve.getCurve(controller.value)
      onChange?.(controller.value)
    }
  }, [audioNode, controller.value, curve, onChange])

  return { audioNode, context, controllers: [controller], handler }
}

export default useWaveShaperNode
