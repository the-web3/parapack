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

let IconPeople: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1113 1024" width={size} height={size} {...rest}>
      <Path
        d="M611.526531 230.487075c0-85.159184-68.87619-154.122449-153.6-154.122449s-153.687075 68.963265-153.687075 154.122449a153.77415 153.77415 0 0 0 307.374149 0z"
        fill={getIconColor(color, 0, '#634FF7')}
      />
      <Path
        d="M119.814966 875.45034h614.748299v-26.296599c0-98.394558 0-147.853061-17.85034-185.034013a168.228571 168.228571 0 0 0-71.662585-76.62585c-34.917007-19.330612-80.979592-19.330612-172.843537-19.330613H382.258503c-91.95102 0-137.926531 0-172.843537 19.330613-30.65034 16.282993-55.727891 43.363265-71.662585 76.62585-17.85034 37.180952-17.85034 86.726531-17.85034 185.034013v26.296599z"
        fill={getIconColor(color, 1, '#634FF7')}
      />
    </Svg>
  );
};

IconPeople.defaultProps = {
  size: 18,
};

IconPeople = React.memo ? React.memo(IconPeople) : IconPeople;

export default IconPeople;
