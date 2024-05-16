import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { DistortionCurve } from '@src/static/distortionCurves'
import { ControllerOption, NodeReturnType } from '@src/types'

const useWaveShaperNode = (
  curve: DistortionCurve,
  oversample: OverSampleType,
  option?: ControllerOption,
): NodeReturnType => {
  const { audioNode, context, handler } = useNodeHandler(async context => {
    const waveShaper = context.createWaveShaper()
    waveShaper.oversample = oversample
    return waveShaper
  })

  const amountController = useController(option)

  useEffect(() => {
    if (audioNode && amountController.value !== undefined)
      audioNode.curve = curve.getCurve(amountController.value)
  }, [audioNode, amountController.value, curve])

  return { audioNode, context, controllers: [amountController], handler }
}

export default useWaveShaperNode
