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
export interface Controller {
  value: number | undefined
  handler: {
    onChange: (value: number) => void
    reset: () => void
  }
  option: ControllerOption | undefined
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

export interface UnitHandlerParams {
  /**
   * If you want to use the default reset function, use a (ControllerReturnType[][]) object.
   */
  reset: ControllerReturnType[][] | (() => void)
  initialize: (context: AudioContext) => Promise<void>
  /**
   * If you want to use the default connect function, use an (AudioNode | undefined) object.
   */
  connect:
    | (AudioNode | undefined)
    | ((prevNode: AudioNode) => AudioNode | undefined)
}
export interface UnitHandler {
  initialize: UnitHandlerParams['initialize']
  connect: (prevNode: AudioNode) => AudioNode | undefined
  reset: () => void
}
export type UnitType = (id?: string) => {
  id: string
  controllers: ControllerReturnType[][]
  unitHandler: UnitHandler
}
