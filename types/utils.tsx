export function shortenAddress(string: string) {
    if (string === undefined) return "unknown";
    return string.substring(0, 4) + "..." + string.substring(string.length - 4);
  }