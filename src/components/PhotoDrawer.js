import React, {
	useLayoutEffect,
	useRef,
	useState,
	Suspense,
	useCallback,
	Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { unstable_createResource as createResource } from "react-cache";
import styled from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";
import actions from "../store/actions";
import { TYPES } from "../consts";
import Transformation from "./Transformation";
import Svg from "./Svg";
import icons from "../icons";
import { makeRequest } from "../api";

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
	align-items: center;
	justify-content: center;
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
	width: auto;	
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

const transformationsResource = createResource((photoId) => {
	return new Promise((resolve) => {
		makeRequest(`transformations?id=${photoId}`)
			.then((response) => {
				setTimeout(()=>{
					resolve({ urls: response.urls });
				}, 1000);
			});
	});
});

const Spinner = () => <BounceLoader
	sizeUnit="px"
	size={90}
	color="#36D7B7"
	loading/>;

const DrawerContent = ({ photo, unsetExposed }) => {
	const imgRef = useRef();
	const photoTransformations = transformationsResource.read(photo.id);
	const [imgSize, setImgSize] = useState({ height: 0 });

	const onImageLoad = () => {
		const img = imgRef.current;

		if (img) {
			const size = { height: 0 },
				maxHeight = window.innerHeight - 220;
			// ratio = img.naturalWidth / img.naturalHeight;

			size.height = Math.min(maxHeight, img.naturalHeight);

			setImgSize(size);
		}
	};

	return <Fragment>
		<CloseButton onClick={unsetExposed} path={icons.close} fill="#FFFFFF"/>
		<ImageContainer>
			<Image src={photo.exposedUrl}
			       ref={imgRef}
			       size={imgSize}
			       onLoad={onImageLoad}/>
		</ImageContainer>
		<Transformations>
			{photoTransformations && photoTransformations.urls.map((t) =>
				<Transformation key={t.name} {...t} photoId={photo.id}
				                selected={t.name === photo.transformationName}/>)}
		</Transformations>
	</Fragment>;
};

const PhotoDrawer = ({ exposedId }) => {
	const dispatch = useDispatch();
	const photo = useSelector((state) => state.photos.find((p) => p.id === exposedId));

	// useLayoutEffect(() => {
	// 	if (!photoTransformations) {
	// 		dispatch(actions[TYPES.FETCH_PHOTO_TRANSFORMATIONS]({ id: exposedId }));
	// 	}
	// }, [photoTransformations, dispatch, exposedId]);

	useLayoutEffect(() => {
		document.body.classList.add("no-scroll");

		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, []);

	const unsetExposed = useCallback(
		() => dispatch(actions[TYPES.SET_EXPOSED_PHOTO]({ id: null })),
		[dispatch]);

	return <Overlay>
		<Container>
			<Suspense fallback={<Spinner/>}>
				<DrawerContent photo={photo} unsetExposed={unsetExposed}/>
			</Suspense>
		</Container>
	</Overlay>;
};

export default PhotoDrawer;