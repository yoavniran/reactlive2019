import React, {StrictMode} from "react";
import { unstable_createRoot as createRoot } from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import getStore from "./store/store";

const store = getStore();

window.__store = store;

createRoot(document.getElementById("root"))
	.render(<Provider store={store}>
		<StrictMode>
			<App/>
		</StrictMode>
	</Provider>);
