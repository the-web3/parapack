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

let IconLujing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1364 1024" width={size} height={size} {...rest}>
      <Path
        d="M459.182117 853.427148a90.403611 90.403611 0 0 1-64.817684-27.803374L26.950511 446.610897a97.055953 97.055953 0 0 1 0-134.070261 89.891893 89.891893 0 0 1 129.80594 0l302.425666 312.148318L1037.253511 28.366265a89.72132 89.72132 0 0 1 129.80594 0c35.820299 37.014309 35.820299 96.88538 0 133.899689l-642.889078 663.528392a90.403611 90.403611 0 0 1-64.817684 27.632802z"
        fill={getIconColor(color, 0, '#252525')}
      />
    </Svg>
  );
};

IconLujing.defaultProps = {
  size: 18,
};

IconLujing = React.memo ? React.memo(IconLujing) : IconLujing;

export default IconLujing;
