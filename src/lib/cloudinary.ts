/**
 * Inject Cloudinary delivery transforms so browsers download display-sized
 * WebP/AVIF instead of full-resolution PNG/JPEG originals.
 */
export function optimizeCloudinaryUrl(
  url: string,
  opts: { w?: number; h?: number; crop?: "limit" | "fill" | "fit" } = {}
): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const marker = "/upload/";
  const i = url.indexOf(marker);
  const after = url.slice(i + marker.length);
  // Drop any existing transform segment before the version (v…) or path root.
  const rest = after.replace(/^(?:[^/]+\/)?(?=v\d+|Assets)/, "");

  const parts = ["f_auto", "q_auto"];
  if (opts.w) parts.push(`w_${opts.w}`);
  if (opts.h) parts.push(`h_${opts.h}`);
  if (opts.w || opts.h) parts.push(`c_${opts.crop ?? "limit"}`);

  // Strip cache-buster query so transforms stay clean; callers can re-append.
  const clean = rest.split("?")[0];
  return `${url.slice(0, i + marker.length)}${parts.join(",")}/${clean}`;
}
