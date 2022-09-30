import HTTPService from "./HTTPService";
import UserService from "./UserService";

class AuthService extends HTTPService {
    currentUser = null;

    async login(email, password) {
        try {
            const params = { email: email.replace(/\s/g, ''), password: password.replace(/\s/g, '') };
            const session = await this.api.post("/users/login", params);
            localStorage.setItem("jwt", session.data.token);
            this.setDefaultHeader("Authorization", "Bearer " + session.data.token);

            const user = await this.api.get("/users/me");


            localStorage.setItem("currentUser", JSON.stringify(user.data));
            this.currentUser = user.data;
            return user;

        } catch (err) {
            return err;
        }
    }

    async logout() {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("jwt");
    };

    async getStoredUser() {
        const res = localStorage.getItem("currentUser");
        return JSON.parse(res);
    };

    getCurrentUser() {
        if (!this.currentUser) {
            this.currentUser = this.getStoredUser();
        }

        return this.currentUser;
    }
}

export default new AuthService();