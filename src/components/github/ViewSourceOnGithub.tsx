import { GITHUB_URL } from "@/constants";
import { Github } from "lucide-react";

export function ViewSourceOnGithub() {
	return (
		<div className="text-center text-sm text-gray-500 mt-4">
			<a
				href={GITHUB_URL}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center gap-2 hover:text-gray-700 transition-colors"
			>
				<Github className="h-4 w-4" />
				<span>View source code on GitHub</span>
			</a>
		</div>
	);
}
