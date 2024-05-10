import { nanoid } from 'nanoid'

import useFilterNode from '../nodes/useFilterNode'
import { UnitHandler, UnitType } from '../types'

const ID = nanoid()

const useFilterLowpassUnit: UnitType = () => {
  const { audioNode, controllers, handler } = useFilterNode('lowpass', {
    frequency: {
      id: 'Filter-Lowpass-Cutoff',
      min: 100,
      max: 20000,
      defaultValue: 20000,
    },
    q: {
      id: 'Filter-Lowpass-Q',
      min: 0.7,
      max: 1.5,
      step: 0.01,
      defaultValue: 0.7,
    },
  })

  const unitHandler: UnitHandler = {
    initialize: handler.initialize,
    reset: () => {
      controllers.forEach(controller => controller.handler.reset())
    },
    connect: node => {
      if (!audioNode) return
      node.connect(audioNode)
      return audioNode
    },
  }

  return {
    id: `filter-Lowpass-${ID}`,
    controllers: [controllers],
    unitHandler,
  }
}

export default useFilterLowpassUnit
