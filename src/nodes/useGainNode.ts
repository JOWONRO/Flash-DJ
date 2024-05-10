import useController from '../hooks/useController'
import useNodeHandler from '../hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '../types'

const useGainNode = (option?: ControllerOption): NodeReturnType => {
  const { audioNode, handler } = useNodeHandler(async context =>
    context.createGain(),
  )

  const gainController = useController(value => {
    if (audioNode) audioNode.gain.value = value
  }, option)

  return { audioNode, handler, controllers: [gainController] }
}

export default useGainNode
