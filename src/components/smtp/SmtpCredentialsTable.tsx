"use client";

import { CopyButton } from "@/components/misc/CopyButton";
import { PasswordDisplay } from "@/components/misc/PasswordDisplay";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { SMTP_PORTS } from "@/lib/ses";
import type { SmtpCredentials } from "@/types/smtp";

interface SmtpCredentialsTableProps {
	credentials: SmtpCredentials;
	endpoint: string;
}

export function SmtpCredentialsTable({
	credentials,
	endpoint,
}: SmtpCredentialsTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Setting</TableHead>
					<TableHead>Value</TableHead>
					<TableHead className="w-[100px]">Copy</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">SMTP Server</TableCell>
					<TableCell className="font-mono">{endpoint}</TableCell>
					<TableCell>
						<CopyButton text={endpoint} />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">SMTP Ports</TableCell>
					<TableCell>
						{SMTP_PORTS.STARTTLS.map((port) => (
							<div key={port}>{port} (STARTTLS)</div>
						))}
						{SMTP_PORTS.TLS.map((port) => (
							<div key={port}>{port} (TLS/SSL)</div>
						))}
					</TableCell>
					<TableCell />
				</TableRow>
				{credentials.username && (
					<TableRow>
						<TableCell className="font-medium">Username</TableCell>
						<TableCell className="font-mono">{credentials.username}</TableCell>
						<TableCell>
							<CopyButton text={credentials.username} />
						</TableCell>
					</TableRow>
				)}
				<TableRow>
					<TableCell className="font-medium">Password</TableCell>
					<TableCell className="font-mono text-xs break-all">
						<PasswordDisplay password={credentials.password} />
					</TableCell>
					<TableCell>
						<CopyButton text={credentials.password} />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Authentication</TableCell>
					<TableCell>SMTP AUTH (LOGIN/PLAIN)</TableCell>
					<TableCell />
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Encryption</TableCell>
					<TableCell>TLS/STARTTLS required</TableCell>
					<TableCell />
				</TableRow>
			</TableBody>
		</Table>
	);
}
