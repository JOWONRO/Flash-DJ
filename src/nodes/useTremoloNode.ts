import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

export interface TremoloNodeOptions {
  frequency?: ControllerOption
  depth?: ControllerOption
}

const useTremoloNode = (options: TremoloNodeOptions): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    await context.audioWorklet.addModule('src/processors/tremoloProcessor.ts')
    const tremolo = new AudioWorkletNode(context, 'tremolo-processor')
    tremolo.port.postMessage({ sampleRate: context.sampleRate })
    return tremolo
  })

  const frequencyController = useController(options.frequency)
  const depthController = useController(options.depth)

  useEffect(() => {
    if (audioNode && context && frequencyController.value !== undefined)
      audioNode.parameters
        .get('frequency')
        ?.setValueAtTime(frequencyController.value, context.currentTime)
  }, [audioNode, context, frequencyController.value])
  useEffect(() => {
    if (audioNode && context && depthController.value !== undefined)
      audioNode.parameters
        .get('depth')
        ?.setValueAtTime(depthController.value, context.currentTime)
  }, [audioNode, context, depthController.value])

  return {
    context,
    audioNode,
    handler,
    controllers: [frequencyController, depthController],
  }
}

export default useTremoloNode
