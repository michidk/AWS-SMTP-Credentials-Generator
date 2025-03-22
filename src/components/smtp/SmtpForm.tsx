"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { AWS_CONSTANTS, SMTP_REGIONS } from "@/constants";
import { sign } from "@/lib/crypto";
import type { FormErrors, SmtpCredentials } from "@/types/smtp";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface SmtpFormProps {
	onGenerate: (credentials: SmtpCredentials) => void;
}

export function SmtpForm({ onGenerate }: SmtpFormProps) {
	const [accessKeyId, setAccessKeyId] = useState("");
	const [secretKey, setSecretKey] = useState("");
	const [region, setRegion] = useState("");
	const [showSecretKey, setShowSecretKey] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!secretKey.trim()) {
			newErrors.secretKey = "Secret Access Key is required";
		}

		if (!region) {
			newErrors.region = "Region is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleGenerate = async () => {
		if (!validateForm()) return;

		setIsLoading(true);
		try {
			const { DATE, SERVICE, MESSAGE, TERMINAL, VERSION } = AWS_CONSTANTS;

			const encoder = new TextEncoder();
			const initialKey = encoder.encode(`AWS4${secretKey}`);
			let signature = await sign(initialKey, DATE);

			signature = await sign(new Uint8Array(signature), region);
			signature = await sign(new Uint8Array(signature), SERVICE);
			signature = await sign(new Uint8Array(signature), TERMINAL);
			signature = await sign(new Uint8Array(signature), MESSAGE);

			const signatureArray = new Uint8Array(signature);
			const versionAndSignature = new Uint8Array(1 + signatureArray.length);
			versionAndSignature[0] = VERSION;
			versionAndSignature.set(new Uint8Array(signature), 1);

			const base64Password = btoa(
				String.fromCharCode.apply(null, Array.from(versionAndSignature)),
			);

			onGenerate({
				username: accessKeyId,
				password: base64Password,
				region,
			});
		} catch (error) {
			console.error("Error generating credentials:", error);
			setErrors({
				secretKey: "Error generating credentials. Please check your inputs.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="accessKeyId">AWS Access Key ID (optional)</Label>
					<Input
						id="accessKeyId"
						value={accessKeyId}
						onChange={(e) => setAccessKeyId(e.target.value)}
						placeholder="AKIAIOSFODNN7EXAMPLE"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="secretKey">
						AWS Secret Access Key <span className="text-red-500">*</span>
					</Label>
					<div className="relative">
						<Input
							id="secretKey"
							type={showSecretKey ? "text" : "password"}
							value={secretKey}
							onChange={(e) => {
								setSecretKey(e.target.value);
								if (errors.secretKey) {
									setErrors({ ...errors, secretKey: undefined });
								}
							}}
							placeholder="Enter your AWS Secret Access Key"
							className={errors.secretKey ? "border-red-500" : ""}
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute right-0 top-0 h-full"
							onClick={() => setShowSecretKey(!showSecretKey)}
						>
							{showSecretKey ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</Button>
					</div>
					{errors.secretKey && (
						<p className="text-sm text-red-500">{errors.secretKey}</p>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="region">
					AWS Region <span className="text-red-500">*</span>
				</Label>
				<Select
					value={region}
					onValueChange={(value) => {
						setRegion(value);
						if (errors.region) {
							setErrors({ ...errors, region: undefined });
						}
					}}
				>
					<SelectTrigger
						id="region"
						className={errors.region ? "border-red-500" : ""}
					>
						<SelectValue placeholder="Select AWS Region" />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(SMTP_REGIONS).map(([code, name]) => (
							<SelectItem key={code} value={code}>
								{code} - {name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.region && (
					<p className="text-sm text-red-500">{errors.region}</p>
				)}
			</div>

			<Button onClick={handleGenerate} className="w-full" disabled={isLoading}>
				{isLoading ? "Generating..." : "Generate SMTP Credentials"}
			</Button>
		</div>
	);
}
