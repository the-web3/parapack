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

let IconTijiaochenggong: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M11.68578 613.109549c38.166622 197.349363 197.233002 362.815634 400.982255 400.982256 178.149691 35.024858 345.245024-25.483202 459.046721-139.284898 113.685335-113.685335 174.193394-280.780669 139.168537-459.046721-31.766731-203.632893-197.233002-369.099163-394.582365-407.265785C253.485294-55.155423-51.964045 250.293915 11.68578 613.109549z m420.065567 133.699539l413.665676-350.132213c25.483202-19.083311 25.483202-57.249933 6.399891-82.733135-19.083311-25.483202-57.366295-25.483202-82.733136-6.399891L438.034876 581.226456c-25.36684 25.483202-63.649824 19.083311-82.733135-6.283529l-89.133027-114.616228c-19.083311-25.483202-57.249933-25.483202-82.733135-6.399891-25.36684 19.199673-31.766731 57.366295-12.68342 82.849497l171.866161 203.632893c19.083311 25.483202 57.249933 31.766731 89.133027 6.39989z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
    </Svg>
  );
};

IconTijiaochenggong.defaultProps = {
  size: 18,
};

IconTijiaochenggong = React.memo ? React.memo(IconTijiaochenggong) : IconTijiaochenggong;

export default IconTijiaochenggong;
