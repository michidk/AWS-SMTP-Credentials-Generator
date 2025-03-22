export async function sign(key: Uint8Array, msg: string): Promise<ArrayBuffer> {
	const encoder = new TextEncoder();
	const data = encoder.encode(msg);
	const keyBuffer = key.slice().buffer;

	const hmacKey = await crypto.subtle.importKey(
		"raw",
		keyBuffer,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);

	return crypto.subtle.sign("HMAC", hmacKey, data);
}
