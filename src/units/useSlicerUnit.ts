import useUnitHandler from '@src/hooks/useUnitHandler'
import useSlicerNode from '@src/nodes/useSlicerNode'
import { slicerOptions } from '@src/processors/options'
import { UnitType } from '@src/types'

const { frequency, depth } = slicerOptions

const useSlicerUnit: UnitType = (id = 'slicer-unit') => {
  const { audioNode, controllers, handler } = useSlicerNode({
    frequency: {
      id: 'Frequency',
      defaultValue: frequency.defaultValue,
      max: frequency.maxValue,
      min: frequency.minValue,
      step: 0.1,
    },
    depth: {
      id: 'Depth',
      defaultValue: depth.defaultValue,
      max: depth.maxValue,
      min: depth.minValue,
      step: 0.01,
    },
  })

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default useSlicerUnit
