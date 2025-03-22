export const SMTP_REGIONS: Record<string, string> = {
	"us-east-2": "US East (Ohio)",
	"us-east-1": "US East (N. Virginia)",
	"us-west-2": "US West (Oregon)",
	"ap-south-1": "Asia Pacific (Mumbai)",
	"ap-northeast-2": "Asia Pacific (Seoul)",
	"ap-southeast-1": "Asia Pacific (Singapore)",
	"ap-southeast-2": "Asia Pacific (Sydney)",
	"ap-northeast-1": "Asia Pacific (Tokyo)",
	"ca-central-1": "Canada (Central)",
	"eu-central-1": "Europe (Frankfurt)",
	"eu-west-1": "Europe (Ireland)",
	"eu-west-2": "Europe (London)",
	"eu-south-1": "Europe (Milan)",
	"eu-north-1": "Europe (Stockholm)",
	"sa-east-1": "South America (Sao Paulo)",
	"us-gov-west-1": "AWS GovCloud (US West)",
	"us-gov-east-1": "AWS GovCloud (US East)",
};

export const AWS_CONSTANTS = {
	DATE: "11111111",
	SERVICE: "ses",
	MESSAGE: "SendRawEmail",
	TERMINAL: "aws4_request",
	VERSION: 0x04,
} as const;

export const GITHUB_URL =
	"https://github.com/michidk/AWS-SMTP-Credentials-Generator";

export const APP_NAME = "AWS SMTP Credentials Generator";
export const APP_URL = "https://aws-smtp-credentials-generator.vercel.app";
