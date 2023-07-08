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

let IconAPaixubeifen6: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1260 1024" width={size} height={size} {...rest}>
      <Path
        d="M1206.272 78.769231H54.035692C24.418462 78.769231 0 60.888615 0 39.384615S24.418462 0 54.035692 0h1152.236308c29.538462 0 54.035692 17.880615 54.035692 39.384615s-24.418462 39.384615-54.035692 39.384616z m0 472.615384H54.035692C24.418462 551.384615 0 533.504 0 512S24.418462 472.615385 54.035692 472.615385h1152.236308c29.538462 0 54.035692 17.880615 54.035692 39.384615s-24.418462 39.384615-54.035692 39.384615z m0 472.615385H54.035692C24.418462 1024 0 1006.119385 0 984.615385s24.418462-39.384615 54.035692-39.384616h1152.236308c29.538462 0 54.035692 17.880615 54.035692 39.384616s-24.418462 39.384615-54.035692 39.384615z"
        fill={getIconColor(color, 0, '#B2B2B2')}
      />
    </Svg>
  );
};

IconAPaixubeifen6.defaultProps = {
  size: 18,
};

IconAPaixubeifen6 = React.memo ? React.memo(IconAPaixubeifen6) : IconAPaixubeifen6;

export default IconAPaixubeifen6;
