import * as React from "react";
import Svg, { G, Circle, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGComponent = (props:SvgProps) => (
  <Svg
    width={67}
    height={126}
    viewBox="0 0 67 126"
    fill="none"
    {...props}
  >
    <G
      style={{
        mixBlendMode: "lighten",
      }}
      opacity={0.7}
      filter="url(#filter0_d_1_2372)"
    >
      <Circle
        cx={76.5}
        cy={45.5}
        r={55}
        stroke="url(#paint0_linear_1_2372)"
        strokeOpacity={0.17}
        strokeWidth={35}
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_1_2372"
        x1={76.5}
        y1={-27}
        x2={76.5}
        y2={118}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset={1} stopColor="white" stopOpacity={0} />
        <Stop offset={1} stopColor="white" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
