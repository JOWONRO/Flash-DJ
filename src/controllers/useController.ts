import { useState } from 'react'

export interface ControllerConfig<T extends AudioNode = AudioNode> {
  id: string
  min: number
  max: number
  step?: number
  defaultValue: number
  onChange: (node: T, value: number) => void
  onReset: (node: T) => void
}
export type ControllerInitialize<T extends AudioNode = AudioNode> = (
  context: AudioContext,
) => T
export interface ControllerOption<T extends AudioNode = AudioNode> {
  config: ControllerConfig<T>[]
  initialize: ControllerInitialize<T>
}

const useController = <T extends AudioNode = AudioNode>(
  option: ControllerOption<T>,
) => {
  const [audioNode, setAudioNode] = useState<T>()

  const handler = {
    onChange: (config: ControllerConfig, value: number) => {
      if (audioNode) {
        config.onChange(audioNode, value)
      }
    },
    reset: () => {
      if (audioNode) {
        option.config.forEach(c => c.onReset(audioNode))
      }
    },
    initialize: (context: AudioContext) => {
      const node = option.initialize(context)
      option.config.forEach(c => c.onReset(node))
      setAudioNode(node)
    },
    connect: (node: AudioNode) => {
      if (audioNode) {
        node.connect(audioNode)
      }
    },
  }

  return {
    audioNode: audioNode as AudioNode | undefined,
    config: option.config as ControllerConfig[],
    handler: handler,
  }
}

export default useController
