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

let IconA10: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 55.168C0 24.746667 24.704 0 55.168 0H413.866667c15.914667 0 31.061333 6.869333 41.514666 18.858667L648.533333 239.573333a55.168 55.168 0 0 1-41.514666 91.52H55.168A55.168 55.168 0 0 1 0 275.925333V55.168z m110.378667 55.210667v110.336h375.04L388.821333 110.378667H110.378667z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M0 220.714667h938.112c30.464 0 55.168 24.746667 55.168 55.210666v662.186667c0 30.464-24.704 55.168-55.168 55.168H55.168A55.168 55.168 0 0 1 0 938.112V220.714667zM110.378667 331.093333v551.808h772.522666V331.093333H110.378667z"
        fill={getIconColor(color, 1, '#000000')}
      />
      <Path
        d="M413.866667 441.472h331.093333v110.336H413.866667zM358.698667 496.64a55.168 55.168 0 1 1-110.378667 0 55.168 55.168 0 0 1 110.378667 0z"
        fill={getIconColor(color, 2, '#000000')}
      />
    </Svg>
  );
};

IconA10.defaultProps = {
  size: 18,
};

IconA10 = React.memo ? React.memo(IconA10) : IconA10;

export default IconA10;
