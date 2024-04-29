import { useState } from 'react'

import useFilterBandpassController from '@src/controllers/useFilterBandpassController'
import useFilterHighpassController from '@src/controllers/useFilterHighpassController'
import useFilterHighshelfController from '@src/controllers/useFilterHighshelfController'
import useFilterLowpassController from '@src/controllers/useFilterLowpassController'
import useFilterLowshelfController from '@src/controllers/useFilterLowshelfController'
import useFilterNotchController from '@src/controllers/useFilterNotchController'
import useFilterPeakingController from '@src/controllers/useFilterPeakingController'
import useGainController from '@src/controllers/useGainController'

const useControllers = () => {
  const [context, setContext] = useState<AudioContext>()

  const controllers = [
    useFilterNotchController(),
    useFilterPeakingController(),
    useFilterHighshelfController(),
    useFilterLowshelfController(),
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
    resetControllers: () => {
      controllers.forEach(controller => controller.handler.reset())
    },
  }

  return { controllers, controllersHandler }
}

export default useControllers
