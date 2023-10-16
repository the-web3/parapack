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

let IconPayCircleO1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1170 1024" width={size} height={size} {...rest}>
      <Path
        d="M313.792 373.568a10.048 10.048 0 0 1 0-14.08l111.36-112c4.48-3.84 10.88-3.84 14.72 0l111.36 112c3.84 3.84 3.84 10.24 0 14.08l-80 80h281.6c7.04-27.52 11.52-56.96 11.52-87.04-0.64-183.04-148.48-331.52-331.52-331.52-183.68 0-332.16 148.48-332.16 331.52 0 30.08 4.48 59.52 12.16 87.04h280.96l-80-80z m-261.76 112.64c-41.6 37.12-41.6 97.92 0 135.04l304 235.52c42.24 37.76 110.72 37.76 152.96 0l304-235.52c41.6-37.12 41.6-97.28 0-135.04H52.032z m609.28 97.92c0-11.52-10.88-21.12-24.32-21.12h-408.96c-13.44 0-24.32 9.6-24.32 21.12 0 11.52 10.88 21.12 24.32 21.12h409.6c12.8 0 23.68-9.6 23.68-21.12z"
        fill={getIconColor(color, 0, '#634FF7')}
      />
    </Svg>
  );
};

IconPayCircleO1.defaultProps = {
  size: 18,
};

IconPayCircleO1 = React.memo ? React.memo(IconPayCircleO1) : IconPayCircleO1;

export default IconPayCircleO1;
