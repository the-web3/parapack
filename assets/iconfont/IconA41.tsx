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

let IconA41: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1194 1024" width={size} height={size} {...rest}>
      <Path
        d="M608.711111 0c188.586667 2.275556 344.746667 31.800889 437.816889 117.987556C1142.272 201.784889 1175.04 342.300444 1177.6 512c-2.56 169.699556-35.328 310.215111-131.072 394.012444C953.400889 992.199111 797.297778 1021.724444 608.711111 1024c-188.586667-2.275556-344.689778-31.800889-437.816889-117.987556C75.150222 822.215111 42.382222 681.699556 39.822222 512c2.56-169.699556 35.328-310.215111 131.072-394.012444C264.021333 31.800889 420.124444 2.275556 608.711111 0zM419.100444 343.267556v337.464888c0 44.828444 52.110222 73.102222 94.435556 51.313778l328.021333-168.675555c43.52-22.414222 43.52-80.327111 0-102.741334L513.536 291.953778c-42.325333-21.788444-94.435556 6.485333-94.435556 51.313778z"
        fill={getIconColor(color, 0, '#C9C9C9')}
      />
    </Svg>
  );
};

IconA41.defaultProps = {
  size: 18,
};

IconA41 = React.memo ? React.memo(IconA41) : IconA41;

export default IconA41;
