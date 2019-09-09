import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";
import { TYPES } from "../consts";
import GridPhoto from "./GridPhoto";
import * as styled from "./PhotosGrid.styled";
//impgrid


//griditemindex


//griditemrenderer


const PhotosGrid = ({width, height}) => {
	const gridRef = useRef();
	const dispatch = useDispatch();
	const photos = useSelector((state) => state.photos);


	useEffect(() => {
		if (!photos.length) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, photos]);

	//griditemkey

	return <styled.Container>
		{photos.map((photo) =>
			<GridPhoto key={photo.id} photo={photo} />)}
	</styled.Container>;
};

export default PhotosGrid;