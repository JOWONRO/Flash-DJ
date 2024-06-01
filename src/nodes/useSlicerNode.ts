import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption } from '@src/types'

export interface SlicerNodeOptions {
  frequency?: ControllerOption
  depth?: ControllerOption
}

const useSlicerNode = (options: SlicerNodeOptions) => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    await context.audioWorklet.addModule('src/processors/slicerProcessor.ts')
    const slicer = new AudioWorkletNode(context, 'slicer-processor')
    slicer.port.postMessage({ sampleRate: context.sampleRate })
    return slicer
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

export default useSlicerNode
