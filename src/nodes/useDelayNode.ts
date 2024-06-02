import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

const useDelayNode = (option?: ControllerOption): NodeReturnType<DelayNode> => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    const node = context.createDelay(option?.max)
    return node
  })

  const delayController = useController(option)

  useEffect(() => {
    if (audioNode && context && delayController.value !== undefined)
      audioNode.delayTime.setValueAtTime(
        delayController.value,
        context.currentTime,
      )
  }, [audioNode, context, delayController.value])

  return { context, audioNode, handler, controllers: [delayController] }
}

export default useDelayNode
