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

let IconXuanxiangbeifen: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1325 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 542.117647a60.235294 60.235294 0 0 0 120.470588 0 60.235294 60.235294 0 0 0-120.470588 0zM0 963.764706a60.235294 60.235294 0 0 0 120.470588 0 60.235294 60.235294 0 0 0-120.470588 0zM82.823529 60.235294h1159.529412C1297.588706 60.235294 1325.176471 80.293647 1325.176471 120.470588s-27.587765 60.235294-82.82353 60.235294H82.823529C27.587765 180.705882 0 160.647529 0 120.470588s27.587765-60.235294 82.823529-60.235294zM441.705412 481.882353h803.177412C1298.432 481.882353 1325.176471 501.940706 1325.176471 542.117647s-26.744471 60.235294-80.293647 60.235294H441.705412C388.156235 602.352941 361.411765 582.294588 361.411765 542.117647s26.744471-60.235294 80.293647-60.235294zM441.705412 903.529412h803.177412c53.549176 0 80.293647 20.058353 80.293647 60.235294s-26.744471 60.235294-80.293647 60.235294H441.705412C388.156235 1024 361.411765 1003.941647 361.411765 963.764706s26.744471-60.235294 80.293647-60.235294z"
        fill={getIconColor(color, 0, '#303133')}
      />
    </Svg>
  );
};

IconXuanxiangbeifen.defaultProps = {
  size: 18,
};

IconXuanxiangbeifen = React.memo ? React.memo(IconXuanxiangbeifen) : IconXuanxiangbeifen;

export default IconXuanxiangbeifen;
