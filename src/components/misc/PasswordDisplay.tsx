"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordDisplayProps {
	password: string;
}

export function PasswordDisplay({ password }: PasswordDisplayProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<button
				type="button"
				className="w-full text-left"
				onClick={() => !showPassword && setShowPassword(true)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						!showPassword && setShowPassword(true);
					}
				}}
			>
				{showPassword ? (
					password
				) : (
					<span className="select-none text-2xl leading-none tracking-[-0.2em]">
						{"•".repeat(33)}
					</span>
				)}
			</button>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-0 top-1/2 transform -translate-y-1/2"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? (
					<EyeOff className="h-4 w-4" />
				) : (
					<Eye className="h-4 w-4" />
				)}
				<span className="sr-only">
					{showPassword ? "Hide" : "Show"} password
				</span>
			</Button>
		</div>
	);
}
