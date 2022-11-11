import { IAuthenticationAdapter } from "../iauthentication-adapter";

class AuthenticationInMemAdapter implements IAuthenticationAdapter {
	users;

	constructor() {
		this.users = [
			{
				username: "unicorn",
				password: "rainbow",
			},
		];
	}

	async auth(username: string, password: string): Promise<string> {
		const found = this.users.find((user) => user.username === username);
		if (!found || found.password !== password) {
			throw new Error("Bad credentials");
		}
		return btoa(`${username}:${password}`);
	}

	async register(username: string, password: string) {
		const found = this.users.find((user) => user.username === username);
		if (found) {
			throw new Error("User already exists");
		}
		this.users.push({
			username,
			password,
		});
	}
}

export { AuthenticationInMemAdapter };
