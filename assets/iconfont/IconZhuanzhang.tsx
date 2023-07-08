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

let IconZhuanzhang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1194 1024" width={size} height={size} {...rest}>
      <Path
        d="M701.354667 670.72H245.504v101.376H1163.093333L701.354667 422.656z"
        fill={getIconColor(color, 0, '#252525')}
      />
      <Path
        d="M1168.896 0H0v1014.442667h1168.896v-78.933334H87.722667V78.933333h999.338666v445.184h81.92z"
        fill={getIconColor(color, 1, '#252525')}
      />
    </Svg>
  );
};

IconZhuanzhang.defaultProps = {
  size: 18,
};

IconZhuanzhang = React.memo ? React.memo(IconZhuanzhang) : IconZhuanzhang;

export default IconZhuanzhang;
