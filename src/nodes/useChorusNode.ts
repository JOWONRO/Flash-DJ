import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

export interface ChorusNodeOptions {
  delayTime?: ControllerOption
  depth?: ControllerOption
  rate?: ControllerOption
}

const useChorusNode = (options: ChorusNodeOptions): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    await context.audioWorklet.addModule('src/processors/chorusProcessor.ts')
    const chorus = new AudioWorkletNode(context, 'chorus-processor')
    chorus.port.postMessage({ sampleRate: context.sampleRate })
    return chorus
  })

  const delayTimeController = useController(options.delayTime)
  const depthController = useController(options.depth)
  const rateController = useController(options.rate)

  useEffect(() => {
    if (audioNode && context && delayTimeController.value !== undefined)
      audioNode.parameters
        .get('delayTime')
        ?.setValueAtTime(delayTimeController.value, context.currentTime)
  }, [audioNode, context, delayTimeController.value])
  useEffect(() => {
    if (audioNode && context && depthController.value !== undefined)
      audioNode.parameters
        .get('depth')
        ?.setValueAtTime(depthController.value, context.currentTime)
  }, [audioNode, context, depthController.value])
  useEffect(() => {
    if (audioNode && context && rateController.value !== undefined)
      audioNode.parameters
        .get('rate')
        ?.setValueAtTime(rateController.value, context.currentTime)
  }, [audioNode, context, rateController.value])

  return {
    context,
    audioNode,
    handler,
    controllers: [delayTimeController, depthController, rateController],
  }
}

export default useChorusNode
