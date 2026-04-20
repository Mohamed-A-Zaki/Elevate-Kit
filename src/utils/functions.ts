export function encode(data: any) {
  const jsonString = JSON.stringify(data);
  const base64 = btoa(unescape(encodeURIComponent(jsonString)));
  return base64;
}

export function decode(base64: string) {
  const jsonString = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(jsonString);
}
