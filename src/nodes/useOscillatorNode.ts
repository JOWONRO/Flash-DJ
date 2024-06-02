import { useEffect } from 'react'

import useController from '@src/hooks/useController'
import useNodeHandler from '@src/hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '@src/types'

export interface OscillatorNodeOptions {
  frequency?: ControllerOption
  detune?: ControllerOption
}

const useOscillatorNode = (
  type: OscillatorType,
  options: OscillatorNodeOptions,
): NodeReturnType => {
  const { audioNode, context, handler } = useNodeHandler(async context => {
    const oscillator = context.createOscillator()
    oscillator.type = type
    oscillator.start()
    return oscillator
  })

  const frequencyController = useController(options.frequency)
  const detuneController = useController(options.detune)

  useEffect(() => {
    if (audioNode && context && frequencyController.value !== undefined)
      audioNode.frequency.setValueAtTime(
        frequencyController.value,
        context.currentTime,
      )
  }, [audioNode, context, frequencyController.value])
  useEffect(() => {
    if (audioNode && context && detuneController.value !== undefined)
      audioNode.detune.setValueAtTime(
        detuneController.value,
        context.currentTime,
      )
  }, [audioNode, context, detuneController.value])

  return {
    context,
    audioNode,
    handler,
    controllers: [frequencyController, detuneController],
  }
}

export default useOscillatorNode
