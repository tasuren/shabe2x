import { usePaper, useTTS } from "../Context";

function VoiceController({ getText }: { getText: () => string }) {
    const tts = useTTS();

    return (
        <>
            <button type="button" onClick={() => tts.speech(getText(), 0.5)}>
                ゆっくり再生
            </button>
            <button type="button" onClick={() => tts.speech(getText(), 1)}>
                再生
            </button>
            <button type="button" onClick={() => tts.cancel()}>
                停止
            </button>
        </>
    );
}

export default VoiceController;
