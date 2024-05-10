import useController from './hooks/useController'
import useNodeHandler from './hooks/useNodeHandler'

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
  initialize: (context: AudioContext) => Promise<void>
  reset: () => void
  connect: (node: AudioNode) => AudioNode | undefined
}

export type UnitType = () => {
  id: string
  controllers: ControllerReturnType[][]
  unitHandler: UnitHandler
}
