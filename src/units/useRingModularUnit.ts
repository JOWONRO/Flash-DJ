import useUnitHandler from '@src/hooks/useUnitHandler'
import useRingModularNode from '@src/nodes/useRingModularNode'
import { ringModularOptions } from '@src/processors/options'
import { UnitType } from '@src/types'

const { frequency } = ringModularOptions

const useRingModularUnit: UnitType = (id = 'ring-modular-unit') => {
  const { audioNode, controllers, handler } = useRingModularNode({
    id: 'Frequency',
    defaultValue: frequency.defaultValue,
    min: frequency.minValue,
    max: frequency.maxValue,
  })

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default useRingModularUnit
