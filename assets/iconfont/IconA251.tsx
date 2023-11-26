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

let IconA251: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.763636 0 512 229.236364 512 512s-229.236364 512-512 512S0 794.763636 0 512 229.236364 0 512 0z m0 93.090909a418.909091 418.909091 0 1 0 0 837.818182 418.909091 418.909091 0 0 0 0-837.818182z m0 605.090909c13.963636 0 23.272727 4.654545 32.581818 13.963637 9.309091 9.309091 13.963636 18.618182 13.963637 32.581818 0 13.963636-4.654545 23.272727-13.963637 32.581818-9.309091 9.309091-18.618182 13.963636-32.581818 13.963636-13.963636 0-23.272727-4.654545-32.581818-13.963636-9.309091-9.309091-13.963636-18.618182-13.963637-32.581818 0-13.963636 4.654545-23.272727 13.963637-32.581818 9.309091-9.309091 18.618182-13.963636 32.581818-13.963637z m46.545455-512l-20.666182 465.454546h-56.925091L465.454545 186.181818h93.09091z"
        fill={getIconColor(color, 0, '#3B2ACE')}
      />
    </Svg>
  );
};

IconA251.defaultProps = {
  size: 18,
};

IconA251 = React.memo ? React.memo(IconA251) : IconA251;

export default IconA251;
