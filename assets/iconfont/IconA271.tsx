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

let IconA271: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M444.793263 7.329684A590.632421 590.632421 0 0 0 431.157895 134.736842c0 255.811368 229.241263 485.052632 538.947368 485.052632 15.710316 0 31.312842-0.862316 46.780632-2.533053C976.303158 839.733895 768.323368 1024 538.947368 1024 229.241263 1024 0 794.758737 0 538.947368 0 261.551158 183.888842 48.720842 444.793263 7.329684zM323.961263 159.528421l-6.467368 3.503158C188.335158 235.277474 107.789474 372.304842 107.789474 538.947368c0 202.509474 187.930947 377.263158 431.157894 377.263158 129.536 0 255.029895-79.764211 323.637895-192.943158l2.101895-3.557052-10.159158-1.562948C561.583158 669.696 338.836211 440.400842 324.176842 163.84l-0.188631-4.284632z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconA271.defaultProps = {
  size: 18,
};

IconA271 = React.memo ? React.memo(IconA271) : IconA271;

export default IconA271;
