import { UnitHandler, UnitHandlerParams } from '@src/types'

const useUnitHandler = (params: UnitHandlerParams): UnitHandler => {
  const { initialize, connect, reset } = params

  const actions = {
    getConnectFn: () => {
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
    getResetFn: () => {
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
    initialize,
    connect: actions.getConnectFn(),
    reset: actions.getResetFn(),
  }

  return unitHandler
}

export default useUnitHandler
