import { ringModularOptions } from './options'

class RingModulatorProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [ringModularOptions.frequency]
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
  ): boolean {
    const input = inputs[0]
    const output = outputs[0]
    const frequency = parameters.frequency

    for (let channel = 0; channel < output.length; channel++) {
      const inputChannel = input[channel]
      const outputChannel = output[channel]

      if (!inputChannel) break
      for (let i = 0; i < inputChannel.length; i++) {
        if (frequency[0] === 0) {
          outputChannel[i] = inputChannel[i]
        } else {
          const carrier = Math.sin(
            (2 * Math.PI * this.phase * frequency[0]) / this.sampleRate,
          )
          this.phase = (this.phase + 1) % this.sampleRate
          outputChannel[i] = inputChannel[i] * carrier
        }
      }
    }

    return true
  }
}

registerProcessor('ring-modulator-processor', RingModulatorProcessor)
