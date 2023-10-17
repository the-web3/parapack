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

let IconHeart: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1195 1024" width={size} height={size} {...rest}>
      <Path
        d="M1190.826667 290.218667C1165.994667 117.76 1009.834667 0 844.373333 0c-50.773333 0-102.4 11.093333-151.296 34.986667-34.389333 16.810667-65.194667 40.533333-99.498666 62.293333 0 0-2.304-1.706667-4.266667-3.584A355.498667 355.498667 0 0 0 174.08 46.08C47.616 116.992-19.626667 256.853333 5.12 396.202667c14.250667 80.128 54.613333 146.346667 112.725333 203.178666 109.994667 107.349333 300.117333 292.608 404.821334 394.496 20.650667 20.053333 47.701333 30.122667 74.752 30.122667 26.965333 0 53.930667-9.984 74.581333-30.037333 107.52-104.277333 305.322667-296.96 419.413333-410.965334 80.554667-80.469333 115.626667-179.882667 99.413334-292.693333z"
        fill={getIconColor(color, 0, '#F91980')}
      />
    </Svg>
  );
};

IconHeart.defaultProps = {
  size: 18,
};

IconHeart = React.memo ? React.memo(IconHeart) : IconHeart;

export default IconHeart;
