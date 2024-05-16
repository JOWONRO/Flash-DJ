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
    if (audioNode && thresholdController.value !== undefined)
      audioNode.threshold.value = thresholdController.value
  }, [audioNode, thresholdController.value])
  useEffect(() => {
    if (audioNode && kneeController.value !== undefined)
      audioNode.knee.value = kneeController.value
  }, [audioNode, kneeController.value])
  useEffect(() => {
    if (audioNode && ratioController.value !== undefined)
      audioNode.ratio.value = ratioController.value
  }, [audioNode, ratioController.value])
  useEffect(() => {
    if (audioNode && attackController.value !== undefined)
      audioNode.attack.value = attackController.value
  }, [audioNode, attackController.value])
  useEffect(() => {
    if (audioNode && releaseController.value !== undefined)
      audioNode.release.value = releaseController.value
  }, [audioNode, releaseController.value])

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
