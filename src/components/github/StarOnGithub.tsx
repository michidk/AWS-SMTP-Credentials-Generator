import { GITHUB_URL } from "@/constants";
import { Github, Star } from "lucide-react";

export function StarOnGithub() {
	return (
		<a
			href={GITHUB_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors shadow-md"
		>
			<Star className="h-4 w-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-[20deg] group-hover:text-yellow-300" />
			<span>Star me on GitHub</span>
			<Github className="h-4 w-4 ml-1" />
		</a>
	);
}
