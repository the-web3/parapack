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

let IconSwapTo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1582 1024" width={size} height={size} {...rest}>
      <Path
        d="M1002.263273 108.823273l474.624 504.087272L1582.545455 504.180364 1107.921455 0l-105.658182 108.823273zM1107.921455 1024L1582.545455 519.866182 1476.887273 410.996364 1002.263273 915.176727 1107.921455 1024zM0 589.591273h1483.217455V434.501818H0v155.089455z"
        fill={getIconColor(color, 0, '#16162E')}
      />
    </Svg>
  );
};

IconSwapTo.defaultProps = {
  size: 18,
};

IconSwapTo = React.memo ? React.memo(IconSwapTo) : IconSwapTo;

export default IconSwapTo;
