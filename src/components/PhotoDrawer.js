import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import { TYPES } from "../consts";
import Transformation from "./Transformation";
import icons from "../icons";
import * as styled from "./PhotoDrawer.styled";
//impresource

//concres

const DrawerContent =  ({exposedId}) => {
	const imgRef = useRef();
	const dispatch = useDispatch();
	const [imgSize, setImgSize] = useState({height: 0 });
	const photo = useSelector((state) => state.photos.find((p) => p.id === exposedId));

	const transformations = useSelector((state) => state.transformations[exposedId]);

	useLayoutEffect(() => {
		if (!transformations) {
			dispatch(actions[TYPES.FETCH_PHOTO_TRANSFORMATIONS]({ id: exposedId }));
		}
	}, [transformations, dispatch, exposedId]);

	//readtranforms

	const enableTransformation = (name, url) => {
		dispatch(actions[TYPES.SET_PHOTO_TRANSFORMATION_URL]({
			photoId: photo.id,
			url,
			name,
		}))
	};

	const onImageLoad = () => {
		const img = imgRef.current;

		if (img) {
			const size = { height: 0 },
				maxHeight = window.innerHeight - 220;

			size.height = Math.min(maxHeight, img.naturalHeight);
			setImgSize(size);
		}
	};

	const unsetExposed = () => dispatch(actions[TYPES.SET_EXPOSED_PHOTO]({ id: null }));

	return <Fragment>
		<styled.CloseButton onClick={unsetExposed} path={icons.close} fill="#FFFFFF"/>
		<styled.ImageContainer>
			<styled.Image src={photo.exposedUrl}
			              ref={imgRef}
			              size={imgSize}
			              onLoad={onImageLoad}/>
		</styled.ImageContainer>
		<styled.Transformations>
			{transformations && transformations.map((t) =>
				<Transformation key={t.name} {...t} photoId={exposedId}
				                selected={t.name === photo.transformationName}
				                enableTransformation={enableTransformation}/>)}
		</styled.Transformations>
	</Fragment>
};

const PhotoDrawer = ({ exposedId }) => {

	useLayoutEffect(() => {
		document.body.classList.add("no-scroll");

		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, []);

	return <styled.Overlay>
		<styled.Container>
			{/* susdrawer */}

			<DrawerContent exposedId={exposedId}/>
		</styled.Container>
	</styled.Overlay>;
};

export default PhotoDrawer;