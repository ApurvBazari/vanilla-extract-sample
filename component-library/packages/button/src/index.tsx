import React, {ReactNode} from 'react'

import * as styles from './styles.css'

interface ButtonProps {
  children: ReactNode;
  elementType?: "button" | "a";
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Button = ({
  children,
  elementType: ButtonElement = "button",
  onClick,
}: ButtonProps) => (
  <ButtonElement
    className={styles.rootStyle}
    onClick={onClick}
  >
    {children}
  </ButtonElement>
)

export {Button, styles as buttonStyles}
