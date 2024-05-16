import useController from './hooks/useController'
import useNodeHandler from './hooks/useNodeHandler'
import useGainUnit from './units/useGainUnit'

export interface ControllerOption {
  id: string
  min: number
  max: number
  step?: number
  defaultValue: number
}

export type ControllerReturnType = ReturnType<typeof useController>
export type NodeHandlerReturnType = ReturnType<typeof useNodeHandler>
export type UnitReturnType = ReturnType<typeof useGainUnit>

export interface NodeReturnType {
  context: NodeHandlerReturnType['context']
  audioNode: NodeHandlerReturnType['audioNode']
  controllers: ControllerReturnType[]
  handler: NodeHandlerReturnType['handler']
}

export interface UnitHandlerOption {
  controllers: ControllerReturnType[][]
  initialize: (context: AudioContext) => Promise<void>
  connect: (node: AudioNode) => AudioNode | undefined
}
export interface UnitHandler {
  initialize: UnitHandlerOption['initialize']
  connect: UnitHandlerOption['connect']
  reset: () => void
}
export type UnitType = (id?: string) => {
  id: string
  controllers: ControllerReturnType[][]
  unitHandler: UnitHandler
}
