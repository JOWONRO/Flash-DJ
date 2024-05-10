import { nanoid } from 'nanoid'

import useFilterNode from '../nodes/useFilterNode'
import { UnitHandler, UnitType } from '../types'

const ID = nanoid()

const useFilterHighshelfUnit: UnitType = () => {
  const { audioNode, controllers, handler } = useFilterNode('highshelf', {
    frequency: {
      id: 'Filter-Highshelf-Frequency',
      min: 2000,
      max: 15000,
      defaultValue: 10000,
    },
    gain: {
      id: 'Filter-Highshelf-Gain',
      min: -15,
      max: 15,
      step: 0.01,
      defaultValue: 0,
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
    id: `filter-Highshelf-${ID}`,
    controllers: [controllers],
    unitHandler,
  }
}

export default useFilterHighshelfUnit
