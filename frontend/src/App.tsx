import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

const theme = createTheme({
	typography: {
		fontFamily: "D-DIN-Bold, Arial, Verdana, sans-serif",
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
