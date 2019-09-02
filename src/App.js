import React from "react";
import { useSelector } from "react-redux";
import PhotosGrid from "./components/PhotosGrid";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import PhotoDrawer from "./components/PhotoDrawer";

const App = () => {
	const exposedId = useSelector((state) => state.exposedPhotoId);

	return (<div className="App">
		<Header/>
		<GlobalStyles/>
		<PhotosGrid/>
		{exposedId && <PhotoDrawer exposedId={exposedId}/>}
	</div>);
};

export default App;
