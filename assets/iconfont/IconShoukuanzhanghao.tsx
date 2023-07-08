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

let IconShoukuanzhanghao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1126 1024" width={size} height={size} {...rest}>
      <Path
        d="M559.7184 573.6448c94.208 0 188.416 32.1536 266.0352 85.8112l66.56-85.8112a529.6128 529.6128 0 0 0-133.12-69.632c61.0304-53.6576 99.84-128.7168 99.84-214.528C859.136 128.7168 726.016 0 559.7184 0 393.5232 0 260.5056 128.7168 260.5056 289.4848c0 85.8112 38.8096 160.768 99.7376 214.4256C149.6064 578.9696 0 777.3184 0 1007.9232h110.7968c0-241.2544 199.5776-434.176 448.9216-434.176-5.5296 0 0 0 0 0z m-188.416-289.4848c0-101.888 83.1488-182.272 188.416-182.272 105.3696 0 188.416 80.384 188.416 182.272 0 96.4608-83.0464 176.9472-182.784 182.272-110.8992-5.3248-194.048-85.8112-194.048-182.272zM1075.2 793.4976H803.6352l66.56-58.9824-66.56-64.3072-177.3568 176.8448L803.6352 1024l66.56-58.9824-66.56-64.3072H1075.2V793.4976z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
    </Svg>
  );
};

IconShoukuanzhanghao.defaultProps = {
  size: 18,
};

IconShoukuanzhanghao = React.memo ? React.memo(IconShoukuanzhanghao) : IconShoukuanzhanghao;

export default IconShoukuanzhanghao;
