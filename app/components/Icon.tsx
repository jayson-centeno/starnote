import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { IconProps } from 'react-native-vector-icons/Icon'

export default (props: IconProps) => {
  const size = props.size ? props.size : 24
  const color = props.color ? props.color : '#ffff'
  return <MaterialIcon {...props} size={size} color={color} style={{ fontWeight: 'bold' }} />
}
