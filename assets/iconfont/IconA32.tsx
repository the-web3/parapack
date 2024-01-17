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

let IconA32: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.441143 0 512 229.558857 512 512s-229.558857 512-512 512S0 794.441143 0 512 229.558857 0 512 0zM219.428571 438.857143a73.142857 73.142857 0 1 0 0 146.285714 73.142857 73.142857 0 0 0 0-146.285714z m292.571429 0a73.142857 73.142857 0 1 0 0 146.285714 73.142857 73.142857 0 0 0 0-146.285714z m292.571429 0a73.142857 73.142857 0 1 0 0 146.285714 73.142857 73.142857 0 0 0 0-146.285714z"
        fill={getIconColor(color, 0, '#FCB72B')}
      />
    </Svg>
  );
};

IconA32.defaultProps = {
  size: 18,
};

IconA32 = React.memo ? React.memo(IconA32) : IconA32;

export default IconA32;
