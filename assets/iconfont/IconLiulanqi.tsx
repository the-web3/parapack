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

let IconLiulanqi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M499.712 0c275.968 0 499.712 226.816 499.712 506.624 0 279.7568-223.744 506.5728-499.712 506.5728S0 786.432 0 506.624C0 226.816 223.744 0 499.712 0z m0 84.48c-229.9904 0-416.4096 188.928-416.4096 422.144 0 233.1648 186.4192 422.144 416.4096 422.144 229.9904 0 416.4096-188.9792 416.4096-422.144 0-233.1648-186.4192-422.1952-416.4096-422.1952z m258.816 165.2224a21.3504 21.3504 0 0 1 0 24.064l-137.6768 201.6256c17.0496 67.7888-23.2448 136.704-90.112 154.0096a123.2384 123.2384 0 0 1-61.7984 0L270.0288 769.024a20.6336 20.6336 0 0 1-28.9792-5.2736 21.3504 21.3504 0 0 1 0-24.064l137.6256-201.6768c-17.1008-67.7376 23.2448-136.704 90.0608-154.0096a123.2384 123.2384 0 0 1 61.952 0l198.8608-139.5712a20.6336 20.6336 0 0 1 28.9792 5.3248zM499.8144 464.4864a41.9328 41.9328 0 0 0-41.6768 42.1888c0 23.3472 18.6368 42.24 41.6256 42.24 23.04 0 41.6768-18.944 41.6768-42.24a41.9328 41.9328 0 0 0-41.6256-42.1888z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
    </Svg>
  );
};

IconLiulanqi.defaultProps = {
  size: 18,
};

IconLiulanqi = React.memo ? React.memo(IconLiulanqi) : IconLiulanqi;

export default IconLiulanqi;
