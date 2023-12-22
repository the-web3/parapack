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

let IconA110: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M500.977912 36.766536c256.263546 0 463.951176 207.726994 463.951176 463.951176 0 119.55029-45.229925 228.550868-119.471561 310.783517l145.097915 144.743634a39.3646 39.3646 0 0 1-51.882543 59.0469l-3.700272-3.306626-147.026781-146.6725a461.982946 461.982946 0 0 1-286.967934 99.356251C244.714366 964.668888 37.026736 756.981258 37.026736 500.717712 37.026736 244.454166 244.714366 36.766536 500.977912 36.766536z m0 78.7292c-212.765663 0-385.221976 172.456313-385.221976 385.221976 0 212.765663 172.456313 385.221976 385.221976 385.221976 212.765663 0 385.221976-172.456313 385.221976-385.221976 0-212.765663-172.456313-385.221976-385.221976-385.221976z"
        fill={getIconColor(color, 0, '#C9C9C9')}
      />
    </Svg>
  );
};

IconA110.defaultProps = {
  size: 18,
};

IconA110 = React.memo ? React.memo(IconA110) : IconA110;

export default IconA110;
