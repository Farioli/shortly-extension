import { useEffect, useState } from 'react';
import './App.css';
import { GeminiServices } from './services/gemini.js';
import { YoutubeServices } from './services/youtube.js';

export const App = () => {

    const [videoId, setVideoId] = useState('');

    const [transcript, setTranscript] = useState();

    const [geminiApiKey, setGeminiApiKey] = useState();

    const [recap, setRecap] = useState();

    const readActivePageYoutubeVideoId = async () => {

        try {

            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

            const currentUrl = tabs[0].url;
            const youtubeVideoId = currentUrl.split("?v=")[1];
            setVideoId(youtubeVideoId);
        } catch (err) {

            console.error("Unable to get the current video Id");
        }
    }

    const onRecapVideoHandler = async () => {

        try {

            const transcriptData = await YoutubeServices.getVideoTranscript(videoId);

            let transcriptDataFullText = "";

            for (let i = 0; i < transcriptData.length; i++) {

                transcriptDataFullText += transcriptData[i].text;
            }

            setTranscript(transcriptDataFullText);

            const generatedRecap = await GeminiServices
                .generateRecap(transcriptDataFullText, geminiApiKey);

            setRecap(generatedRecap);
        } catch (err) {

            console.error("Error!", err);
        }
    }

    useEffect(() => { readActivePageYoutubeVideoId(); }, []);

    return (
        <>
            <h1>Shortly</h1>
            <div className="card">

                <div>Youtube video id is {videoId}</div>

                <div>Add you Gemini API key:</div>
                <input
                    type="text"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                />

                <button onClick={onRecapVideoHandler}>Recap, please!</button>

                {transcript && <div>Transcript loaded!</div>}

                {recap && <p>{recap}</p>}
            </div>
        </>
    )
}