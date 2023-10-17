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

let IconA19: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1216 1024" width={size} height={size} {...rest}>
      <Path
        d="M64 952.448h1091.712v-221.952c-182.08-37.248-273.088-111.424-273.088-222.656 0-110.72 91.008-184.704 273.088-221.888V64H64v888.448z"
        fill={getIconColor(color, 0, '#C9C9C9')}
      />
    </Svg>
  );
};

IconA19.defaultProps = {
  size: 18,
};

IconA19 = React.memo ? React.memo(IconA19) : IconA19;

export default IconA19;
