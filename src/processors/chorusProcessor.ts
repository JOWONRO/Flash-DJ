import { chorusOptions } from './options'

class ChorusProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [chorusOptions.delayTime, chorusOptions.depth, chorusOptions.rate]
  }

  private phase: number
  private sampleRate: number

  constructor() {
    super()
    this.phase = 0
    this.sampleRate = 44100

    this.port.onmessage = event => {
      if (event.data.sampleRate) {
        this.sampleRate = event.data.sampleRate
      }
    }
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const input = inputs[0]
    const output = outputs[0]
    const delayTime = parameters.delayTime
    const depth = parameters.depth
    const rate = parameters.rate

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel]
      const outputChannel = output[channel]
      const bufferLength = inputChannel.length

      for (let i = 0; i < bufferLength; i++) {
        const currentDelayTime =
          delayTime.length > 1 ? delayTime[i] : delayTime[0]
        const currentDepth = depth.length > 1 ? depth[i] : depth[0]
        const currentRate = rate.length > 1 ? rate[i] : rate[0]

        if (currentDelayTime === 0) {
          outputChannel[i] = inputChannel[i]
        } else {
          this.phase += (currentRate * 2 * Math.PI) / this.sampleRate
          if (this.phase >= 2 * Math.PI) this.phase -= 2 * Math.PI

          const modulatedDelay =
            currentDelayTime + currentDepth * Math.sin(this.phase)
          const delaySamples = Math.round(modulatedDelay * this.sampleRate)

          const delayIndex = (i - delaySamples + bufferLength) % bufferLength
          outputChannel[i] = inputChannel[i] + inputChannel[delayIndex] * 0.5
        }
      }
    }

    return true
  }
}

registerProcessor('chorus-processor', ChorusProcessor)
