import { useState } from 'react'

const useFilterBandpassController = () => {
  const [biquadFilter, setBiquadFilter] = useState<BiquadFilterNode>()

  const config = [
    {
      id: 'filter-bandpass-center',
      min: 100,
      max: 10000,
      defaultValue: 5000,
    },
    {
      id: 'filter-bandpass-q',
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
        biquadFilter.Q.value = value
      },
    },
    initialize: (context: AudioContext) => {
      const filter = context.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = config[0].defaultValue
      filter.Q.value = config[1].defaultValue
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

export default useFilterBandpassController
