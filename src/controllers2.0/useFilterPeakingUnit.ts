import { nanoid } from 'nanoid'

import { UnitHandler, UnitType } from './types'
import useFilterNode from './useFilterNode'

const ID = nanoid()

const useFilterPeakingUnit: UnitType = () => {
  const { audioNode, controllers, handler } = useFilterNode('peaking', {
    frequency: {
      id: 'Filter-Peaking-Center',
      min: 20,
      max: 20000,
      defaultValue: 1000,
    },
    gain: {
      id: 'Filter-Peaking-Gain',
      min: -15,
      max: 15,
      defaultValue: 0,
    },
    q: {
      id: 'Filter-Peaking-Q',
      min: 0,
      max: 10,
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
    id: `filter-peaking-${ID}`,
    controllers: [controllers],
    unitHandler,
  }
}

export default useFilterPeakingUnit
