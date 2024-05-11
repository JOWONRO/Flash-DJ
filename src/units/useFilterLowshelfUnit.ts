import useFilterNode from '../nodes/useFilterNode'
import { UnitHandler, UnitType } from '../types'

const useFilterLowshelfUnit: UnitType = (id = 'filter-lowshelf-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('lowshelf', {
    frequency: {
      id: 'Filter-Lowshelf-Frequency',
      min: 100,
      max: 1000,
      defaultValue: 100,
    },
    gain: {
      id: 'Filter-Lowshelf-Gain',
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
    id,
    controllers: [controllers],
    unitHandler,
  }
}

export default useFilterLowshelfUnit