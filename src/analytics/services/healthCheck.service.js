import http from "../../shared/http-common.js";

export class HealthCheckService {
    resourceEndpoint = '/health-checks';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }
}