import { useState } from 'react'

import { UnitReturnType } from '@src/types'
import useDelayUnit from '@src/units/useDelayUnit'
import useFilterAllpassUnit from '@src/units/useFilterAllpassUnit'
import useFilterBandpassUnit from '@src/units/useFilterBandpassUnit'
import useFilterHighpassUnit from '@src/units/useFilterHighpassUnit'
import useFilterHighshelfUnit from '@src/units/useFilterHighshelfUnit'
import useFilterLowpassUnit from '@src/units/useFilterLowpassUnit'
import useFilterLowshelfUnit from '@src/units/useFilterLowshelfUnit'
import useFilterNotchUnit from '@src/units/useFilterNotchUnit'
import useFilterPeakingUnit from '@src/units/useFilterPeakingUnit'
import useGainUnit from '@src/units/useGainUnit'
import useReverbUnit from '@src/units/useReverbUnit'

const useUnits = () => {
  const [context, setContext] = useState<AudioContext>()

  const units: UnitReturnType[] = [
    useDelayUnit(),
    useReverbUnit(),
    useFilterNotchUnit(),
    useFilterPeakingUnit(),
    useFilterHighshelfUnit(),
    useFilterLowshelfUnit(),
    useFilterBandpassUnit(),
    useFilterAllpassUnit(),
    useFilterHighpassUnit(),
    useFilterLowpassUnit(),
    useGainUnit(),
  ]

  const unitsHandler = {
    initUnits: async (context: AudioContext) => {
      await Promise.all(units.map(unit => unit.unitHandler.initialize(context)))
      setContext(context)
    },
    connectUnits: (source: AudioBufferSourceNode) => {
      if (!context) return
      let outputNode: AudioNode | undefined

      units.forEach((unit, idx) => {
        if (idx === 0) {
          outputNode = unit.unitHandler.connect(source)
          return
        }
        if (outputNode) {
          outputNode = unit.unitHandler.connect(outputNode)
        }
        if (idx === units.length - 1) {
          outputNode?.connect(context.destination)
        }
      })
    },
    resetUnits: () => {
      units.forEach(unit => unit.unitHandler.reset())
    },
  }

  return { units, unitsHandler }
}

export default useUnits
