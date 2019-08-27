import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import actions from "../store/actions";
import {TYPES} from "../consts";
import Photo from "./Photo";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
`;

const PhotosGrid = ({assets}) => {
	console.log("!!!!!!!!!! RENDERING PHOTOS GRID");

	const dispatch = useDispatch();
	const photos = useSelector((state) => state.photos);

	useEffect(()=> {
		if (!photos.length) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, photos]);

	return <Container>
		{photos.map((photo, index) => <Photo key={index} photo={photo}/>)}
	</Container>;
};

export default PhotosGrid;