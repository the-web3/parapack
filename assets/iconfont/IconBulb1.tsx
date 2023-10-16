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

let IconBulb1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1045 1024" width={size} height={size} {...rest}>
      <Path
        d="M341.12 85.312L21.568 512.192h287.872l160.256-213.76h127.68l160.256 213.76h287.936l-320.576-426.88H341.12z"
        fill={getIconColor(color, 0, '#634FF7')}
      />
      <Path
        d="M1045.568 512h-287.936l-160.256 213.12H469.696L309.44 512H21.568l319.552 426.88h383.872L1045.568 512z"
        fill={getIconColor(color, 1, '#634FF7')}
      />
    </Svg>
  );
};

IconBulb1.defaultProps = {
  size: 18,
};

IconBulb1 = React.memo ? React.memo(IconBulb1) : IconBulb1;

export default IconBulb1;
