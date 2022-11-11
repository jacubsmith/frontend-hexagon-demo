interface IAuthenticationAdapter {
	auth(username: string, password: string): Promise<string>;
	register(username: string, password: string);
}

export type { IAuthenticationAdapter };
