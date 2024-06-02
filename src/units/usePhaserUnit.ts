import useUnitHandler from '@src/hooks/useUnitHandler'
import useFilterNode from '@src/nodes/useFilterNode'
import useGainNode from '@src/nodes/useGainNode'
import useOscillatorNode from '@src/nodes/useOscillatorNode'
import { UnitType } from '@src/types'

const usePhaserUnit: UnitType = (id = 'phaser-unit') => {
  const { audioNode: gainNode, handler: gainHandler } = useGainNode()
  const {
    audioNode: lfoNode,
    controllers: lfoControllers,
    handler: lfoHandler,
  } = useOscillatorNode('sine', {
    frequency: {
      id: 'Frequency',
      defaultValue: 0,
      max: 20,
      min: 0,
      step: 0.1,
    },
  })
  const {
    audioNode: lfoGainNode,
    controllers: lfoGainControllers,
    handler: lfoGainHandler,
  } = useGainNode({
    id: 'Depth',
    defaultValue: 0,
    max: 1000,
    min: 0,
    step: 10,
  })
  const {
    audioNode: feedbackNode,
    controllers: feedbackControllers,
    handler: feedbackHandler,
  } = useGainNode({
    id: 'Feedback',
    defaultValue: 0,
    max: 1,
    min: 0,
    step: 0.01,
  })
  const filterNodes = [
    useFilterNode('allpass'),
    useFilterNode('allpass'),
    useFilterNode('allpass'),
    useFilterNode('allpass'),
    useFilterNode('allpass'),
  ]

  const controllers = [lfoControllers, lfoGainControllers, feedbackControllers]

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await gainHandler.initialize(context)
      await lfoHandler.initialize(context)
      await lfoGainHandler.initialize(context)
      await feedbackHandler.initialize(context)
      filterNodes.forEach(async node => await node.handler.initialize(context))
    },
    connect: prevNode => {
      if (!gainNode || !lfoNode || !lfoGainNode || !feedbackNode) return
      if (filterNodes.some(node => !node.audioNode)) return
      lfoNode.connect(lfoGainNode)
      filterNodes.forEach(node =>
        lfoGainNode.connect((node.audioNode as BiquadFilterNode).frequency),
      )
      prevNode.connect(filterNodes[0].audioNode as BiquadFilterNode)
      for (let i = 0; i < filterNodes.length - 1; i++) {
        filterNodes[i].audioNode?.connect(
          filterNodes[i + 1].audioNode as BiquadFilterNode,
        )
      }
      filterNodes[filterNodes.length - 1].audioNode?.connect(feedbackNode)
      feedbackNode.connect(filterNodes[0].audioNode as BiquadFilterNode)
      filterNodes[filterNodes.length - 1].audioNode?.connect(gainNode)
      return gainNode
    },
    reset: controllers,
  })

  return { id, controllers, unitHandler }
}

export default usePhaserUnit
