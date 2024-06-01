export interface DistortionCurve {
  option: {
    id: string
    min: number
    max: number
    step: number
    defaultValue: number
  }
  getCurve: (amount: number, sampleRate: number) => Float32Array
}

// const NUM_SAMPLES = 44100

const softClipping: DistortionCurve = {
  option: {
    id: 'Amount',
    min: 0.1,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  },
  getCurve: (amount, sampleRate) => {
    const curve = new Float32Array(sampleRate)
    for (let i = 0; i < sampleRate; ++i) {
      const x = (i * 2) / sampleRate - 1
      curve[i] = x < -amount ? -amount : x > amount ? amount : x
    }
    return curve
  },
}

const softAndHardClipping: DistortionCurve = {
  option: {
    id: 'Amount',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  getCurve: (amount, sampleRate) => {
    const curve = new Float32Array(sampleRate)
    const deg = Math.PI / 180
    for (let i = 0; i < sampleRate; ++i) {
      const x = (i * 2) / sampleRate - 1
      curve[i] =
        ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
    }
    return curve
  },
}

const hardClipping: DistortionCurve = {
  option: {
    id: 'Threshold',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  },
  getCurve: (threshold, sampleRate) => {
    const curve = new Float32Array(sampleRate)
    for (let i = 0; i < sampleRate; ++i) {
      const x = (i * 2) / sampleRate - 1
      curve[i] = Math.max(-threshold, Math.min(threshold, x))
    }
    return curve
  },
}

const overdrive: DistortionCurve = {
  option: {
    id: 'Amount',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  getCurve: (amount, sampleRate) => {
    const curve = new Float32Array(sampleRate)
    const k = amount
    for (let i = 0; i < sampleRate; ++i) {
      const x = (i * 2) / sampleRate - 1
      curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x))
    }
    return curve
  },
}

const tangentBase: DistortionCurve = {
  option: {
    id: 'Amount',
    min: 1,
    max: 20,
    step: 0.1,
    defaultValue: 1,
  },
  getCurve: (amount, sampleRate) => {
    const curve = new Float32Array(sampleRate)
    for (let i = 0; i < sampleRate; ++i) {
      const x = (i * 2) / sampleRate - 1
      curve[i] = Math.tanh(amount * x)
    }
    return curve
  },
}

export const distortionCurves = {
  softClipping,
  softAndHardClipping,
  hardClipping,
  overdrive,
  tangentBase,
}
