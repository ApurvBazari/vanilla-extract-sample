import React from 'react';
import { Button, ThemeWrapper, THEME, Divider } from 'my-component-library';

export function Page() {
  return (
    <ThemeWrapper theme={THEME}>
      <Divider />
      <Button onClick={() => {}}>My Button</Button>
      <Divider />
    </ThemeWrapper>
  )
}
