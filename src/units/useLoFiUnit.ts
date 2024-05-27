import useUnitHandler from '@src/hooks/useUnitHandler'
import useBitCrusherNode from '@src/nodes/useBitCrusherNode'
import useFilterNode from '@src/nodes/useFilterNode'
import { UnitType } from '@src/types'

const useLoFiUnit: UnitType = (id = 'lofi-unit') => {
  const {
    audioNode: bitCrusherNode,
    controllers: bitCrusherControllers,
    handler: bitCrusherHandler,
  } = useBitCrusherNode({
    bitDepth: {
      id: 'Bit Depth',
      defaultValue: 16,
      max: 16,
      min: 1,
    },
    frequency: {
      id: 'Frequency',
      defaultValue: 1,
      max: 1,
      min: 0.01,
      step: 0.01,
    },
  })
  const {
    audioNode: filterNode,
    controllers: filterControllers,
    handler: filterHandler,
  } = useFilterNode('lowpass', {
    frequency: {
      id: 'Low Pass Frequency',
      defaultValue: 20000,
      max: 20000,
      min: 100,
    },
  })

  const controllers = [bitCrusherControllers, filterControllers]

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await bitCrusherHandler.initialize(context)
      await filterHandler.initialize(context)
    },
    connect: prevNode => {
      if (!bitCrusherNode || !filterNode) return
      prevNode.connect(bitCrusherNode)
      bitCrusherNode.connect(filterNode)
      return filterNode
    },
    reset: controllers,
  })

  return { id, controllers, unitHandler }
}

export default useLoFiUnit
