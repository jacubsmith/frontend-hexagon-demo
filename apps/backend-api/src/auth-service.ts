import { nanoid } from "nanoid";
import { User } from "@/model/user";

class AuthService {
	users: Array<User>;

	constructor() {
		this.users = [];
	}

	auth(username: string, password: string): string {
		const found = this.users.find((user) => user.username === username);
		if (!found || found.password !== password) {
			throw new Error("Bad credentials");
		}

		return Buffer.from(`${username}:${password}`, "utf-8").toString("base64");
	}

	register(username: string, password: string) {
		const found = this.users.find((user) => user.username === username);
		if (found) {
			throw new Error("User already exists");
		}
		this.users.push({
			id: nanoid(10),
			username,
			password,
		});
	}
}

export { AuthService };
