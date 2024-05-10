import { nanoid } from 'nanoid'

import useFilterNode from '../nodes/useFilterNode'
import { UnitHandler, UnitType } from '../types'

const ID = nanoid()

const useFilterHighpassUnit: UnitType = () => {
  const { audioNode, controllers, handler } = useFilterNode('highpass', {
    frequency: {
      id: 'Filter-Highpass-Cutoff',
      min: 20,
      max: 10000,
      defaultValue: 20,
    },
    q: {
      id: 'Filter-Highpass-Q',
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
    id: `filter-Highpass-${ID}`,
    controllers: [controllers],
    unitHandler,
  }
}

export default useFilterHighpassUnit
