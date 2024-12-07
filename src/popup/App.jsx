import { useEffect, useState } from 'react';
import './App.css';
import { GeminiApiKeyForm } from './components/GeminiApiKeyForm/GeminiApiKeyForm.component.jsx';
import { VideoResume } from './components/VideoResume/VideoResume.component.jsx';
import { STORAGE_KEYS, StorageUtils } from './utils/storage.js';

export const App = () => {

    const [geminiApiKey, setGeminiApiKey] = useState();

    const [isInitialized, setIsInitialized] = useState(false);

    const retrieveGeminiApiKeyFromStorage = async () => {

        debugger;
        const apiKey = await StorageUtils.getStorageValue(STORAGE_KEYS.API_KEY);
        console.log(apiKey);
        setGeminiApiKey(apiKey);

        setTimeout(() => {

            setIsInitialized(true);
        }, 300);
    }

    useEffect(() => { retrieveGeminiApiKeyFromStorage(); }, []);

    if (!isInitialized) {

        return (
            <div>
                <h1>Welcome to Shortly!</h1>
            </div>
        );
    }

    return (
        <>
            <h1>Shortly</h1>
            <div className="card">

                {!geminiApiKey && <GeminiApiKeyForm
                    onApiKeySubmitted={(key) => { setGeminiApiKey(key) }}
                />}

                {geminiApiKey && <VideoResume geminiApiKey={geminiApiKey} />}
            </div>
        </>
    )
}