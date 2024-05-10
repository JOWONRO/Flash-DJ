import { nanoid } from 'nanoid'

import useGainNode from '../nodes/useGainNode'
import { UnitHandler, UnitType } from '../types'

const ID = nanoid()

const useGainUnit: UnitType = () => {
  const { audioNode, controllers, handler } = useGainNode({
    id: 'Gain',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
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
    id: `gain-${ID}`,
    controllers: [controllers],
    unitHandler,
  }
}

export default useGainUnit
