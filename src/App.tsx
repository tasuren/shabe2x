import { ThemeProvider } from "@lib/theme";
import "./App.css";
import { Header } from "./components/layout";

const App = () => {
	return (
		<ThemeProvider>
			<Header />
		</ThemeProvider>
	);
};

export default App;
