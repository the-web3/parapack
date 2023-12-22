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

let IconA12: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M59.470769 51.318154C59.470769 23.236923 83.337846 0.393846 112.64 0.393846h611.249231c14.099692 0 27.608615 5.356308 37.572923 14.966154l186.052923 178.254769c9.964308 9.531077 15.556923 22.488615 15.556923 35.997539v738.579692c0 28.16-23.788308 50.963692-53.169231 50.963692H112.64c-29.341538 0-53.169231-22.843077-53.169231-50.963692V51.318154z m106.338462 50.963692V917.267692h690.963692V250.722462l-154.899692-148.48H165.809231z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M750.473846 560.718769H272.108308V458.830769h478.365538v101.888z m-159.468308 203.736616H272.147692v-101.888h318.897231v101.888zM272.147692 51.318154C272.108308 23.236923 295.896615 0.393846 325.277538 0.393846h239.143385c29.380923 0 53.169231 22.843077 53.169231 50.924308v203.776c0 28.120615-23.788308 50.924308-53.169231 50.924308H325.238154c-29.341538 0-53.169231-22.803692-53.169231-50.924308V51.318154z m106.299077 50.963692v101.848616h132.883693V102.281846H378.407385z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconA12.defaultProps = {
  size: 18,
};

IconA12 = React.memo ? React.memo(IconA12) : IconA12;

export default IconA12;
