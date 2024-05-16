import useUnitHandler from '@src/hooks/useUnitHandler'
import usePannerNode from '@src/nodes/usePannerNode'
import { UnitType } from '@src/types'

const usePannerDefaultUnit: UnitType = (id = 'panner-default-unit') => {
  const { audioNode, controllers, handler } = usePannerNode(
    'equalpower',
    'inverse',
    {
      positionX: {
        id: 'Position-X',
        min: -10,
        max: 10,
        step: 0.1,
        defaultValue: 0,
      },
      positionY: {
        id: 'Position-Y',
        min: -10,
        max: 10,
        step: 0.1,
        defaultValue: 0,
      },
      positionZ: {
        id: 'Position-Z',
        min: -10,
        max: 10,
        step: 0.1,
        defaultValue: 0,
      },
      refDistance: {
        id: 'Ref Distance',
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 1,
      },
      maxDistance: {
        id: 'Max Distance',
        min: 0,
        max: 10000,
        step: 100,
        defaultValue: 10000,
      },
      rolloffFactor: {
        id: 'Rolloff Factor',
        min: 0,
        max: 10,
        step: 0.1,
        defaultValue: 1,
      },
      coneInnerAngle: {
        id: 'Cone Inner Angle',
        min: 0,
        max: 360,
        step: 1,
        defaultValue: 360,
      },
      coneOuterAngle: {
        id: 'Cone Outer Angle',
        min: 0,
        max: 360,
        step: 1,
        defaultValue: 360,
      },
      coneOuterGain: {
        id: 'Cone Outer Gain',
        min: 0,
        max: 1,
        step: 0.01,
        defaultValue: 0,
      },
    },
  )

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default usePannerDefaultUnit
