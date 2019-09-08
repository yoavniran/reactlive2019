import React from "react";
import styled from "styled-components";
import {createSelector} from "reselect";
import { useSelector } from "react-redux";
// import memoize from "memoize-state";

const Container = styled.header`
	height: 60px;
	width: 100%;
	background-color: #282c34;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;	
	border-bottom: 2px solid #61dafb;
`;

const Counter = styled.div`
	height: 100%;
	padding: 0 4px;
	background-color: black;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 2rem;
`;

const selectCount = createSelector(
	(state) => state.photos,
	(photos) => {
		console.log("!!!!!!!! running select count ");
		return photos.length;
	},
);

// const memoizedSelectCount = memoize((state) =>{
// 	console.log("!!!!!!!! running select count ");
// 	return state.photos.length;
// });

const Header = () => {
	const photoCount = useSelector(selectCount);

	return <Container>
		<Counter>{photoCount}</Counter>
	</Container>;
};

export default Header;