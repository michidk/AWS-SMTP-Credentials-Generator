"use client";

import { PrivacyWarning } from "@/components/PrivacyWarning";
import { StarOnGithub } from "@/components/github/StarOnGithub";
import { ViewSourceOnGithub } from "@/components/github/ViewSourceOnGithub";
import { SmtpCredentialsDisplay } from "@/components/smtp/SmtpCredentialsDisplay";
import { SmtpForm } from "@/components/smtp/SmtpForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getSmtpEndpoint } from "@/lib/ses";
import type { SmtpCredentials } from "@/types/smtp";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function Page() {
	const [credentials, setCredentials] = useState<SmtpCredentials | null>(null);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
			<div className="w-full max-w-2xl flex flex-col items-center space-y-4">
				<StarOnGithub />

				<Card className="w-full">
					<CardHeader>
						<CardTitle className="text-2xl font-bold flex items-center gap-2">
							<Mail className="h-5 w-5" />
							AWS SMTP Credentials Generator
						</CardTitle>
						<CardDescription className="mt-1">
							Generate SMTP credentials and connection details for AWS SES
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<PrivacyWarning />

						<SmtpForm onGenerate={setCredentials} />

						{credentials && (
							<SmtpCredentialsDisplay
								credentials={credentials}
								endpoint={getSmtpEndpoint(credentials.region)}
							/>
						)}
					</CardContent>
				</Card>

				<ViewSourceOnGithub />
			</div>
		</main>
	);
}
