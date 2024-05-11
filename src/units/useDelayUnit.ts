import useDelayNode from '@src/nodes/useDelayNode'
import useGainNode from '@src/nodes/useGainNode'
import { UnitHandler, UnitType } from '@src/types'

const useDelayUnit: UnitType = (id = 'delay-unit') => {
  const { audioNode: mixNode, handler: mixHandler } = useGainNode()
  const {
    audioNode: delayNode,
    controllers: delayController,
    handler: delayHandler,
  } = useDelayNode({
    id: 'Delay-Time',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 0.5,
  })
  const {
    audioNode: feedbackNode,
    controllers: feedbackController,
    handler: feedbackHandler,
  } = useGainNode({
    id: 'Delay-Feedback',
    min: 0,
    max: 0.9,
    step: 0.01,
    defaultValue: 0,
  })
  const {
    audioNode: wetNode,
    controllers: wetControllers,
    handler: wetHandler,
  } = useGainNode({
    id: 'Delay-Wet',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0,
  })
  const {
    audioNode: dryNode,
    controllers: dryControllers,
    handler: dryHandler,
  } = useGainNode({
    id: 'Delay-Dry',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  })

  const unitHandler: UnitHandler = {
    initialize: async context => {
      await mixHandler.initialize(context)
      await delayHandler.initialize(context)
      await feedbackHandler.initialize(context)
      await wetHandler.initialize(context)
      await dryHandler.initialize(context)
    },
    reset: () => {
      delayController.forEach(controller => controller.handler.reset())
      feedbackController.forEach(controller => controller.handler.reset())
      wetControllers.forEach(controller => controller.handler.reset())
      dryControllers.forEach(controller => controller.handler.reset())
    },
    connect: node => {
      if (!mixNode || !delayNode || !feedbackNode || !wetNode || !dryNode)
        return
      node.connect(dryNode)
      node.connect(delayNode)
      delayNode.connect(feedbackNode)
      feedbackNode.connect(delayNode)
      delayNode.connect(wetNode)
      wetNode.connect(mixNode)
      dryNode.connect(mixNode)
      return mixNode
    },
  }

  return {
    id,
    controllers: [
      [...delayController, ...feedbackController],
      wetControllers,
      dryControllers,
    ],
    unitHandler,
  }
}

export default useDelayUnit
