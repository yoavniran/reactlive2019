import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";
import { TYPES } from "../consts";
import GridPhoto from "./GridPhoto";
import Spinner from "./Spinner";
import * as styled from "./PhotosGrid.styled";

const PhotosGrid = () => {
	const dispatch = useDispatch();
	const photos = useSelector((state) => state.photos);

	useEffect(() => {
		if (!photos.length) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, photos]);

	return <styled.Container>
		{photos.length ? photos.map((photo, index) =>
			<GridPhoto key={index} photo={photo} />) :
		<Spinner/>}
	</styled.Container>;
};

export default PhotosGrid;