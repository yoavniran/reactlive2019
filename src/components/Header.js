import React from "react";
import styled from "styled-components";
import {createSelector} from "reselect";
import { useSelector } from "react-redux";

const Container = styled.header`
	height: 60px;
	width: 100%;
	background-color: #282c34;
`;

const selectCount = createSelector(
	(state) => state.photos,
	(photos) => photos.length,
);

const Header = () => {
	const photoCount =  useSelector(selectCount);

	return <Container>

	</Container>;
};

export default Header;