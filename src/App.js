import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PhotosGrid from "./components/PhotosGrid";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import PhotoDrawer from "./components/PhotoDrawer";
import CypressProfiler from "./components/CypressProfiler";
import AutoSizer from "react-virtualized-auto-sizer";
// const PhotosGrid = React.lazy(() => import("./components/PhotosGrid"));

const GridContainer = styled.div`
	width: 100%;
	height: calc(100vh - 100px);
	background-color: #282c34;
`;

const App = () => {
	const exposedId = useSelector((state) => state.exposedPhotoId);

	return (<div className="App">
		<GlobalStyles/>
		<Header/>
		<GridContainer>
			<AutoSizer>
				{({ height, width }) =>
					<PhotosGrid height={height} width={width} />}
			</AutoSizer>
		</GridContainer>
		{exposedId && <PhotoDrawer exposedId={exposedId}/>}
	</div>);
};

export default App;
