import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { useSelector } from "react-redux";
import PhotosGrid from "./PhotosGrid";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import PhotoDrawer from "./PhotoDrawer";
import InteractionProfiler from "./InteractionProfiler";
import * as styled from "./App.styled";

const App = () => {
	const exposedId = useSelector((state) => state.exposedPhotoId);

	return (<div className="App">
		<GlobalStyles/>
		<Header/>
		<styled.GridContainer>
			{/*autosizer*/}
			<InteractionProfiler>
				<PhotosGrid/>
			</InteractionProfiler>
		</styled.GridContainer>
		{exposedId && <PhotoDrawer exposedId={exposedId}/>}
	</div>);
};

export default App;
