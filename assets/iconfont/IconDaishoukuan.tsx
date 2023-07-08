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

let IconDaishoukuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1126 1024" width={size} height={size} {...rest}>
      <Path
        d="M582.2464 170.496h-89.2928v362.496L779.4688 716.8l53.76-68.096-250.9824-157.696v-320.512zM537.6 0C241.8688 0 0 230.4 0 512s241.8688 512 537.6 512c295.6288 0 537.6-230.4 537.6-512S833.2288 0 537.6 0z m0 938.496C291.328 938.496 89.8048 746.496 89.8048 512S291.328 85.504 537.6 85.504C783.7696 85.504 985.3952 277.504 985.3952 512S783.872 938.496 537.6 938.496z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
    </Svg>
  );
};

IconDaishoukuan.defaultProps = {
  size: 18,
};

IconDaishoukuan = React.memo ? React.memo(IconDaishoukuan) : IconDaishoukuan;

export default IconDaishoukuan;
