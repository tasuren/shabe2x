import { ThemeProvider } from "@lib/theme";
import "./App.css";
import Layout from "./components/Layout";

const App = () => {
	return (
		<ThemeProvider>
			<Layout>a</Layout>
		</ThemeProvider>
	);
};

export default App;
