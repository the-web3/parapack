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

let IconA101: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.453333 0 512 229.546667 512 512s-229.546667 512-512 512S0 794.453333 0 512 229.546667 0 512 0z m209.066667 314.026667L433.493333 597.333333l-128-128c-21.333333-20.48-55.466667-20.48-75.946666 0.853334-21.333333 21.333333-20.48 55.466667 0 75.946666l168.106666 167.253334c10.24 10.24 23.893333 16.213333 38.4 16.213333 14.506667 0 28.16-5.973333 38.4-16.213333l321.706667-323.413334c13.653333-13.653333 18.773333-33.28 13.653333-52.053333-4.266667-17.92-18.773333-32.426667-37.546666-37.546667-17.92-5.12-37.546667 0.853333-51.2 13.653334z"
        fill={getIconColor(color, 0, '#E5E5E5')}
      />
    </Svg>
  );
};

IconA101.defaultProps = {
  size: 18,
};

IconA101 = React.memo ? React.memo(IconA101) : IconA101;

export default IconA101;
