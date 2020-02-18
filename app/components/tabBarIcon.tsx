import React from 'react';
import Icon from "./Icon";

export default (props: any) => {
    let { name, focused } = props;
    return <Icon name={name} color={focused ? '#000' : '#888'} size={24} />;
}