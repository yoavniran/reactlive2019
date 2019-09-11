import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";
import { TYPES } from "../consts";
import GridPhoto from "./GridPhoto";
import * as styled from "./PhotosGrid.styled";
import { FixedSizeGrid as Grid } from "react-window";

const getItemIndex = (col, row, colCount) => ((row * colCount) + col);

const GridItemRenderer = ({ style, columnIndex, rowIndex, data }) => {
	const index = getItemIndex(columnIndex, rowIndex, data.colCount);

	return index < data.photos.length && <GridPhoto photo={data.photos[index]}
	                                                style={style}/>;
};

const PhotosGrid = ({width, height}) => {
	const gridRef = useRef();
	const dispatch = useDispatch();
	const photos = useSelector((state) => state.photos);

	const colCount = Math.floor(width / 230),
		rowCount = Math.ceil(photos.length / colCount);

	useEffect(() => {
		if (!photos.length) {
			dispatch(actions[TYPES.FETCH_PHOTOS]());
		}
	}, [dispatch, photos]);

	const itemData = useMemo(
		() => ({ colCount, photos }),
		[colCount, photos]
	);

	const calculateItemKey = useCallback(({ columnIndex, data, rowIndex }) => {
		const index = getItemIndex(columnIndex, rowIndex, data.colCount);
		return photos[index] ? photos[index].id : "__last";
	}, [photos]);

	return <styled.Container>
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
	</styled.Container>;
};

export default PhotosGrid;