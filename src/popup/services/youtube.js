
import { YoutubeTranscript } from 'youtube-transcript';

export class YoutubeServices {

    static async getVideoMetadata() {

    }

    /**
     * 
     * @param {string} videoId 
     * @returns {{text: string, duration: number, offset: number, lang: string}[]}
     */
    static async getVideoTranscript(videoId) {

        const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
        return transcriptData
    }
}