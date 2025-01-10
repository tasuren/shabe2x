import ThemeToggleButton from "@/components/ThemeToggleButton";
import ManualButton from "./ManualButton";

function TitleBar() {
    return (
        <header class="mx-4 flex-none flex justify-between items-center">
            <h1 class="text-2xl md:text-3xl">しゃべしゃべ</h1>

            <div class="space-x-2 h-fit">
                <ManualButton />
                <ThemeToggleButton class="h-fit mr-2" />
            </div>
        </header>
    );
}

export default TitleBar;
