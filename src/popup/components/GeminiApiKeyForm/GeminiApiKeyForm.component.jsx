import { useState } from "react";
import { StorageUtils } from "../../utils/storage.js";

export const GeminiApiKeyForm = ({ onApiKeySubmitted }) => {

    const [geminiApiKey, setGeminiApiKey] = useState("");

    const onApiKeySubmitHandler = async (e) => {

        e.preventDefault();

        await StorageUtils.saveAPIKey(geminiApiKey);
        onApiKeySubmitted(geminiApiKey);
    }

    const isFormValid = geminiApiKey && geminiApiKey.length > 0;

    return (
        <form
            onSubmit={onApiKeySubmitHandler}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
        >
            <div>Add you Gemini API key:</div>

            <input
                type="text"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
            />

            <button type="submit" disabled={!isFormValid}>Save</button>
        </form>
    );
}