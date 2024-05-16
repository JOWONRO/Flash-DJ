import useUnitHandler from '@src/hooks/useUnitHandler'
import useDelayNode from '@src/nodes/useDelayNode'
import useGainNode from '@src/nodes/useGainNode'
import { UnitType } from '@src/types'

const useDelayUnit: UnitType = (id = 'delay-unit') => {
  const { audioNode: mixNode, handler: mixHandler } = useGainNode()
  const {
    audioNode: delayNode,
    controllers: delayControllers,
    handler: delayHandler,
  } = useDelayNode({
    id: 'Time',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 0.5,
  })
  const {
    audioNode: feedbackNode,
    controllers: feedbackControllers,
    handler: feedbackHandler,
  } = useGainNode({
    id: 'Feedback',
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
    id: 'Wet',
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
    id: 'Dry',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  })

  const controllers = [
    [...delayControllers, ...feedbackControllers],
    wetControllers,
    dryControllers,
  ]

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await mixHandler.initialize(context)
      await delayHandler.initialize(context)
      await feedbackHandler.initialize(context)
      await wetHandler.initialize(context)
      await dryHandler.initialize(context)
    },
    connect: prevNode => {
      if (!mixNode || !delayNode || !feedbackNode || !wetNode || !dryNode)
        return
      prevNode.connect(dryNode)
      prevNode.connect(delayNode)
      delayNode.connect(feedbackNode)
      feedbackNode.connect(delayNode)
      delayNode.connect(wetNode)
      wetNode.connect(mixNode)
      dryNode.connect(mixNode)
      return mixNode
    },
    reset: controllers,
  })

  return { id, controllers, unitHandler }
}

export default useDelayUnit
