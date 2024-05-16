import { useEffect } from 'react'

import useController from '../hooks/useController'
import useNodeHandler from '../hooks/useNodeHandler'
import { ControllerOption, NodeReturnType } from '../types'

export interface PannerNodeOptions {
  positionX?: ControllerOption
  positionY?: ControllerOption
  positionZ?: ControllerOption
  orientationX?: ControllerOption
  orientationY?: ControllerOption
  orientationZ?: ControllerOption
  refDistance?: ControllerOption
  maxDistance?: ControllerOption
  rolloffFactor?: ControllerOption
  coneInnerAngle?: ControllerOption
  coneOuterAngle?: ControllerOption
  coneOuterGain?: ControllerOption
}

const usePannerNode = (
  panningModel: PanningModelType,
  distanceModel: DistanceModelType,
  options: PannerNodeOptions,
): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    const panner = context.createPanner()
    panner.panningModel = panningModel
    panner.distanceModel = distanceModel
    return panner
  })

  const positionXController = useController(options.positionX)
  const positionYController = useController(options.positionY)
  const positionZController = useController(options.positionZ)
  const orientationXController = useController(options.orientationX)
  const orientationYController = useController(options.orientationY)
  const orientationZController = useController(options.orientationZ)
  const refDistanceController = useController(options.refDistance)
  const maxDistanceController = useController(options.maxDistance)
  const rolloffFactorController = useController(options.rolloffFactor)
  const coneInnerAngleController = useController(options.coneInnerAngle)
  const coneOuterAngleController = useController(options.coneOuterAngle)
  const coneOuterGainController = useController(options.coneOuterGain)

  useEffect(() => {
    if (audioNode && context && positionXController.value !== undefined)
      audioNode.positionX.setValueAtTime(
        positionXController.value,
        context.currentTime,
      )
  }, [audioNode, context, positionXController.value])
  useEffect(() => {
    if (audioNode && context && positionYController.value !== undefined)
      audioNode.positionY.setValueAtTime(
        positionYController.value,
        context.currentTime,
      )
  }, [audioNode, context, positionYController.value])
  useEffect(() => {
    if (audioNode && context && positionZController.value !== undefined)
      audioNode.positionZ.setValueAtTime(
        positionZController.value,
        context.currentTime,
      )
  }, [audioNode, context, positionZController.value])
  useEffect(() => {
    if (audioNode && context && orientationXController.value !== undefined)
      audioNode.orientationX.setValueAtTime(
        orientationXController.value,
        context.currentTime,
      )
  }, [audioNode, context, orientationXController.value])
  useEffect(() => {
    if (audioNode && context && orientationYController.value !== undefined)
      audioNode.orientationY.setValueAtTime(
        orientationYController.value,
        context.currentTime,
      )
  }, [audioNode, context, orientationYController.value])
  useEffect(() => {
    if (audioNode && context && orientationZController.value !== undefined)
      audioNode.orientationZ.setValueAtTime(
        orientationZController.value,
        context.currentTime,
      )
  }, [audioNode, context, orientationZController.value])
  useEffect(() => {
    if (audioNode && refDistanceController.value !== undefined)
      audioNode.refDistance = refDistanceController.value
  }, [audioNode, refDistanceController.value])
  useEffect(() => {
    if (audioNode && maxDistanceController.value !== undefined)
      audioNode.maxDistance = maxDistanceController.value
  }, [audioNode, maxDistanceController.value])
  useEffect(() => {
    if (audioNode && rolloffFactorController.value !== undefined)
      audioNode.rolloffFactor = rolloffFactorController.value
  }, [audioNode, rolloffFactorController.value])
  useEffect(() => {
    if (audioNode && coneInnerAngleController.value !== undefined)
      audioNode.coneInnerAngle = coneInnerAngleController.value
  }, [audioNode, coneInnerAngleController.value])
  useEffect(() => {
    if (audioNode && coneOuterAngleController.value !== undefined)
      audioNode.coneOuterAngle = coneOuterAngleController.value
  }, [audioNode, coneOuterAngleController.value])
  useEffect(() => {
    if (audioNode && coneOuterGainController.value !== undefined)
      audioNode.coneOuterGain = coneOuterGainController.value
  }, [audioNode, coneOuterGainController.value])

  return {
    context,
    audioNode,
    handler,
    controllers: [
      positionXController,
      positionYController,
      positionZController,
      orientationXController,
      orientationYController,
      orientationZController,
      refDistanceController,
      maxDistanceController,
      rolloffFactorController,
      coneInnerAngleController,
      coneOuterAngleController,
      coneOuterGainController,
    ],
  }
}

export default usePannerNode
