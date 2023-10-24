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

let IconABianzu4: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1137 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 512c2.56-169.699556 35.328-310.215111 131.072-394.012444C224.199111 31.800889 380.302222 2.275556 568.888889 0c188.586667 2.275556 344.746667 31.800889 437.816889 117.987556C1102.449778 201.784889 1135.217778 342.300444 1137.777778 512c-2.56 169.699556-35.328 310.215111-131.072 394.012444C913.578667 992.199111 757.475556 1021.724444 568.888889 1024c-188.586667-2.275556-344.746667-31.800889-437.816889-117.987556C35.328 822.215111 2.56 681.699556 0 512z"
        fill={getIconColor(color, 0, '#C9C9C9')}
      />
      <Path
        d="M801.735111 460.629333L473.713778 291.953778c-42.325333-21.788444-94.435556 6.485333-94.435556 51.313778v337.464888c0 44.828444 52.110222 73.102222 94.435556 51.313778l328.021333-168.675555c43.52-22.414222 43.52-80.327111 0-102.741334z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconABianzu4.defaultProps = {
  size: 18,
};

IconABianzu4 = React.memo ? React.memo(IconABianzu4) : IconABianzu4;

export default IconABianzu4;
