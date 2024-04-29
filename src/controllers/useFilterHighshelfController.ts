import { useState } from 'react'

const useFilterHighshelfController = () => {
  const [biquadFilter, setBiquadFilter] = useState<BiquadFilterNode>()

  const config = [
    {
      id: 'filter-highshelf-cutoff',
      min: 2000,
      max: 12000,
      defaultValue: 12000,
    },
    {
      id: 'filter-highshelf-gain',
      min: -20,
      max: 20,
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
    },
    reset: (filter?: BiquadFilterNode) => {
      const node = filter ?? biquadFilter
      if (!node) return
      node.frequency.value = config[0].defaultValue
      node.gain.value = config[1].defaultValue
    },
    initialize: (context: AudioContext) => {
      const filter = context.createBiquadFilter()
      filter.type = 'highshelf'
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

export default useFilterHighshelfController
