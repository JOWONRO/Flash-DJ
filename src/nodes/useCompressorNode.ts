import { useEffect } from 'react'

import useController from '../hooks/useController'
import useNodeHandler from '../hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '../types'

export interface CompressorNodeOptions {
  threshold?: ControllerOption
  knee?: ControllerOption
  ratio?: ControllerOption
  attack?: ControllerOption
  release?: ControllerOption
}

const useCompressorNode = (options: CompressorNodeOptions): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context =>
    context.createDynamicsCompressor(),
  )

  const thresholdController = useController(options.threshold)
  const kneeController = useController(options.knee)
  const ratioController = useController(options.ratio)
  const attackController = useController(options.attack)
  const releaseController = useController(options.release)

  useEffect(() => {
    if (audioNode && context && thresholdController.value !== undefined)
      audioNode.threshold.setValueAtTime(
        thresholdController.value,
        context.currentTime,
      )
  }, [audioNode, context, thresholdController.value])
  useEffect(() => {
    if (audioNode && context && kneeController.value !== undefined)
      audioNode.knee.setValueAtTime(kneeController.value, context.currentTime)
  }, [audioNode, context, kneeController.value])
  useEffect(() => {
    if (audioNode && context && ratioController.value !== undefined)
      audioNode.ratio.setValueAtTime(ratioController.value, context.currentTime)
  }, [audioNode, context, ratioController.value])
  useEffect(() => {
    if (audioNode && context && attackController.value !== undefined)
      audioNode.attack.setValueAtTime(
        attackController.value,
        context.currentTime,
      )
  }, [audioNode, context, attackController.value])
  useEffect(() => {
    if (audioNode && context && releaseController.value !== undefined)
      audioNode.release.setValueAtTime(
        releaseController.value,
        context.currentTime,
      )
  }, [audioNode, context, releaseController.value])

  return {
    context,
    audioNode,
    handler,
    controllers: [
      thresholdController,
      kneeController,
      ratioController,
      attackController,
      releaseController,
    ],
  }
}

export default useCompressorNode
