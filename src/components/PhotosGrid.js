import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";
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
	console.log("!!!!!!!!!! RENDERING PHOTOS GRID");
	const dispatch = useDispatch();
	const photos = useSelector((state) => state.photos);

	const transitions = useTransition(photos, (p) => p.id, {
		initial: { opacity: 1 },
		leave: { opacity: 0 },
	});

	useEffect(() => {
		console.log("!!!!!!!!!! PhotosGrid useEffect called");

		if (!photos.length) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, photos]);

	return <Container>
		{transitions.map(({ item, key, props },  index) =>
			item && <animated.div key={index} style={props}>
				<GridPhoto photo={item}/>
				️</animated.div>)}
	</Container>;
};

export default PhotosGrid;