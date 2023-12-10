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

let IconA111: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 55.168C0 24.746667 24.704 0 55.168 0h882.944c30.464 0 55.168 24.704 55.168 55.168v882.944c0 30.464-24.704 55.168-55.168 55.168H55.168A55.168 55.168 0 0 1 0 938.112V55.168z m110.378667 55.210667v772.522666h772.522666V110.378667H110.378667z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M158.933333 411.648a27.733333 27.733333 0 0 1 7.978667-19.498667 27.178667 27.178667 0 0 1 19.328-8.106666h109.312c15.061333 0 27.306667 12.373333 27.306667 27.605333v110.378667a27.733333 27.733333 0 0 1-7.978667 19.498666 27.178667 27.178667 0 0 1-19.328 8.106667H186.24a27.178667 27.178667 0 0 1-19.328-8.106667 27.733333 27.733333 0 0 1-7.978667-19.498666V411.648z m255.744 0c0-15.232 12.245333-27.562667 27.306667-27.562667h109.312c7.253333 0 14.208 2.901333 19.328 8.064a27.733333 27.733333 0 0 1 7.978667 19.498667v110.378667a27.733333 27.733333 0 0 1-7.978667 19.498666 27.178667 27.178667 0 0 1-19.328 8.106667h-109.312a27.178667 27.178667 0 0 1-19.328-8.106667 27.733333 27.733333 0 0 1-7.978667-19.498666V411.648z m283.050667-27.562667c-15.061333 0-27.306667 12.373333-27.306667 27.562667v110.378667a27.733333 27.733333 0 0 0 7.978667 19.498666c5.12 5.162667 12.074667 8.106667 19.328 8.106667h109.312c7.253333 0 14.208-2.944 19.328-8.106667a27.733333 27.733333 0 0 0 7.978667-19.498666V411.648a27.477333 27.477333 0 0 0-27.306667-27.562667h-109.312z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconA111.defaultProps = {
  size: 18,
};

IconA111 = React.memo ? React.memo(IconA111) : IconA111;

export default IconA111;