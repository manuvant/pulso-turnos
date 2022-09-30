import CRUDService from "./CRUDService";
import config from "../config";

class UserService extends CRUDService {
    constructor() {
        super("users");
    }

    async suscribePlan(plan) {
        return await this.api.post(config.backendUrl + "/" + "user-plans", plan);
    }

    async findUserSuscriptions(filter = {}) {
        return await this.api.get(config.backendUrl + "/" + "user-plans", {
            params: {
                filter: {
                    where: {
                        userId: filter
                    }
                }
            }
        });
    }

    async createFirst(plan, paymentType) {
        return await this.api.post(config.backendUrl + `/user-plans/create/first?exclude=${paymentType}`, plan);
    }

    async createPayment (plan) {
        return await this.api.post(config.backendUrl + `/users/createPayment`, plan);
    }

    async resetPasswordInit(userEmail) {
        return await this.api.post(config.backendUrl + "/users/reset-password/init", { email: userEmail });
    }

    async resetPasswordFinish(data) {
        return await this.api.put(config.backendUrl + "/users/reset-password/finish", data);
    }

    async changePassword(id, password) {
        return await this.api.post(config.backendUrl + "/users/changePassword", {
            id,
            password
        })
    }
}

export default new UserService();