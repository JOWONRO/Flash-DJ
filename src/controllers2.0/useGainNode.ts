import { useEffect } from 'react'

import { ControllerOption, NodeReturnType } from './types'
import useController from './useController'
import useNodeHandler from './useNodeHandler'

const useGainNode = (option: ControllerOption): NodeReturnType => {
  const gainController = useController(option)

  const { audioNode, handler } = useNodeHandler(context => context.createGain())

  useEffect(() => {
    if (!audioNode || gainController.value === undefined) return
    audioNode.gain.value = gainController.value
  }, [audioNode, gainController.value])

  return { audioNode, handler, controllers: [gainController] }
}

export default useGainNode
