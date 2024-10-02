import http from "../../shared/http-common.js";

export class TreadmillService {
    resourceEndpoint = '/treadmills';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }
}