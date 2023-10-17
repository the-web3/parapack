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

let IconVolume: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M705.337924 8.096512L359.498439 275.439535H136.522981c-44.367566 0-79.634092 35.266526-79.634092 79.634092v313.985849c0 44.367566 35.266526 79.634092 79.634092 79.634092h222.975458L705.337924 1016.036591c6.825779 4.55052 15.926818 7.963409 23.890227 7.963409 6.825779 0 12.513929-1.13763 18.202079-3.41289 13.651559-6.825779 21.614968-20.477338 21.614967-36.404156V39.950149c0-15.926818-7.963409-29.578377-21.614967-36.404157a42.774884 42.774884 0 0 0-42.092306 4.55052zM887.813758 393.753043v236.399491a39.475757 39.475757 0 1 0 79.17904 0V393.753043a39.475757 39.475757 0 0 0-39.58952-39.361994 39.475757 39.475757 0 0 0-39.58952 39.361994z"
        fill={getIconColor(color, 0, '#999999')}
      />
    </Svg>
  );
};

IconVolume.defaultProps = {
  size: 18,
};

IconVolume = React.memo ? React.memo(IconVolume) : IconVolume;

export default IconVolume;
