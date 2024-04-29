import { useState } from 'react'

const useFilterHighpassController = () => {
  const [biquadFilter, setBiquadFilter] = useState<BiquadFilterNode>()

  const config = [
    {
      id: 'filter-highpass',
      min: 20,
      max: 5000,
      defaultValue: 20,
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
      filter.type = 'highpass'
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

export default useFilterHighpassController
