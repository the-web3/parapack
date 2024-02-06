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

let IconSwapSelect: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1365 1024" width={size} height={size} {...rest}>
      <Path
        d="M791.894016 946.653867l546.133333-728.200534A136.533333 136.533333 0 0 0 1228.800683 0H136.534016A136.533333 136.533333 0 0 0 27.307349 218.453333l546.133334 728.200534a136.533333 136.533333 0 0 0 218.453333 0z"
        fill={getIconColor(color, 0, '#D1D1D1')}
      />
    </Svg>
  );
};

IconSwapSelect.defaultProps = {
  size: 18,
};

IconSwapSelect = React.memo ? React.memo(IconSwapSelect) : IconSwapSelect;

export default IconSwapSelect;
