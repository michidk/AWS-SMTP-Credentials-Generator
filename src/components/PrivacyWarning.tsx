import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Shield, X } from "lucide-react";
import { useState } from "react";

export function PrivacyWarning() {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<Alert
			variant="default"
			className="bg-amber-50 text-amber-800 border-amber-200 relative"
		>
			<Shield className="h-4 w-4" />
			<AlertDescription>
				Your credentials are processed locally in your browser and are never
				sent to any server.
			</AlertDescription>
			<Button
				variant="ghost"
				size="icon"
				className="absolute top-1 right-1 h-6 w-6 text-amber-800 hover:text-amber-900 hover:bg-amber-100"
				onClick={() => setIsVisible(false)}
			>
				<X className="h-4 w-4" />
				<span className="sr-only">Dismiss</span>
			</Button>
		</Alert>
	);
}
