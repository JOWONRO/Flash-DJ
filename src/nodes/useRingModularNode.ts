import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

const useRingModularNode = (option: ControllerOption): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    await context.audioWorklet.addModule(
      '/src/processors/ringModularProcessor.ts',
    )
    const ringModular = new AudioWorkletNode(
      context,
      'ring-modulator-processor',
    )
    ringModular.port.postMessage({ sampleRate: context.sampleRate })
    return ringModular
  })

  const frequencyController = useController(option)

  useEffect(() => {
    if (audioNode && context && frequencyController.value !== undefined)
      audioNode.parameters
        .get('frequency')
        ?.setValueAtTime(frequencyController.value, context.currentTime)
  }, [audioNode, context, frequencyController.value])

  return { context, audioNode, handler, controllers: [frequencyController] }
}

export default useRingModularNode
