
export const STORAGE_KEYS = {
    "API_KEY": "API_KEY",

}

export class StorageUtils {

    static async saveAPIKey(apiKey) {

        await chrome.storage.local.set({ apiKey });
    }

    static async getStorageValue(key) {

        const result = await chrome.storage.local.get([key]);
        return result[key];
    }
}