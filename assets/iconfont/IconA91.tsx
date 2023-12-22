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

let IconA91: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M11.412169 613.109549C-52.237655 250.293915 253.211684-55.155423 616.027318 8.494401c197.349363 38.166622 362.815634 203.632893 394.582365 407.265785 35.024858 178.266052-25.483202 345.361386-139.168537 459.046721-113.801697 113.801697-280.89703 174.309756-459.046721 139.284898-203.749254-38.166622-362.815634-203.632893-400.982256-400.982256z m757.397999-305.5657L437.761265 581.226456c-25.36684 25.483202-63.649824 19.083311-82.733135-6.283529L265.895104 460.326699c-19.083311-25.483202-57.249933-25.483202-82.733135-6.399891-25.36684 19.199673-31.766731 57.366295-12.68342 82.849497l171.866161 203.632893c19.083311 25.483202 57.249933 31.766731 89.133026 6.39989l413.665676-350.132213c25.483202-19.083311 25.483202-57.249933 6.399891-82.733135-19.083311-25.483202-57.366295-25.483202-82.733135-6.399891z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
    </Svg>
  );
};

IconA91.defaultProps = {
  size: 18,
};

IconA91 = React.memo ? React.memo(IconA91) : IconA91;

export default IconA91;
