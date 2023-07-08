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

let IconCharulianjie: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M841.955556 120.945778C735.800889-19.000889 543.288889-40.618667 411.875556 72.704l-100.807112 87.04 50.403556 66.218667 100.693333-86.926223c96.938667-83.740444 239.160889-67.811556 317.667556 35.612445s63.715556 255.089778-33.336889 338.830222l-107.975111 93.297778 50.403555 66.218667 107.861334-93.297778c131.299556-113.322667 151.552-318.691556 45.283555-458.752zM448.170667 771.299556c-96.938667 83.740444-239.274667 67.697778-317.781334-35.726223-78.506667-103.310222-63.488-255.089778 33.450667-338.830222l110.933333-95.800889-50.289777-66.218666-110.933334 95.800888C-17.863111 443.733333-38.115556 649.329778 68.152889 789.276444s298.894222 161.564444 430.193778 48.241778l105.130666-90.680889-50.403555-66.332444-105.016889 90.794667z m159.744-501.418667l51.2 65.536L315.619556 640.568889l-51.2-65.422222 343.381333-305.265778z"
        fill={getIconColor(color, 0, '#5D5D5D')}
      />
    </Svg>
  );
};

IconCharulianjie.defaultProps = {
  size: 18,
};

IconCharulianjie = React.memo ? React.memo(IconCharulianjie) : IconCharulianjie;

export default IconCharulianjie;
