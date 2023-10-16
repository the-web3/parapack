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

let IconBarchart: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1170 1024" width={size} height={size} {...rest}>
      <Path
        d="M627.456 403.136v375.68h-65.92V-0.064h-212.48v778.88h-65.92v-581.12h-212.48v581.12h-69.76v117.12h890.88v-117.12h-51.84v-375.68h-212.48z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
    </Svg>
  );
};

IconBarchart.defaultProps = {
  size: 18,
};

IconBarchart = React.memo ? React.memo(IconBarchart) : IconBarchart;

export default IconBarchart;
