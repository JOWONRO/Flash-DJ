import { UnitHandler, UnitHandlerOption } from '@src/types'

const useUnitHandler = (options: UnitHandlerOption): UnitHandler => {
  const unitHandler: UnitHandler = {
    initialize: options.initialize,
    connect: options.connect,
    reset: () => {
      options.controllers.forEach(controller =>
        controller.forEach(controller => controller.handler.reset()),
      )
    },
  }

  return unitHandler
}

export default useUnitHandler
