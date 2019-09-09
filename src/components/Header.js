import React from "react";
import {createSelector} from "reselect";
import { useSelector } from "react-redux";
import * as styled from "./Header.styled";

const selectCount = createSelector(
	(state) => state.photos,
	(photos) => {
		return photos.length;
	},
);

const Header = () => {
	const photoCount = useSelector(selectCount);

	return <styled.Container>
		<styled.Counter>{photoCount}</styled.Counter>
	</styled.Container>;
};

export default Header;