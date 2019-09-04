import React, { useLayoutEffect, useRef, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import actions from "../store/actions";
import { TYPES } from "../consts";
import Transformation from "./Transformation";
import Svg from "./Svg";
import icons from "../icons";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 20px;
	background-color: rgba(40,44,52,0.80);
`;

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #15171b;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 2;
`;

const Image = styled.img`
	width: ${({ size }) => size.width ? `${size.width}px` : "auto"};
	height: ${({ size }) => size.height ? `${size.height}px` : "auto"};
`;

const Transformations = styled.div`
	height: 200px;
	width: 100%;
	display: flex;
	border-top: 2px solid #61dafb;
	align-items: center;
`;

const CloseButton = styled(Svg)`
	position: absolute;
	top: 4px;
	right: 4px;
	cursor:pointer;
`;

const PhotoDrawer = ({ exposedId }) => {
	const imgRef = useRef();
	const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
	const dispatch = useDispatch();
	const photoTransformations = useSelector((state) => state.transformations[exposedId]);
	const photo = useSelector((state) => state.photos.find((p) => p.id === exposedId)); //TODO: !!!!!!!!! MEMOIZE

	useLayoutEffect(() => {
		if (!photoTransformations) {
			dispatch(actions[TYPES.FETCH_PHOTO_TRANSFORMATIONS]({ id: exposedId }));
		}
	}, [photoTransformations, dispatch, exposedId]);

	useLayoutEffect(() => {
		document.body.classList.add("no-scroll");

		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, []);

	const onImageLoad = () => {
		const img = imgRef.current;

		if (img) {
			const size = { width: "auto", height: 0 },
				maxHeight = window.innerHeight - 220;
			// ratio = img.naturalWidth / img.naturalHeight;

			size.height = Math.min(maxHeight, img.naturalHeight);

			setImgSize(size);
		}
	};

	const unsetExposed = () => dispatch(actions[TYPES.SET_EXPOSED_PHOTO]({ id: null }));

	return <Overlay>
		<Container>
			<CloseButton onClick={unsetExposed} path={icons.close} fill="#FFFFFF"/>
			<ImageContainer>
				<Image src={photo.exposedUrl}
				       ref={imgRef}
				       size={imgSize}
				onLoad={onImageLoad}/>
			</ImageContainer>
			<Transformations>
				{photoTransformations && photoTransformations.map((t) =>
					<Transformation key={t.name} {...t} photoId={exposedId}
					                selected={t.name === photo.transformationName}/>)}
			</Transformations>
		</Container>
	</Overlay>;
};

export default PhotoDrawer;