import {createTheme} from '@vanilla-extract/css'

const themeTokens = {
  space: {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  },
  color: {
    blue: 'blue',
    red: 'red',
    green: 'green'
  },
}

export const [THEME, tokens] = createTheme(
  themeTokens,
  'theme_tokens',
)
