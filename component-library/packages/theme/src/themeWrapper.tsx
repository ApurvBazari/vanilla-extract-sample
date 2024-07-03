import React, { ReactNode } from 'react'
import {THEME} from './theme.css'

interface ThemeWrapperTypes {
  theme?: string
  children: ReactNode
  [rest: string]: any
}

export const ThemeWrapper = ({
  theme = THEME,
  children,
  ...rest
}: ThemeWrapperTypes) => {
  return (
    <div className={theme} {...rest}>
      {children}
    </div>
  )
}