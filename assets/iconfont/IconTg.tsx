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

let IconTg: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
        <Path d="M8.58605004,16.1057458 L8.91558552,11.3111071 L17.9542478,3.46740441 C18.3543978,3.11602339 17.871864,2.94600074 17.3422541,3.2520423 L6.18515537,10.0416045 L1.35983706,8.56807404 C0.324156087,8.28470207 0.312388835,7.59327841 1.5952188,7.09454353 L20.3904671,0.112271246 C21.2496117,-0.261778581 22.0734463,0.316298424 21.7439135,1.58580175 L18.5427298,16.1057359 C18.319117,17.1372076 17.671818,17.3865723 16.7773661,16.9105089 L11.9049622,13.4420469 L9.56291212,15.6296725 C9.29222311,15.8903738 9.06861028,16.1057359 8.58607845,16.1057359 L8.58605004,16.1057458 Z"
            fill={getIconColor(color, 0, '#3B28CC')}
        />
    </Svg>

    
  );
};

IconTg.defaultProps = {
  size: 18,
};

IconTg = React.memo ? React.memo(IconTg) : IconTg;

export default IconTg;
