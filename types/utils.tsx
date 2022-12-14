export function shortenAddress(string: string) {
	if (string === undefined) return "unknown";
	return string.substring(0, 4) + "..." + string.substring(string.length - 4);
}
export function shortAddressForModal(string: string) {
	if (string === undefined) return "unknown";
	return string.substring(0, 23) + "..." + string.substring(string.length - 4);
}
