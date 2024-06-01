import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

export interface PhaserNodeOptions {
  rate?: ControllerOption
  depth?: ControllerOption
  feedback?: ControllerOption
}

const usePhaserNode = (options: PhaserNodeOptions): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    await context.audioWorklet.addModule('src/processors/phaserProcessor.ts')
    const phaser = new AudioWorkletNode(context, 'phaser-processor')
    phaser.port.postMessage({ sampleRate: context.sampleRate })
    return phaser
  })

  const rateController = useController(options.rate)
  const depthController = useController(options.depth)
  const feedbackController = useController(options.feedback)

  useEffect(() => {
    if (audioNode && context && rateController.value !== undefined)
      audioNode.parameters
        .get('rate')
        ?.setValueAtTime(rateController.value, context.currentTime)
  }, [audioNode, context, rateController.value])
  useEffect(() => {
    if (audioNode && context && depthController.value !== undefined)
      audioNode.parameters
        .get('depth')
        ?.setValueAtTime(depthController.value, context.currentTime)
  }, [audioNode, context, depthController.value])
  useEffect(() => {
    if (audioNode && context && feedbackController.value !== undefined)
      audioNode.parameters
        .get('feedback')
        ?.setValueAtTime(feedbackController.value, context.currentTime)
  }, [audioNode, context, feedbackController.value])

  return {
    context,
    audioNode,
    handler,
    controllers: [rateController, depthController, feedbackController],
  }
}

export default usePhaserNode
