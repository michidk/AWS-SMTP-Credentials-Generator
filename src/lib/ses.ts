export function getSmtpEndpoint(region: string): string {
	if (!region) return "";

	// Special case for GovCloud regions
	if (region.startsWith("us-gov-")) {
		return `email-smtp.${region}.amazonaws.com`;
	}

	return `email-smtp.${region}.amazonaws.com`;
}

export const SMTP_PORTS = {
	STARTTLS: [25, 587, 2587],
	TLS: [465],
} as const;

export function formatSmtpConnectionDetails(params: {
	endpoint: string;
	username?: string;
	password: string;
}) {
	const { endpoint, username, password } = params;

	let details = `AWS SMTP Connection Details:
---------------------------------------
SMTP Server: ${endpoint}
SMTP Ports:
  - 25 (STARTTLS)
  - 587 (STARTTLS)
  - 2587 (STARTTLS)
  - 465 (TLS/SSL)
`;

	if (username) {
		details += `Username: ${username}\n`;
	}

	details += `Password: ${password}
Authentication: SMTP AUTH (LOGIN/PLAIN)
Encryption: TLS/STARTTLS required
---------------------------------------`;

	return details;
}
