import {style} from '@vanilla-extract/css'
import { tokens } from 'my-component-library-theme'

export const rootStyle = style({
  appearance: "none",
  borderRadius: 10,
  padding: 15,
  border: `1px solid ${tokens.color.blue}`,
  backgroundColor: tokens.color.green,
  color: tokens.color.red,
}, 'button_base');