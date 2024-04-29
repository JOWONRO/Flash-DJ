import { useState } from 'react'

const useFilterNotchController = () => {
  const [biquadFilter, setBiquadFilter] = useState<BiquadFilterNode>()

  const config = [
    {
      id: 'filter-notch-center',
      min: 20,
      max: 12000,
      defaultValue: 1000,
    },
    {
      id: 'filter-notch-q',
      min: 0.1,
      max: 10,
      step: 0.01,
      defaultValue: 10,
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
    reset: (filter?: BiquadFilterNode) => {
      const node = filter ?? biquadFilter
      if (!node) return
      node.frequency.value = config[0].defaultValue
      node.Q.value = config[1].defaultValue
    },
    initialize: (context: AudioContext) => {
      const filter = context.createBiquadFilter()
      filter.type = 'notch'
      handler.reset(filter)
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

export default useFilterNotchController
