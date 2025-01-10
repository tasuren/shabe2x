import Layout from "@/components/Layout";
import "./App.css";
import { LibraryProvider } from "@/components/Context";
import MainContent from "@/components/MainContent";

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
