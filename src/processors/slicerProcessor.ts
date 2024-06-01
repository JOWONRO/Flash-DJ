import { slicerOptions } from './options'

class SlicerProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [slicerOptions.frequency, slicerOptions.depth]
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
    const frequency = parameters.frequency
    const depth = parameters.depth

    if (input && output) {
      for (let channel = 0; channel < input.length; channel++) {
        const inputChannel = input[channel]
        const outputChannel = output[channel]

        for (let i = 0; i < inputChannel.length; i++) {
          const currentFrequency =
            frequency.length > 1 ? frequency[i] : frequency[0]
          const currentDepth = depth.length > 1 ? depth[i] : depth[0]

          this.phase += currentFrequency / this.sampleRate
          if (this.phase >= 1.0) this.phase -= 1.0

          const modulator =
            currentDepth * Math.sign(Math.sin(2 * Math.PI * this.phase))
          outputChannel[i] = inputChannel[i] * (1 - modulator)
        }
      }
    }

    return true
  }
}

registerProcessor('slicer-processor', SlicerProcessor)
