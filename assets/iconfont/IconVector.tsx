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

let IconVector: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1472 1024" width={size} height={size} {...rest}>
      <Path
        d="M556.316171 99.74589l-455.006197 462.115669L0 462.115669 455.006197 0z m-101.309974 924.231337L0 561.861559 101.309974 462.115669l455.006197 462.115669z m1017.507608-440.858348h-1421.894366v-142.189436h1421.894366z"
        fill={getIconColor(color, 0, '#16162E')}
      />
    </Svg>
  );
};

IconVector.defaultProps = {
  size: 18,
};

IconVector = React.memo ? React.memo(IconVector) : IconVector;

export default IconVector;
