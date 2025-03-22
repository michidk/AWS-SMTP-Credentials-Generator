"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	text: string;
	variant?: "ghost" | "outline";
	size?: "sm" | "default";
	children?: React.ReactNode;
}

export function CopyButton({
	text,
	variant = "ghost",
	size = "sm",
	children,
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Button
			variant={variant}
			size={size}
			className="flex items-center gap-1"
			onClick={handleCopy}
		>
			{copied ? (
				<>
					<Check className="h-4 w-4" />
					{children ?? "Copied"}
				</>
			) : (
				<>
					<Copy className="h-4 w-4" />
					{children ?? "Copy"}
				</>
			)}
		</Button>
	);
}
