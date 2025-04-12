import { usePaper, useTTS } from "@/components/Context";

function VoiceController() {
    const [paper, _] = usePaper();
    const tts = useTTS();

    return (
        <>
            <button
                type="button"
                onClick={() => tts.speech(paper().getText(), "slow")}
            >
                ゆっくり再生
            </button>
            <button
                type="button"
                onClick={() => tts.speech(paper().getText(), "normal")}
            >
                再生
            </button>
            <button type="button" onClick={() => tts.cancel()}>
                停止
            </button>
        </>
    );
}

export default VoiceController;
