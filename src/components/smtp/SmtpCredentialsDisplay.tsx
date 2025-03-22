"use client";

import { CopyButton } from "@/components/misc/CopyButton";
import { formatSmtpConnectionDetails } from "@/lib/ses";
import type { SmtpCredentials } from "@/types/smtp";
import { SmtpCredentialsTable } from "./SmtpCredentialsTable";

interface SmtpCredentialsDisplayProps {
	credentials: SmtpCredentials;
	endpoint: string;
}

export function SmtpCredentialsDisplay({
	credentials,
	endpoint,
}: SmtpCredentialsDisplayProps) {
	return (
		<div className="mt-6 space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-medium">SMTP Connection Details</h3>
				<CopyButton
					text={formatSmtpConnectionDetails({
						endpoint,
						username: credentials.username,
						password: credentials.password,
					})}
					variant="outline"
				>
					Copy All
				</CopyButton>
			</div>
			<SmtpCredentialsTable credentials={credentials} endpoint={endpoint} />
		</div>
	);
}
