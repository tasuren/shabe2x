import Controller from "@/components/Controller/Controller";
import QuickController from "@/components/Controller/QuickController";
import Paper from "@/components/Paper";
import Footer from "./Footer";

function MainContent() {
    return (
        <>
            <div class="h-full flex flex-col justify-between">
                <div class="space-y-4">
                    <Controller />
                    <Paper />
                </div>
                <Footer />
            </div>

            <QuickController />
        </>
    );
}

export default MainContent;
