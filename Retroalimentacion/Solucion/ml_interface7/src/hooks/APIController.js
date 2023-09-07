export default class API {
    static port = 8001;
    static host = "localhost"
    
    static URL(path){
        return `http://${this.host}:${this.port}/${path}`;
    }

    static async POST(path, body) {
        const url = this.url(path);
        
        let { data } = await fetch(url, body);

        return data;
    }
}