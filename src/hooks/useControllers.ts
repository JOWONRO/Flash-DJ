import useGainController from '@src/controllers/useGainController'

const useControllers = () => {
  const controllers = [useGainController()]

  const controllersHandler = {
    initControllers: (context: AudioContext) => {
      controllers.forEach(controller => {
        controller.handler.initialize(context)
      })
    },
    connectControllers: (node: AudioBufferSourceNode) => {
      controllers.forEach(controller => {
        controller.handler.connect(node)
      })
    },
  }

  return { controllers, controllersHandler }
}

export default useControllers
