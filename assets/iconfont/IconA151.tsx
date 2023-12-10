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

let IconA151: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M509.719273 0C790.667636 0 1018.88 229.189818 1018.88 511.022545c0 282.530909-228.165818 511.720727-509.114182 511.720728C228.165818 1022.743273 0 793.6 0 511.069091 0 229.189818 228.165818 0 509.719273 0z m45.800727 133.026909H464.616727v87.924364c-99.141818 18.757818-156.392727 82.664727-156.392727 165.329454 0 90.158545 68.049455 136.750545 166.539636 169.797818 69.306182 24.064 99.141818 45.847273 99.141819 81.175273 0 36.817455-35.560727 57.856-89.6 57.856-60.369455 0-115.013818-20.293818-153.786182-41.332363l-27.368728 108.962909c34.955636 18.804364 95.371636 36.817455 156.997819 39.842909v87.924363h92.16v-95.418181c106.123636-18.059636 163.979636-88.715636 163.979636-171.380364 0-84.898909-43.845818-136.005818-153.786182-175.057455-80.709818-28.578909-112.500364-48.872727-112.500363-78.941091 0-25.553455 19.083636-52.596364 79.45309-52.596363 66.699636 0 109.940364 21.783273 133.445819 33.047273l27.322181-105.192728c-31.744-15.034182-74.333091-29.323636-134.702545-30.813091V133.026909z"
        fill={getIconColor(color, 0, '#FCB72B')}
      />
    </Svg>
  );
};

IconA151.defaultProps = {
  size: 18,
};

IconA151 = React.memo ? React.memo(IconA151) : IconA151;

export default IconA151;