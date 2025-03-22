import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_URL } from "@/constants";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: APP_NAME,
	description:
		"Generate SMTP credentials and connection details for AWS SES securely in your browser",
	keywords: ["AWS", "SMTP", "SES", "credentials", "generator"],
	authors: [{ name: APP_NAME, url: APP_URL }],
	icons: {
		icon: "/icon.png",
	},
	openGraph: {
		title: APP_NAME,
		description:
			"Generate SMTP credentials and connection details for AWS SES securely in your browser",
		type: "website",
		locale: "en_US",
		url: APP_URL,
	},
};

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
