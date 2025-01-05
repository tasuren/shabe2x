import Controller from "@/components/Controller";
import Layout from "@/components/Layout";
import Paper from "@/components/Paper";

import "./App.css";
import { LibraryProvider } from "./components/Context";

function MainContent() {
	return (
		<div class="h-full flex flex-col">
			<Controller />
			<Paper />
		</div>
	);
}

function App() {
	return (
		<LibraryProvider>
			<Layout>
				<MainContent />
			</Layout>
		</LibraryProvider>
	);
}

export default App;
