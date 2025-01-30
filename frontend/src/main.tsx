import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { store } from "./store";
import "./styles/tailwind.css";
import "./styles/global.css";

const rootElement = document.querySelector("#root") as Element;
const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
