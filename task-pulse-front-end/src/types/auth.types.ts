export interface AuthForm {
	email: string;
	password: string;
}

export interface User {
	id: number;
	name?: string;
	email: string;

	workInterval?: number;
	breakInterval?: number;
	intervalsCount?: number;
}

export interface AuthResponse {
	accessToken: string;
	user: User;
}

export type TypeUserForm = Omit<User, "id"> & { password?: string };
