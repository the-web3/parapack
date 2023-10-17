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

let IconA28: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1316 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 843.337143h422.326857v120.393143H0V843.337143z m0-421.668572h543.012571v120.466286H0V421.668571zM0 0h1206.637714v120.466286H0V0z m1126.619429 543.597714l69.778285-23.552 60.342857 104.374857-55.296 48.493715c6.948571 32.914286 6.948571 66.925714 0 99.84l55.296 48.493714-60.342857 104.301714-69.778285-23.552c-24.722286 22.308571-54.125714 39.497143-86.528 50.029715l-14.409143 71.972571h-120.685715l-14.482285-72.045714a241.152 241.152 0 0 1-86.528-49.956572l-69.705143 23.552-60.342857-104.301714 55.222857-48.493714a241.590857 241.590857 0 0 1 0-99.84l-55.222857-48.493715 60.342857-104.374857 69.705143 23.552c24.722286-22.235429 54.125714-39.497143 86.601143-49.956571l14.409142-71.972572h120.685715l14.482285 72.045715a239.908571 239.908571 0 0 1 86.454858 49.956571z m-161.28 239.469715a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 1 0 0 120.466286z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconA28.defaultProps = {
  size: 18,
};

IconA28 = React.memo ? React.memo(IconA28) : IconA28;

export default IconA28;
