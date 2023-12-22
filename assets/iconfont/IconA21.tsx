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

let IconA21: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M381.162057 589.502171H177.034971c-26.624 0-45.026743-25.541486-35.547428-49.3568L344.356571 30.778514A38.034286 38.034286 0 0 1 379.845486 7.314286h342.279314c27.004343 0 45.407086 26.185143 35.196343 50.117485l-118.081829 277.357715h222.325029c32.680229 0 50.146743 36.864 28.584228 60.386743L345.058743 989.476571c-26.506971 28.906057-75.629714 3.861943-65.3312-33.294628l101.434514-366.679772z"
        fill={getIconColor(color, 0, '#999999')}
      />
    </Svg>
  );
};

IconA21.defaultProps = {
  size: 18,
};

IconA21 = React.memo ? React.memo(IconA21) : IconA21;

export default IconA21;
