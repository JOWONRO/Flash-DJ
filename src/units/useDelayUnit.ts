import useDelayNode from '@src/nodes/useDelayNode'
import { UnitHandler, UnitType } from '@src/types'

const useDelayUnit: UnitType = (id = 'delay-unit') => {
  const { audioNode, controllers, handler } = useDelayNode({
    id: 'Delay',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 0,
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

  return { id, controllers: [controllers], unitHandler }
}

export default useDelayUnit
