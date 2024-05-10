import { nanoid } from 'nanoid'

import useFilterNode from '../nodes/useFilterNode'
import { UnitHandler, UnitType } from '../types'

const ID = nanoid()

const useFilterNotchUnit: UnitType = () => {
  const { audioNode, controllers, handler } = useFilterNode('notch', {
    frequency: {
      id: 'Filter-Notch-Center',
      min: 20,
      max: 20000,
      defaultValue: 1000,
    },
    q: {
      id: 'Filter-Notch-Q',
      min: 0.1,
      max: 20,
      step: 0.01,
      defaultValue: 20,
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
    id: `filter-Notch-${ID}`,
    controllers: [controllers],
    unitHandler,
  }
}

export default useFilterNotchUnit
