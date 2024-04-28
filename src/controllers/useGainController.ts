import { ChangeEvent, useState } from 'react'

const useGainController = () => {
  const [gainNode, setGainNode] = useState<GainNode>()

  const config = {
    id: 'gain',
    min: 0,
    max: 2,
    step: 0.01,
    defaultValue: 1,
  }

  const handler = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const volume = event.target.valueAsNumber
      if (gainNode) {
        gainNode.gain.value = volume
      }
    },
    initialize: (context: AudioContext) => {
      const gain = context.createGain()
      gain.connect(context.destination)
      setGainNode(gain)
    },
    connect: (node: AudioBufferSourceNode) => {
      gainNode && node.connect(gainNode)
    },
  }

  return {
    config,
    handler,
  }
}

export default useGainController
