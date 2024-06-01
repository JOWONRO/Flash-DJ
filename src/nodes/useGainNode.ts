import { useEffect } from 'react'

import useController from '../hooks/useController'
import useNodeHandler from '../hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '../types'

const useGainNode = (option?: ControllerOption): NodeReturnType<GainNode> => {
  const { context, audioNode, handler } = useNodeHandler(async context =>
    context.createGain(),
  )

  const gainController = useController(option)

  useEffect(() => {
    if (audioNode && context && gainController.value !== undefined)
      audioNode.gain.setValueAtTime(gainController.value, context.currentTime)
  }, [audioNode, context, gainController.value])

  return { context, audioNode, handler, controllers: [gainController] }
}

export default useGainNode
