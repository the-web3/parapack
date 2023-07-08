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

let IconIcon: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1185 1024" width={size} height={size} {...rest}>
      <Path
        d="M53.894737 679.073684h130.425263l104.016842 104.016842 104.016842-104.016842h495.292632V53.894737H53.894737v625.178947z"
        fill={getIconColor(color, 0, '#C9C9C9')}
      />
    </Svg>
  );
};

IconIcon.defaultProps = {
  size: 18,
};

IconIcon = React.memo ? React.memo(IconIcon) : IconIcon;

export default IconIcon;
