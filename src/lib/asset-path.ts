// Next's basePath applies to Link, but public image URLs need it explicitly.
export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
