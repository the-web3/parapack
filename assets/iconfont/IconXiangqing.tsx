/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconXiangqing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M898.176 0H125.824C91.648 0 64 28.672 64 64v896c0 35.328 27.648 64 61.824 64h772.352c34.176 0 61.824-28.672 61.824-64V64c0-35.328-27.648-64-61.824-64z m0 960H125.824V64h772.352v896z"
        fill={getIconColor(color, 0, '#252525')}
      />
      <Path
        d="M292.8 321.92h438.4c16.384 0 29.696-14.72 29.696-32.96 0-18.24-13.312-32.96-29.696-32.96h-438.4c-16.384 0-29.696 14.72-29.696 32.96 0 18.176 13.312 32.96 29.696 32.96z m0 241.792h379.52c16.448 0 29.696-14.72 29.696-32.96 0-18.176-13.248-32.896-29.696-32.896h-379.52c-16.384 0-29.696 14.72-29.696 32.896 0 18.24 13.312 32.96 29.696 32.96z m0 204.288h349.824c16.384 0 29.696-14.72 29.696-32.96 0-18.176-13.312-32.96-29.696-32.96H292.8c-16.384 0-29.696 14.72-29.696 32.96 0 18.24 13.312 32.96 29.696 32.96z"
        fill={getIconColor(color, 1, '#252525')}
      />
    </Svg>
  );
};

IconXiangqing.defaultProps = {
  size: 18,
};

IconXiangqing = React.memo ? React.memo(IconXiangqing) : IconXiangqing;

export default IconXiangqing;
