export interface SmtpCredentials {
	username: string;
	password: string;
	region: string;
}

export interface FormErrors {
	secretKey?: string;
	region?: string;
}
