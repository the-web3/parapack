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

let IconXiangshang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M22.016 65.170286c0-23.625143 19.163429-42.788571 42.788571-42.788572h894.390858a42.788571 42.788571 0 0 1 0 85.577143H64.804571A42.788571 42.788571 0 0 1 22.016 65.243429z m490.057143 120.758857c23.698286 0 42.861714 19.163429 42.861714 42.861714v729.965714a42.861714 42.861714 0 0 1-85.650286 0v-729.965714c0-23.698286 19.163429-42.861714 42.788572-42.861714z"
        fill={getIconColor(color, 0, '#AEAEAE')}
      />
      <Path
        d="M481.865143 198.729143a42.861714 42.861714 0 0 1 60.489143 0l321.389714 321.389714a42.788571 42.788571 0 0 1-60.562286 60.562286L481.865143 259.218286a42.788571 42.788571 0 0 1 0-60.562286z"
        fill={getIconColor(color, 1, '#AEAEAE')}
      />
      <Path
        d="M542.354286 198.729143c16.749714 16.749714 16.749714 43.885714 0 60.562286L221.037714 580.608a42.788571 42.788571 0 0 1-60.562285 0 42.788571 42.788571 0 0 1 0-60.489143l321.389714-321.389714a42.861714 42.861714 0 0 1 60.489143 0z"
        fill={getIconColor(color, 2, '#AEAEAE')}
      />
    </Svg>
  );
};

IconXiangshang.defaultProps = {
  size: 18,
};

IconXiangshang = React.memo ? React.memo(IconXiangshang) : IconXiangshang;

export default IconXiangshang;
