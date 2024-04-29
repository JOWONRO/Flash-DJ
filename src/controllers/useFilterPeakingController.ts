import { useState } from 'react'

const useFilterPeakingController = () => {
  const [biquadFilter, setBiquadFilter] = useState<BiquadFilterNode>()

  const config = [
    {
      id: 'filter-peaking-center',
      min: 20,
      max: 12000,
      defaultValue: 12000,
    },
    {
      id: 'filter-peaking-gain',
      min: -20,
      max: 20,
      defaultValue: 0,
    },
    {
      id: 'filter-peaking-q',
      min: 0,
      max: 10,
      step: 0.01,
      defaultValue: 0,
    },
  ]

  const handler = {
    onChange: {
      [config[0].id]: (value: number) => {
        if (!biquadFilter) return
        biquadFilter.frequency.value = value
      },
      [config[1].id]: (value: number) => {
        if (!biquadFilter) return
        biquadFilter.gain.value = value
      },
      [config[2].id]: (value: number) => {
        if (!biquadFilter) return
        biquadFilter.Q.value = value
      },
    },
    initialize: (context: AudioContext) => {
      const filter = context.createBiquadFilter()
      filter.type = 'peaking'
      filter.frequency.value = config[0].defaultValue
      filter.gain.value = config[1].defaultValue
      filter.Q.value = config[2].defaultValue
      setBiquadFilter(filter)
    },
    connect: (node: AudioNode) => {
      biquadFilter && node.connect(biquadFilter)
    },
  }

  return {
    node: biquadFilter,
    config,
    handler,
  }
}

export default useFilterPeakingController
