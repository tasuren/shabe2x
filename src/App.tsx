import { ThemeProvider } from "@lib/theme";
import Paper from "@components/Paper";
import Layout from "@components/Layout";

import "./App.css";
import Controller from "@components/Controller";

const App = () => {
	return (
		<ThemeProvider>
			<Layout>
				<div class="flex flex-col">
					<Controller />
					<Paper />
				</div>
			</Layout>
		</ThemeProvider>
	);
};

export default App;
