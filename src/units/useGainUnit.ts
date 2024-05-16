import useUnitHandler from '@src/hooks/useUnitHandler'

import useGainNode from '../nodes/useGainNode'
import { UnitType } from '../types'

const useGainUnit: UnitType = (id = 'gain-unit') => {
  const { audioNode, controllers, handler } = useGainNode({
    id: 'Gain',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  })

  const unitHandler = useUnitHandler({
    controllers: [controllers],
    initialize: handler.initialize,
    connect: audioNode,
  })

  return { id, controllers: [controllers], unitHandler }
}

export default useGainUnit
