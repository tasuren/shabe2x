import { usePaper, useTTS } from "@/components/Context";

function VoiceController() {
    const [paper, _] = usePaper();
    const tts = useTTS();

    return (
        <>
            <button
                type="button"
                onClick={() => tts.speech(paper().getText(), 0.5)}
            >
                ゆっくり再生
            </button>
            <button type="button" onClick={() => tts.speech(paper().getText(), 1)}>
                再生
            </button>
            <button type="button" onClick={() => tts.cancel()}>
                停止
            </button>
        </>
    );
}

export default VoiceController;
