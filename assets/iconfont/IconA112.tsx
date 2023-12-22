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

let IconA112: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M921.151712 585.152137a51.423984 51.423984 0 1 1 102.847968 0v335.999895A102.847968 102.847968 0 0 1 921.151712 1024H102.847968A102.847968 102.847968 0 0 1 0 921.152032V102.848288A102.847968 102.847968 0 0 1 102.847968 0.00032h335.999895a51.423984 51.423984 0 1 1 0 102.847968h-335.999895v818.303744h818.303744v-335.999895z m3.519999-411.263871L574.143821 523.712156a52.255984 52.255984 0 0 1-73.791977 0 51.999984 51.999984 0 0 1 0-73.631977L852.063734 99.104289h-174.527946a49.599985 49.599985 0 0 1-49.663984-49.567984A49.599985 49.599985 0 0 1 677.535788 0.00032h252.159921A94.239971 94.239971 0 0 1 1023.99968 94.112291v251.615921a49.599985 49.599985 0 0 1-49.663984 49.567984 49.599985 49.599985 0 0 1-49.631985-49.567984v-171.839946z"
        fill={getIconColor(color, 0, '#5D5D5D')}
      />
    </Svg>
  );
};

IconA112.defaultProps = {
  size: 18,
};

IconA112 = React.memo ? React.memo(IconA112) : IconA112;

export default IconA112;
