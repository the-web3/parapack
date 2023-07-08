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

let IconVuesaxOutlineArrow3: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M517.045388 291.215536l-174.759453-174.759452a35.403855 35.403855 0 0 0-50.469325 0l-174.759452 174.759452a35.403855 35.403855 0 0 0 49.716051 50.469325l149.901427-150.654701 150.6547 150.654701c6.779462 6.779462 15.818744 9.792556 24.858026 9.792556 9.039282 0 18.078564-3.013094 24.858026-9.792556 13.558923-14.312197 13.558923-36.910402 0-50.469325z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
      <Path
        d="M352.229145 988.671473V141.238782a35.554509 35.554509 0 0 0-35.2532-35.328527 35.629837 35.629837 0 0 0-35.403854 35.403854v847.432691c0 19.208474 16.120053 35.177873 35.403854 35.177873a35.479182 35.479182 0 0 0 35.2532-35.2532zM613.690378 838.468736l174.759453 174.759453a35.403855 35.403855 0 0 0 50.469325 0l174.759452-174.759453a35.403855 35.403855 0 0 0 0-49.716051 34.12329 34.12329 0 0 0-49.716051 0l-150.654701 149.901427-149.901427-149.901427a34.12329 34.12329 0 0 0-49.716051 0c-14.312197 13.558923-14.312197 36.157128 0 49.716051z"
        fill={getIconColor(color, 1, '#3B28CC')}
      />
      <Path
        d="M848.485729 988.671473V141.238782a35.629837 35.629837 0 0 0-35.328527-35.328527 35.629837 35.629837 0 0 0-35.328528 35.403854v847.432691a35.2532 35.2532 0 1 0 70.657055 0z"
        fill={getIconColor(color, 2, '#3B28CC')}
      />
    </Svg>
  );
};

IconVuesaxOutlineArrow3.defaultProps = {
  size: 18,
};

IconVuesaxOutlineArrow3 = React.memo ? React.memo(IconVuesaxOutlineArrow3) : IconVuesaxOutlineArrow3;

export default IconVuesaxOutlineArrow3;
