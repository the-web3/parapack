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

let IconA15: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M509.755077 102.281846c-225.043692 0-407.473231 182.429538-407.473231 407.473231 0 225.083077 182.429538 407.512615 407.473231 407.512615 225.083077 0 407.512615-182.429538 407.512615-407.512615 0-225.043692-182.429538-407.473231-407.512615-407.473231zM0.393846 509.755077C0.393846 228.430769 228.430769 0.393846 509.755077 0.393846c281.363692 0 509.400615 228.036923 509.400615 509.361231 0 281.363692-228.036923 509.400615-509.400615 509.400615C228.430769 1019.155692 0.393846 791.118769 0.393846 509.755077z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M458.830769 738.973538v-101.848615h101.888v101.848615H458.830769z m50.924308-382.030769a50.924308 50.924308 0 0 0-50.924308 50.963693H356.942769a152.812308 152.812308 0 1 1 203.776 144.147692v34.107077H458.830769V458.830769h50.924308a50.924308 50.924308 0 1 0 0-101.888z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconA15.defaultProps = {
  size: 18,
};

IconA15 = React.memo ? React.memo(IconA15) : IconA15;

export default IconA15;
