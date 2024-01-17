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

let IconA113: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.441143 0 512 229.558857 512 512s-229.558857 512-512 512S0 794.441143 0 512 229.558857 0 512 0z m209.078857 314.038857l-287.597714 283.282286-128-128c-21.321143-20.48-55.442286-20.48-75.922286 0.877714a53.833143 53.833143 0 0 0 0 75.922286l168.082286 167.277714c10.24 10.24 23.917714 16.201143 38.4 16.201143 14.518857 0 28.16-5.961143 38.4-16.201143l321.718857-323.437714c13.641143-13.641143 18.761143-33.28 13.641143-52.041143-4.242286-17.92-18.761143-32.438857-37.522286-37.558857-17.92-5.12-37.558857 0.877714-51.2 13.677714z"
        fill={getIconColor(color, 0, '#28CC64')}
      />
    </Svg>
  );
};

IconA113.defaultProps = {
  size: 18,
};

IconA113 = React.memo ? React.memo(IconA113) : IconA113;

export default IconA113;
