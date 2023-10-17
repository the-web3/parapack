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

let IconA2: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M890.148571 115.419429l80.164572 804.132571c3.510857 35.254857-15.140571 70.217143-47.250286 88.576-32.182857 18.285714-71.387429 16.384-99.401143-4.973714l-239.542857-182.272a84.260571 84.260571 0 0 1-25.6-100.498286l166.473143-398.262857a20.992 20.992 0 0 0-10.532571-27.648 23.478857 23.478857 0 0 0-29.403429 9.654857L460.068571 677.522286c-18.724571 31.012571-53.833143 49.005714-89.380571 45.860571l-271.725714-24.649143A83.529143 83.529143 0 0 1 24.137143 634.733714c-8.192-35.254857 6.875429-72.850286 37.888-94.646857L751.104 57.490286c26.331429-18.358857 59.757714-22.381714 88.283429-10.532572 28.452571 11.922286 47.689143 37.888 50.761142 68.461715z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconA2.defaultProps = {
  size: 18,
};

IconA2 = React.memo ? React.memo(IconA2) : IconA2;

export default IconA2;
