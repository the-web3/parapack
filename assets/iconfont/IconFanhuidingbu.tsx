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

let IconFanhuidingbu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 24000 1024" width={size} height={size} {...rest}>
      <Path
        d="M20641.103448 0H21114.009852v1024h-472.906404z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M21066.08867 895.665813C21060.691232 895.665813 21056.296355 900.06069 21056.296355 905.458128c0 5.397438 4.393616 9.792315 9.792315 9.792315 5.397438 0 9.792315-4.393616 9.792315-9.792315C21075.880985 900.06069 21071.486108 895.665813 21066.08867 895.665813z m0 18.294542A8.512315 8.512315 0 0 1 21057.586443 905.458128 8.512315 8.512315 0 0 1 21066.08867 896.955901 8.512315 8.512315 0 0 1 21074.590897 905.458128 8.512315 8.512315 0 0 1 21066.08867 913.960355z"
        fill={getIconColor(color, 1, '#8C8C8C')}
      />
      <Path
        d="M21066.802443 902.980099A1.0013 1.0013 0 0 0 21066.08867 902.683744a1.0013 1.0013 0 0 0-0.713773 0.296355L21061.223409 907.130325a0.644414 0.644414 0 1 0 0.913024 0.913025L21066.08867 904.091113l3.952236 3.952237a0.644414 0.644414 0 0 0 0.913025-0.913025L21066.802443 902.980099z"
        fill={getIconColor(color, 2, '#8C8C8C')}
      />
    </Svg>
  );
};

IconFanhuidingbu.defaultProps = {
  size: 18,
};

IconFanhuidingbu = React.memo ? React.memo(IconFanhuidingbu) : IconFanhuidingbu;

export default IconFanhuidingbu;
