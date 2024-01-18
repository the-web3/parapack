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

let IconA210: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.441143 0 512 229.558857 512 512s-229.558857 512-512 512S0 794.441143 0 512 229.558857 0 512 0z m-124.123429 305.115429a58.514286 58.514286 0 0 0-82.761142 82.761142L429.238857 512l-124.123428 124.123429a58.514286 58.514286 0 1 0 82.761142 82.761142L512 594.761143l124.123429 124.123428a58.514286 58.514286 0 1 0 82.761142-82.761142L594.761143 512l124.123428-124.123429a58.514286 58.514286 0 1 0-82.761142-82.761142L512 429.238857z"
        fill={getIconColor(color, 0, '#D01F1F')}
      />
    </Svg>
  );
};

IconA210.defaultProps = {
  size: 18,
};

IconA210 = React.memo ? React.memo(IconA210) : IconA210;

export default IconA210;
