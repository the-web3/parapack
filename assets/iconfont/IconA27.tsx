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

let IconA27: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1575 1024" width={size} height={size} {...rest}>
      <Path
        d="M787.692308 0C429.686154 0 123.904 212.283077 0 512 123.904 811.716923 429.686154 1024 787.692308 1024c358.4 0 663.788308-212.283077 787.692307-512C1451.480615 212.283077 1146.092308 0 787.692308 0z m0 853.307077c-197.710769 0-358.006154-152.891077-358.006154-341.307077 0-188.416 160.374154-341.307077 358.006154-341.307077 197.710769 0 358.006154 152.891077 358.006154 341.307077 0 188.416-160.374154 341.307077-358.006154 341.307077zM787.692308 307.2c-118.547692 0-214.803692 91.844923-214.803693 204.8 0 112.955077 96.256 204.8 214.803693 204.8s214.803692-91.844923 214.803692-204.8c0-112.955077-96.256-204.8-214.803692-204.8z"
        fill={getIconColor(color, 0, '#AAAAAA')}
      />
    </Svg>
  );
};

IconA27.defaultProps = {
  size: 18,
};

IconA27 = React.memo ? React.memo(IconA27) : IconA27;

export default IconA27;
