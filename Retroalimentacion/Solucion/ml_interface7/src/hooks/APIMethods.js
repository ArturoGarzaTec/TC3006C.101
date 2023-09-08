import API from "/src/hooks/APIController";

export default class APIMethods {
    static async postPassenger(passenger) {
        let body = {};
        for (let key in passenger) {
            body[key] = passenger[key];
        }
        let form = body;
        console.log("form: " + JSON.stringify(form));

        const response = await API.POST(`passengers/`, form);
        console.log(response);
        return response;
    }
}

