import { useState } from 'react'

import useFilterBandpassController from '@src/controllers/useFilterBandpassController'
import useFilterHighpassController from '@src/controllers/useFilterHighpassController'
import useFilterLowpassController from '@src/controllers/useFilterLowpassController'
import useGainController from '@src/controllers/useGainController'

const useControllers = () => {
  const [context, setContext] = useState<AudioContext>()

  const controllers = [
    useFilterBandpassController(),
    useFilterLowpassController(),
    useFilterHighpassController(),
    useGainController(),
  ]

  const controllersHandler = {
    initControllers: (context: AudioContext) => {
      controllers.forEach(controller => controller.handler.initialize(context))
      setContext(context)
    },
    connectControllers: (source: AudioBufferSourceNode) => {
      if (!context) return
      controllers.forEach((controller, idx) => {
        const currentNode = controller.node
        if (!currentNode) return
        if (idx === 0) {
          currentNode && source.connect(currentNode)
        } else {
          const preNode = controllers[idx - 1].node
          preNode && preNode.connect(currentNode)
        }
        if (idx === controllers.length - 1) {
          currentNode.connect(context.destination)
        }
      })
    },
  }

  return { controllers, controllersHandler }
}

export default useControllers
