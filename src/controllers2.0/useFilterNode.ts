import { useEffect } from 'react'

import { ControllerOption, NodeReturnType } from './types'
import useController from './useController'
import useNodeHandler from './useNodeHandler'

export interface FilterNodeOptions {
  frequency?: ControllerOption
  q?: ControllerOption
  gain?: ControllerOption
}

const useFilterNode = (
  type: BiquadFilterType,
  options: FilterNodeOptions,
): NodeReturnType => {
  const frequencyController = useController(options.frequency)
  const qController = useController(options.q)
  const gainController = useController(options.gain)

  const { audioNode, handler } = useNodeHandler(context => {
    const filter = context.createBiquadFilter()
    filter.type = type
    return filter
  })

  useEffect(() => {
    if (!audioNode || frequencyController.value === undefined) return
    audioNode.frequency.value = frequencyController.value
  }, [audioNode, frequencyController.value])
  useEffect(() => {
    if (!audioNode || qController.value === undefined) return
    audioNode.Q.value = qController.value
  }, [audioNode, qController.value])
  useEffect(() => {
    if (!audioNode || gainController.value === undefined) return
    audioNode.gain.value = gainController.value
  }, [audioNode, gainController.value])

  return {
    audioNode,
    handler,
    controllers: [frequencyController, qController, gainController],
  }
}

export default useFilterNode
