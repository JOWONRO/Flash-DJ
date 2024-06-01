import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

const useStereoPannerNode = (option: ControllerOption): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context =>
    context.createStereoPanner(),
  )

  const stereoPannerController = useController(option)

  useEffect(() => {
    if (audioNode && context && stereoPannerController.value !== undefined)
      audioNode.pan.setValueAtTime(
        stereoPannerController.value,
        context.currentTime,
      )
  }, [audioNode, context, stereoPannerController.value])

  return { context, audioNode, handler, controllers: [stereoPannerController] }
}

export default useStereoPannerNode
