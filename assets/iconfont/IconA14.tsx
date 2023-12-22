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

let IconA14: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1109 1024" width={size} height={size} {...rest}>
      <Path
        d="M0.426667 55.168C0.426667 24.746667 25.173333 0 55.594667 0h993.28c30.506667 0 55.210667 24.704 55.210666 55.168v662.186667c0 18.474667-9.216 35.669333-24.576 45.909333l-331.093333 220.757333a55.168 55.168 0 0 1-85.76-45.909333v-165.546667H55.552A55.168 55.168 0 0 1 0.426667 717.354667V55.168z m110.378666 55.210667V662.186667h606.976c30.506667 0 55.210667 24.704 55.210667 55.168v117.632l220.714667-147.157334V110.378667H110.805333z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M331.52 386.261333v-165.546666h110.378667v165.546666H331.52z m331.093333 0v-165.546666h110.378667v165.546666H662.613333z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconA14.defaultProps = {
  size: 18,
};

IconA14 = React.memo ? React.memo(IconA14) : IconA14;

export default IconA14;
