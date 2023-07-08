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

let IconErweima: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M705.450667 716.8h159.232v-170.666667H1024v256h-159.317333v85.333334H705.450667v-85.333334H546.133333v-256h159.317334v170.666667zM0 546.133333h477.866667V1024H0V546.133333z m136.533333 204.8v136.533334h136.533334V750.933333H136.533333zM0 0h477.866667v477.866667H0V0z m136.533333 136.533333v136.533334h136.533334V136.533333H136.533333zM546.133333 0H1024v477.866667H546.133333V0z m204.8 136.533333v136.533334h136.533334V136.533333H750.933333z m136.533334 750.933334H1024V1024h-136.533333v-136.533333z m-341.333334 0H682.666667V1024H546.133333v-136.533333z"
        fill={getIconColor(color, 0, '#252525')}
      />
    </Svg>
  );
};

IconErweima.defaultProps = {
  size: 18,
};

IconErweima = React.memo ? React.memo(IconErweima) : IconErweima;

export default IconErweima;
