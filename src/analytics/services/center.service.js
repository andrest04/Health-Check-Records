import http from "../../shared/http-common.js";

export class CenterService {
    resourceEndpoint = '/centers';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }
}