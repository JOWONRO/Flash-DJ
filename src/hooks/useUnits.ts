import { useState } from 'react'

import useFilterPeakingUnit from '@src/controllers2.0/useFilterPeakingUnit'
import useGainUnit from '@src/controllers2.0/useGainUnit'

const useUnits = () => {
  const [context, setContext] = useState<AudioContext>()

  const units = [
    useFilterPeakingUnit(),
    useGainUnit(),
    // useFilterNotchController(),
    // useFilterPeakingController(),
    // useFilterHighshelfController(),
    // useFilterLowshelfController(),
    // useFilterBandpassController(),
    // useFilterLowpassController(),
    // useFilterHighpassController(),
    // useGainController(),
  ]

  const unitsHandler = {
    initUnits: (context: AudioContext) => {
      units.forEach(unit => unit.unitHandler.initialize(context))
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
        // const currentNode = unit.audioNode
        // if (!currentNode) return
        // if (idx === 0) {
        //   currentNode && source.connect(currentNode)
        // } else {
        //   const preNode = units[idx - 1].audioNode
        //   preNode && preNode.connect(currentNode)
        // }
        // if (idx === units.length - 1) {
        //   currentNode.connect(context.destination)
        // }
      })
    },
    resetUnits: () => {
      units.forEach(unit => unit.unitHandler.reset())
    },
  }

  return { units, unitsHandler }
}

export default useUnits
