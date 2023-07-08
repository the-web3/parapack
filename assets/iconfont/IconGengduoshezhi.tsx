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

let IconGengduoshezhi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1316 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 843.337143h434.395429v120.393143H0V843.337143z m0-421.668572h558.518857v120.466286H0V421.668571zM0 0h1241.161143v120.466286H0V0z m1158.875429 543.597714l71.68-23.552 62.098285 104.374857-56.832 48.493715c7.094857 32.914286 7.094857 66.925714 0 99.84l56.832 48.493714-62.098285 104.301714-71.68-23.552c-25.453714 22.308571-55.734857 39.497143-89.088 50.029715l-14.848 71.972571h-124.123429l-14.848-72.045714a249.856 249.856 0 0 1-89.014857-49.956572l-71.68 23.552-62.171429-104.301714 56.905143-48.493714a235.008 235.008 0 0 1 0-99.84l-56.832-48.493715 62.025143-104.374857 71.753143 23.552c25.453714-22.235429 55.734857-39.497143 89.088-49.956571l14.774857-71.972572h124.123429l14.921142 72.045715c33.28 10.459429 63.561143 27.648 89.014858 49.956571z m-166.034286 239.469715a61.147429 61.147429 0 0 0 62.171428-60.269715 61.147429 61.147429 0 0 0-62.098285-60.196571 61.147429 61.147429 0 0 0-62.025143 60.196571c0 33.28 27.794286 60.269714 62.025143 60.269715z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconGengduoshezhi.defaultProps = {
  size: 18,
};

IconGengduoshezhi = React.memo ? React.memo(IconGengduoshezhi) : IconGengduoshezhi;

export default IconGengduoshezhi;
