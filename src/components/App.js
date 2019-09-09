import React from "react";
import { useSelector } from "react-redux";
import PhotosGrid from "./PhotosGrid";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import PhotoDrawer from "./PhotoDrawer";

const App = () => {
	const exposedId = useSelector((state) => state.exposedPhotoId);

	return (<div className="App">
		<GlobalStyles/>
		<Header/>
		<PhotosGrid />
		{exposedId && <PhotoDrawer exposedId={exposedId}/>}
	</div>);
};

export default App;
