import { useState } from 'react'

import { Controller, ControllerOption } from '../types'

const useController = (option?: ControllerOption): Controller => {
  const [value, setValue] = useState(option?.defaultValue)

  const handler = {
    onChange: (value: number) => {
      setValue(value)
    },
    reset: () => {
      setValue(option?.defaultValue)
    },
  }

  return {
    value,
    handler,
    option,
  }
}

export default useController
