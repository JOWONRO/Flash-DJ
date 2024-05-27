import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

export interface BitCrusherNodeOptions {
  bitDepth: ControllerOption
  frequency: ControllerOption
}

const useBitCrusherNode = (options: BitCrusherNodeOptions): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    await context.audioWorklet.addModule('/src/static/bitCrusher.ts')
    const bitCrusher = new AudioWorkletNode(context, 'bit-crusher-processor')
    return bitCrusher
  })

  const bitDepthController = useController(options.bitDepth)
  const frequencyController = useController(options.frequency)

  useEffect(() => {
    if (audioNode && context && bitDepthController.value !== undefined)
      audioNode.parameters
        .get('bitDepth')
        ?.setValueAtTime(bitDepthController.value, context.currentTime)
  }, [audioNode, bitDepthController.value, context])
  useEffect(() => {
    if (audioNode && context && frequencyController.value !== undefined)
      audioNode.parameters
        .get('frequency')
        ?.setValueAtTime(frequencyController.value, context.currentTime)
  }, [audioNode, frequencyController.value, context])

  return {
    context,
    audioNode,
    handler,
    controllers: [bitDepthController, frequencyController],
  }
}

export default useBitCrusherNode
