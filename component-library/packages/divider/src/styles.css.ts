import {style} from '@vanilla-extract/css'
import { tokens } from 'my-component-library-theme'

export const base = style({
  border: 'none',
  borderTop: `${tokens.space.small} solid ${tokens.color.blue}`,
  margin: `${tokens.space.large} 0`
}, 'divider_base')