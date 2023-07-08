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

let IconAGroup217: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.376 0 0 229.376 0 512c0 282.624 229.376 512 512 512 282.624 0 512-229.376 512-512 0-282.624-229.376-512-512-512z"
        fill={getIconColor(color, 0, '#F5F5F5')}
      />
      <Path
        d="M490.257067 387.959467l-79.189334-79.189334a16.042667 16.042667 0 0 0-22.869333 0l-79.189333 79.189334a16.042667 16.042667 0 0 0 22.528 22.869333l67.925333-68.266667 68.266667 68.266667c3.072 3.072 7.168 4.437333 11.264 4.437333 4.096 0 8.192-1.365333 11.264-4.437333 6.144-6.485333 6.144-16.725333 0-22.869333z"
        fill={getIconColor(color, 1, '#3B28CC')}
      />
      <Path
        d="M415.573333 704V320a16.110933 16.110933 0 0 0-15.9744-16.008533 16.145067 16.145067 0 0 0-16.042666 16.042666v384c0 8.704 7.304533 15.940267 16.042666 15.940267a16.0768 16.0768 0 0 0 15.9744-15.9744zM534.050133 635.938133l79.189334 79.189334a16.042667 16.042667 0 0 0 22.869333 0l79.189333-79.189334a16.042667 16.042667 0 0 0 0-22.528 15.4624 15.4624 0 0 0-22.528 0l-68.266666 67.925334-67.925334-67.925334a15.4624 15.4624 0 0 0-22.528 0c-6.485333 6.144-6.485333 16.384 0 22.528z"
        fill={getIconColor(color, 2, '#3B28CC')}
      />
      <Path
        d="M640.443733 704V320a16.145067 16.145067 0 0 0-16.008533-16.008533 16.145067 16.145067 0 0 0-16.008533 16.042666v384a15.9744 15.9744 0 1 0 32.017066 0z"
        fill={getIconColor(color, 3, '#3B28CC')}
      />
    </Svg>
  );
};

IconAGroup217.defaultProps = {
  size: 18,
};

IconAGroup217 = React.memo ? React.memo(IconAGroup217) : IconAGroup217;

export default IconAGroup217;
