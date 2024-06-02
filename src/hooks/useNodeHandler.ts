import { useState } from 'react'

const useNodeHandler = <T extends AudioNode = AudioNode>(
  initialize: (context: AudioContext) => Promise<T>,
) => {
  const [audioNode, setAudioNode] = useState<T>()
  const [context, setContext] = useState<AudioContext>()

  const handler = {
    initialize: async (context: AudioContext) => {
      const initializedNode = await initialize(context)
      setAudioNode(initializedNode)
      setContext(context)
    },
  }

  return { context, audioNode, handler }
}

export default useNodeHandler
