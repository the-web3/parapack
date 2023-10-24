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

let IconA22: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M663.645091 477.246061a38.167273 38.167273 0 0 1 0 54.116848l-116.798061 116.76703a38.229333 38.229333 0 0 1-54.178909 0l-116.79806-116.76703a38.167273 38.167273 0 0 1 0-54.147879l116.79806-116.76703a37.950061 37.950061 0 0 1 54.178909 0l116.798061 116.76703z"
        fill={getIconColor(color, 0, '#999999')}
      />
      <Path
        d="M519.757576 7.757576c-274.183758 0-496.484848 222.301091-496.484849 496.484848s222.301091 496.484848 496.484849 496.484849 496.484848-222.301091 496.484848-496.484849-222.301091-496.484848-496.484848-496.484848z m198.159515 585.634909l-109.009455 109.009454a126.417455 126.417455 0 0 1-178.300121 0l-109.009454-109.009454a126.138182 126.138182 0 0 1 0-178.300121l109.009454-109.009455a126.138182 126.138182 0 0 1 178.300121 0l109.009455 109.009455a126.138182 126.138182 0 0 1 0 178.300121z"
        fill={getIconColor(color, 1, '#999999')}
      />
    </Svg>
  );
};

IconA22.defaultProps = {
  size: 18,
};

IconA22 = React.memo ? React.memo(IconA22) : IconA22;

export default IconA22;
