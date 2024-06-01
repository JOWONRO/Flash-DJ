import useUnitHandler from '@src/hooks/useUnitHandler'
import useStereoPannerNode from '@src/nodes/useStereoPannerNode'
import { UnitType } from '@src/types'

const usePanUnit: UnitType = (id = 'pan-unit') => {
  const { audioNode, controllers, handler } = useStereoPannerNode({
    id: 'Pan',
    defaultValue: 0,
    max: 1,
    min: -1,
    step: 0.01,
  })

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default usePanUnit
