import React, { memo, useEffect, useRef, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import styled from "styled-components";
import actions from "../store/actions";
import { TYPES } from "../consts";
import GridPhoto from "./GridPhoto";
import { FixedSizeGrid as Grid, areEqual } from "react-window";


const Container = styled.div`
	width: 100%;
	height: 100%;	
	background-color: #282c34;	
`;

const getItemIndex = (col, row, colCount) => ((row * colCount) + col);

const photoIdsSelector = createSelector(
	(state) => state.photos,
	(photos) => photos.map((p) => p.id)
);

const GridItemRenderer = ({ style, columnIndex, rowIndex, data }) => {
	const index = getItemIndex(columnIndex, rowIndex, data.colCount);

	return index < data.photos.length && <GridPhoto id={data.photos[index]}
	                                                style={style}/>;
};

const PhotosGrid = ({ width, height }) => {
	const gridRef = useRef();
	const dispatch = useDispatch();
	const photos = useSelector(photoIdsSelector);
	const hasPhotos = !!photos.length;

	console.log("!!!!!!!!!! RENDERING PHOTOS GRID");

	useEffect(() => {
		console.log("!!!!!!!!!! PhotosGrid useEffect called");

		if (!hasPhotos) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, hasPhotos]);

	const colCount = Math.floor(width / 230),
		rowCount = Math.ceil(photos.length / colCount);

	const itemData = useMemo(
		() => ({ colCount, photos }),
		[colCount, photos]
	);

	const calculateItemKey = useCallback(({ columnIndex, data, rowIndex }) => {
		const index = getItemIndex(columnIndex, rowIndex, data.colCount);
		return photos[index] || "__last";
	}, [photos]);

	return <Container>
		{photos.length ? <Grid
			ref={gridRef}
			columnCount={colCount}
			columnWidth={230}
			height={height}
			rowCount={rowCount}
			rowHeight={210}
			width={width}
			itemData={itemData}
			itemKey={calculateItemKey}>
			{GridItemRenderer}
		</Grid> : null}
	</Container>;
};

export default PhotosGrid;