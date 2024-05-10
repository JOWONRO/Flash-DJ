import useController from './useController'
import useNodeHandler from './useNodeHandler'

export interface ControllerOption {
  id: string
  min: number
  max: number
  step?: number
  defaultValue: number
}

export type ControllerReturnType = ReturnType<typeof useController>
export type NodeHandlerReturnType = ReturnType<typeof useNodeHandler>

export interface NodeReturnType {
  audioNode: NodeHandlerReturnType['audioNode']
  controllers: ControllerReturnType[]
  handler: NodeHandlerReturnType['handler']
}

export interface UnitHandler {
  initialize: (context: AudioContext) => void
  reset: () => void
  connect: (node: AudioNode) => AudioNode | undefined
}

export type UnitType = () => {
  // inputNode: NodeHandlerReturnType['audioNode']
  // outputNode: NodeHandlerReturnType['audioNode']
  controllers: ControllerReturnType[][]
  unitHandler: UnitHandler
}
