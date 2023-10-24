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

let IconA13: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M483.072 7.021714a49.627429 49.627429 0 0 1 50.029714 0L917.650286 231.862857c15.104 8.813714 24.356571 24.905143 24.356571 42.276572V723.748571c0 17.408-9.289143 33.462857-24.356571 42.276572l-384.548572 224.804571a49.627429 49.627429 0 0 1-50.029714 0L98.523429 766.025143a49.005714 49.005714 0 0 1-24.356572-42.276572V274.139429c0-17.371429 9.252571-33.462857 24.356572-42.276572L483.072 7.058286z m-310.198857 295.131429v393.545143l335.213714 195.949714 335.213714-195.949714V302.189714l-335.213714-195.986285-335.213714 195.986285z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M750.043429 367.250286l-253.330286 307.712a49.444571 49.444571 0 0 1-73.106286 3.657143l-158.281143-157.330286 69.778286-69.376 119.734857 118.966857 218.843429-265.801143 76.361143 62.134857z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconA13.defaultProps = {
  size: 18,
};

IconA13 = React.memo ? React.memo(IconA13) : IconA13;

export default IconA13;
