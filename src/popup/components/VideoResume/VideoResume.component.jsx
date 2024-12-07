import { useEffect, useState } from "react";
import { GeminiServices } from "../../services/gemini.js";
import { YoutubeServices } from "../../services/youtube.js";

export const VideoResume = ({ geminiApiKey }) => {

    const [videoId, setVideoId] = useState('');

    const [transcript, setTranscript] = useState();

    const [recap, setRecap] = useState();

    const [isResuming, setIsResuming] = useState(false);

    const onRecapVideoHandler = async () => {

        try {

            setIsResuming(true);

            const generatedRecap = await GeminiServices
                .generateRecap(transcript, geminiApiKey);

            setRecap(generatedRecap);
        } catch (err) {

            console.error("Error!", err);
        } finally {

            setIsResuming(false);
        }

    }

    const readActivePageYoutubeVideoId = async () => {

        try {

            const tabs = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            const currentUrl = tabs[0].url;
            const youtubeVideoId = currentUrl.split("?v=")[1];
            setVideoId(youtubeVideoId);

            const transcriptData = await YoutubeServices.getVideoTranscript(youtubeVideoId);

            let transcriptDataFullText = "";

            for (let i = 0; i < transcriptData.length; i++) {

                transcriptDataFullText += transcriptData[i].text;
            }

            setTranscript(transcriptDataFullText);
        } catch (err) {

            console.error("Unable to get the current video Id");
        }
    }

    useEffect(() => { readActivePageYoutubeVideoId(); }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <div>Youtube video id is {videoId}</div>

            <button onClick={onRecapVideoHandler} disabled={!transcript}>
                {!transcript && <span>Loading transcript...</span>}
                {transcript && <span>Recap, please!</span>}
            </button>

            {isResuming && <div>Resuming...</div>}

            {(!isResuming && recap) && <p>{recap}</p>}
        </div>
    );
}