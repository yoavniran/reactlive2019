import React from "react";
import cx from "classnames";

export const SIZES = {
	xxs: 8,
	xs: 10,
	s: 12,
	m: 14,
	l: 16,
	xl: 18,
	xxl: 20,
};

const getStyle = (size, fill) => {

	const dim = size ? SIZES[size] ? SIZES[size] : size : SIZES.m;

	return {
		fill,
		width: dim,
		height: dim,
	};
};

const Svg = ({path, fill, className, size, onClick, title}) =>
	<svg className={cx("db", className)}
	     style={getStyle(size, fill)}
	     viewBox="0 0 24 24"
	     preserveAspectRatio="xMidYMid"
	     title={title}
	     onClick={onClick}>
		<path d={path}/>
	</svg>;

Svg.defaultProps = {
	fill: "",
	size: SIZES.m
};

export default Svg;
