export const bitCrusherOptions = {
  bitDepth: {
    name: 'bitDepth',
    defaultValue: 16,
    minValue: 1,
    maxValue: 16,
  },
  frequency: {
    name: 'frequency',
    defaultValue: 1,
    minValue: 0.01,
    maxValue: 1,
  },
}

export const ringModularOptions = {
  frequency: {
    name: 'frequency',
    defaultValue: 0,
    minValue: 0,
    maxValue: 20000,
  },
}
