import { useState } from 'react'

import { ControllerOption } from '../types'

const useController = (option?: ControllerOption) => {
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
