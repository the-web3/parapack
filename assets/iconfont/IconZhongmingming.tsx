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

let IconZhongmingming: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M923.984842 899.826526c27.216842 0 47.589053 20.965053 47.589053 48.882527v21.018947c0 27.917474-20.372211 48.882526-47.589053 48.882526H557.015579c-27.162947 0-47.535158-20.965053-47.535158-48.936421v-20.965052c0-27.917474 20.372211-48.882526 47.535158-48.882527h367.023158zM652.193684 47.211789c61.170526-62.949053 149.504-62.949053 210.674527 0l88.333473 90.812632c61.170526 62.895158 61.170526 153.761684 0 216.656842L346.341053 976.680421c-20.372211 20.965053-40.744421 27.971368-67.907369 27.971368H74.496c-27.216842 0-47.589053-21.018947-47.589053-48.936421v-209.650526c0-27.971368 13.581474-55.942737 27.162948-69.901474L652.193684 47.211789z m129.077895 90.812632a32.229053 32.229053 0 0 0-47.535158 0L128.821895 760.023579v132.796632h129.131789L862.868211 270.821053a34.492632 34.492632 0 0 0 0-48.936421l-81.596632-83.860211z"
        fill={getIconColor(color, 0, '#252525')}
      />
    </Svg>
  );
};

IconZhongmingming.defaultProps = {
  size: 18,
};

IconZhongmingming = React.memo ? React.memo(IconZhongmingming) : IconZhongmingming;

export default IconZhongmingming;
