import { useEffect } from 'react'

import useController from '../hooks/useController'
import useNodeHandler from '../hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '../types'

const useGainNode = (option?: ControllerOption): NodeReturnType => {
  const { audioNode, handler } = useNodeHandler(async context => {
    const node = context.createGain()
    node.gain.value = option?.defaultValue ?? 1
    return node
  })

  const gainController = useController(option)

  useEffect(() => {
    if (audioNode && gainController.value !== undefined)
      audioNode.gain.value = gainController.value
  }, [audioNode, gainController.value])

  return { audioNode, handler, controllers: [gainController] }
}

export default useGainNode
