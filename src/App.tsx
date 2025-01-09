import Controller from "@/components/Controller/Controller";
import Layout from "@/components/Layout";
import Paper from "@/components/Paper";

import "./App.css";
import { LibraryProvider } from "./components/Context";
import QuickController from "./components/Controller/QuickController";

function MainContent() {
    return (
        <div class="h-full flex flex-col">
            <Controller />
            <Paper />
            <QuickController />
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
