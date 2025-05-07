import * as React from "react";
import Svg, { G, Circle, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";
const SVGComponent = (props:SvgProps) => (
  <Svg
    width={151}
    height={144}
    viewBox="0 0 151 144"
    fill="none"
    {...props}
  >
    <G
      style={{
        mixBlendMode: "lighten",
      }}
      opacity={0.7}
    >
      <Circle
        cx={-20}
        cy={171}
        r={149}
        stroke="url(#paint0_linear_1_2371)"
        strokeOpacity={0.17}
        strokeWidth={44}
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_1_2371"
        x1={-20}
        y1={3.57628e-7}
        x2={-26}
        y2={202}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.0001} stopColor="white" stopOpacity={0.97} />
        <Stop offset={0.0002} stopColor="white" stopOpacity={0.77} />
        <Stop offset={1} stopColor="white" stopOpacity={0} />
        <Stop offset={1} stopColor="white" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
