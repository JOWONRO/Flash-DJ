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

  const frequencyController = useController(value => {
    if (audioNode) audioNode.frequency.value = value
  }, options.frequency)
  const qController = useController(value => {
    if (audioNode) audioNode.Q.value = value
  }, options.q)
  const gainController = useController(value => {
    if (audioNode) audioNode.gain.value = value
  }, options.gain)

  return {
    audioNode,
    handler,
    controllers: [frequencyController, qController, gainController],
  }
}

export default useFilterNode
