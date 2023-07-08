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

let IconQianbao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1319 1024" width={size} height={size} {...rest}>
      <Path
        d="M85.328919 747.462267h853.289195v-170.551906c-142.320799-28.601872-213.454715-85.593752-213.454715-171.081571 0-85.064087 71.133916-141.950034 213.454715-170.551906v-170.551906H85.328919v682.737289z"
        fill={getIconColor(color, 0, '#3B28CC')}
      />
    </Svg>
  );
};

IconQianbao.defaultProps = {
  size: 18,
};

IconQianbao = React.memo ? React.memo(IconQianbao) : IconQianbao;

export default IconQianbao;
