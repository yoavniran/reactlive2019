import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition } from "react-spring";
import styled from "styled-components";
import actions from "../store/actions";
import { TYPES } from "../consts";
import GridPhoto from "./GridPhoto";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
`;

const PhotosGrid = () => {
	const dispatch = useDispatch();
	const photos = useSelector((state) => state.photos);

	const transitions = useTransition([...photos],
		(p) => p.id,
		{
			initial: { opacity: 1 },
			leave: { opacity: 0 },
		});

	console.log("!!!!!!!!!! RENDERING PHOTOS GRID", {photos, transitions});

	useEffect(() => {
		console.log("!!!!!!!!!! PhotosGrid useEffect called");

		if (!photos.length) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, photos]);

	return <Container>
		{photos.map((item, index)=>
			<GridPhoto key={index} photo={item}/>)}
		{/*{transitions.map(({ item, key, props }, index) =>*/}
		{/*	<GridPhoto key={key} photo={item} style={props} />)}*/}
	</Container>;
};

export default PhotosGrid;