import { useEffect, useState } from 'react';
import './App.css';
import { YoutubeServices } from './services/youtube.js';

export const App = () => {

    const [videoId, setVideoId] = useState('');

    const [transcript, setTranscript] = useState();

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
            console.log(transcriptData);

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

                <button onClick={onRecapVideoHandler}>Recap, please!</button>
            </div>
        </>
    )
}