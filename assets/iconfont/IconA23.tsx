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

let IconA23: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M519.757576 7.757576c-274.245818 0-496.484848 222.23903-496.484849 496.484848 0 274.245818 222.23903 496.484848 496.484849 496.484849 274.245818 0 496.484848-222.23903 496.484848-496.484849 0-274.245818-222.23903-496.484848-496.484848-496.484848z m229.43806 281.413818l-224.038788 516.189091c-3.599515 7.168-14.36703 7.168-17.935515 0L415.806061 609.993697c0-1.799758-1.799758-1.799758-3.599516-3.599515l-195.366787-91.384243c-7.13697-3.599515-7.13697-14.36703 0-17.935515l517.988848-222.27006a11.046788 11.046788 0 0 1 14.36703 14.36703z"
        fill={getIconColor(color, 0, '#999999')}
      />
    </Svg>
  );
};

IconA23.defaultProps = {
  size: 18,
};

IconA23 = React.memo ? React.memo(IconA23) : IconA23;

export default IconA23;
