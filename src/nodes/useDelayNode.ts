import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

const useDelayNode = (option?: ControllerOption): NodeReturnType => {
  const { audioNode, handler } = useNodeHandler(async context => {
    const node = context.createDelay(option?.max)
    return node
  })

  const delayController = useController(option)

  useEffect(() => {
    if (audioNode && delayController.value !== undefined)
      audioNode.delayTime.value = delayController.value
  }, [audioNode, delayController.value])

  return { audioNode, handler, controllers: [delayController] }
}

export default useDelayNode
