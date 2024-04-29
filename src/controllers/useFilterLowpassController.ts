import { useState } from 'react'

const useFilterLowpassController = () => {
  const [biquadFilter, setBiquadFilter] = useState<BiquadFilterNode>()

  const config = [
    {
      id: 'filter-lowpass',
      min: 500,
      max: 12000,
      defaultValue: 12000,
    },
  ]

  const handler = {
    onChange: {
      [config[0].id]: (value: number) => {
        biquadFilter && (biquadFilter.frequency.value = value)
      },
    },
    reset: (filter?: BiquadFilterNode) => {
      const node = filter ?? biquadFilter
      if (!node) return
      node.frequency.value = config[0].defaultValue
    },
    initialize: (context: AudioContext) => {
      const filter = context.createBiquadFilter()
      filter.type = 'lowpass'
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

export default useFilterLowpassController
