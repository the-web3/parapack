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

let IconAXiala: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1743 1024" width={size} height={size} {...rest}>
      <Path
        d="M139.659328 249.717471l674.049651 738.066641a105.972739 105.972739 0 0 0 159.550035 0L1646.914715 249.717471A125.276323 125.276323 0 0 0 1567.533648 38.953845H219.828296a125.079348 125.079348 0 1 0-80.168968 210.763626z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconAXiala.defaultProps = {
  size: 18,
};

IconAXiala = React.memo ? React.memo(IconAXiala) : IconAXiala;

export default IconAXiala;
