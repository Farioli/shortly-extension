
import { YoutubeTranscript } from 'youtube-transcript';

export class YoutubeServices {

    static async getVideoMetadata() {

    }

    static async getVideoTranscript(videoId) {

        const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
        return transcriptData
    }
}