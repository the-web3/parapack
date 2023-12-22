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

let IconA26: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M19.692308 492.307692h984.615384v39.384616H19.692308z"
        fill={getIconColor(color, 0, '#D8D8D8')}
      />
      <Path
        d="M531.692308 19.692308v984.615384h-39.384616V19.692308z"
        fill={getIconColor(color, 1, '#D8D8D8')}
      />
    </Svg>
  );
};

IconA26.defaultProps = {
  size: 18,
};

IconA26 = React.memo ? React.memo(IconA26) : IconA26;

export default IconA26;
