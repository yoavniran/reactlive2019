import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";
import { TYPES } from "../consts";
import GridPhoto from "./GridPhoto";
import Spinner from "./Spinner";
import * as styled from "./PhotosGrid.styled";
//impgrid

//griditemindex

//griditemrenderer


const PhotosGrid = ({width, height}) => {
	const gridRef = useRef();
	const dispatch = useDispatch();
	const photos = useSelector((state) => state.photos);

	//gridcounters

	useEffect(() => {
		if (!photos.length) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, photos]);

	//griditemkey

	return <styled.Container>
		{/* rendergrid */}
		{photos.length ? photos.map((photo, index) =>
				<GridPhoto key={index} photo={photo} />) :
			<Spinner/>}
	</styled.Container>;
};

export default PhotosGrid;