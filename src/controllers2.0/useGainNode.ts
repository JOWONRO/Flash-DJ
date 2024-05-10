import { ControllerOption, NodeReturnType } from './types'
import useController from './useController'
import useNodeHandler from './useNodeHandler'

const useGainNode = (option: ControllerOption): NodeReturnType => {
  const { audioNode, handler } = useNodeHandler(context => context.createGain())

  const gainController = useController(value => {
    if (audioNode) audioNode.gain.value = value
  }, option)

  return { audioNode, handler, controllers: [gainController] }
}

export default useGainNode
