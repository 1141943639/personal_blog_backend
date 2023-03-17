export default function jsonParse(
  str: string,
  throwError: boolean
): string | void {
  try {
    return JSON.parse(str);
  } catch (err) {
    if (throwError) {
      throw err;
    }
  }
}
