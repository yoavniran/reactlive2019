import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import PhotosGrid from "./components/PhotosGrid";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import PhotoDrawer from "./components/PhotoDrawer";
import CypressProfiler from "./components/CypressProfiler";
// const PhotosGrid = React.lazy(() => import("./components/PhotosGrid"));

const App = () => {
	const exposedId = useSelector((state) => state.exposedPhotoId);

	return (<div className="App">
		<GlobalStyles/>
		<Header/>
		<Suspense fallback={<div>Loading...</div>}>
			<CypressProfiler>
				<PhotosGrid />
			</CypressProfiler>
		</Suspense>
		{exposedId && <PhotoDrawer exposedId={exposedId}/>}
	</div>);
};

export default App;
