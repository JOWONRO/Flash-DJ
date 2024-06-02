import { useEffect } from 'react'

import useController from '../hooks/useController'
import useNodeHandler from '../hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '../types'

export interface FilterNodeOptions {
  frequency?: ControllerOption
  q?: ControllerOption
  gain?: ControllerOption
}

const useFilterNode = (
  type: BiquadFilterType,
  options?: FilterNodeOptions,
): NodeReturnType<BiquadFilterNode> => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    const filter = context.createBiquadFilter()
    filter.type = type
    return filter
  })

  const frequencyController = useController(options?.frequency)
  const qController = useController(options?.q)
  const gainController = useController(options?.gain)

  useEffect(() => {
    if (audioNode && context && frequencyController.value !== undefined)
      audioNode.frequency.setValueAtTime(
        frequencyController.value,
        context.currentTime,
      )
  }, [audioNode, context, frequencyController.value])
  useEffect(() => {
    if (audioNode && context && gainController.value !== undefined)
      audioNode.gain.setValueAtTime(gainController.value, context.currentTime)
  }, [audioNode, context, gainController.value])
  useEffect(() => {
    if (audioNode && context && qController.value !== undefined)
      audioNode.Q.setValueAtTime(qController.value, context.currentTime)
  }, [audioNode, context, qController.value])

  return {
    context,
    audioNode,
    handler,
    controllers: [frequencyController, qController, gainController],
  }
}

export default useFilterNode
