import { UnitHandler, UnitHandlerParams } from '@src/types'

const useUnitHandler = (params: UnitHandlerParams): UnitHandler => {
  const { initialize, connect, reset } = params

  const actions = {
    getConnectFn: (connect: UnitHandlerParams['connect']) => {
      switch (typeof connect) {
        case 'function':
          return connect
        default:
          return (prevNode: AudioNode) => {
            if (!connect) return
            prevNode.connect(connect)
            return connect
          }
      }
    },
    getResetFn: (reset: UnitHandlerParams['reset']) => {
      switch (typeof reset) {
        case 'function':
          return reset
        default:
          return () => {
            reset.forEach(controller =>
              controller.forEach(controller => controller.handler.reset()),
            )
          }
      }
    },
  }

  const unitHandler: UnitHandler = {
    initialize: initialize,
    connect: actions.getConnectFn(connect),
    reset: actions.getResetFn(reset),
  }

  return unitHandler
}

export default useUnitHandler
