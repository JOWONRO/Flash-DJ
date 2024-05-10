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
  options: FilterNodeOptions,
): NodeReturnType => {
  const { audioNode, handler } = useNodeHandler(async context => {
    const filter = context.createBiquadFilter()
    filter.type = type
    return filter
  })

  const frequencyController = useController(options.frequency)
  const qController = useController(options.q)
  const gainController = useController(options.gain)

  useEffect(() => {
    if (audioNode && frequencyController.value !== undefined)
      audioNode.frequency.value = frequencyController.value
  }, [audioNode, frequencyController.value])
  useEffect(() => {
    if (audioNode && gainController.value !== undefined)
      audioNode.gain.value = gainController.value
  }, [audioNode, gainController.value])
  useEffect(() => {
    if (audioNode && qController.value !== undefined)
      audioNode.Q.value = qController.value
  }, [audioNode, qController.value])

  return {
    audioNode,
    handler,
    controllers: [frequencyController, qController, gainController],
  }
}

export default useFilterNode
