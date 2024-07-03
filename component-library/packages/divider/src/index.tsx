import React, {FC, HTMLAttributes} from 'react'

import * as styles from './styles.css'

type Props = { className?: string } & HTMLAttributes<HTMLHRElement>

const Divider: FC<Props> = ({...rest}: Props) =>
  <hr className={styles.base} {...rest} />

export {Divider, styles as dividerStyles, Props as DividerProps}
