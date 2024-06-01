import useUnitHandler from '@src/hooks/useUnitHandler'
import useTremoloNode from '@src/nodes/useTremoloNode'
import { tremoloOptions } from '@src/processors/options'
import { UnitType } from '@src/types'

const { frequency, depth } = tremoloOptions

const useTremoloUnit: UnitType = (id = 'tremolo-unit') => {
  const { audioNode, controllers, handler } = useTremoloNode({
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

export default useTremoloUnit
