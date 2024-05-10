import { nanoid } from 'nanoid'

import useFilterNode from '../nodes/useFilterNode'
import { UnitHandler, UnitType } from '../types'

const ID = nanoid()

const useFilterBandpassUnit: UnitType = () => {
  const { audioNode, controllers, handler } = useFilterNode('bandpass', {
    frequency: {
      id: 'Filter-Bandpass-Frequency',
      min: 50,
      max: 15000,
      defaultValue: 1000,
    },
    q: {
      id: 'Filter-Bandpass-Q',
      min: 0.1,
      max: 10,
      step: 0.01,
      defaultValue: 0.1,
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
    id: `filter-Bandpass-${ID}`,
    controllers: [controllers],
    unitHandler,
  }
}

export default useFilterBandpassUnit
