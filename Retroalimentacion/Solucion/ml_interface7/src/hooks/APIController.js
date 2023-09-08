export default class API {
    static port = 8002;
    static host = "172.20.10.7";

    static URL(path) {
        return `http://${this.host}:${this.port}/${path}`;
    }

    static async POST(path, body) {
        const url = this.URL(path);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        if (!response.ok) {
            throw new Error(`POST request to ${url} failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
}
