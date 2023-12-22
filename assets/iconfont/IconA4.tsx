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

let IconA4: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1230 1024" width={size} height={size} {...rest}>
      <Path
        d="M1160.7424 851.6096a68.2496 68.2496 0 0 1 6.5536 136.192l-6.5536 0.3584H68.4416a68.2496 68.2496 0 0 1-6.6048-136.192l6.6048-0.3584h1092.3008z m0-409.6a68.2496 68.2496 0 0 1 6.5536 136.192l-6.5536 0.3584H68.4416a68.2496 68.2496 0 0 1-6.6048-136.192l6.6048-0.3584h1092.3008z m0-409.6a68.2496 68.2496 0 0 1 6.5536 136.192l-6.5536 0.3584H68.4416A68.2496 68.2496 0 0 1 61.7856 32.768L68.4416 32.3584h1092.3008z"
        fill={getIconColor(color, 0, '#999999')}
      />
    </Svg>
  );
};

IconA4.defaultProps = {
  size: 18,
};

IconA4 = React.memo ? React.memo(IconA4) : IconA4;

export default IconA4;
