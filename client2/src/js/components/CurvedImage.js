import {Entity} from 'aframe-react';
import React from 'react';

const defaultGeometry = {
    height: 1,
    primitive: 'cylinder',
    radius: 2,
    segmentsRadial: 48,
    thetaLength: 270,
    openEnded: true,
    thetaStart: 0
};
const defaultMaterial = {
    color: '#FFF',
    shader: 'flat',
    side: 'double',
    transparent: true,
    repeat: '-1 1'
};

export default props => (
    <Entity
        {...props}
        geometry={Object.assign({}, defaultGeometry, props.geometry)}
        material={Object.assign({}, defaultMaterial, props.material)}
    />
);

