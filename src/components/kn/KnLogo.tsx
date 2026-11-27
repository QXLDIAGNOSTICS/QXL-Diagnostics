/**
 * Kannada wordmark: "ಕ್ಯೂಎಕ್ಸ್‌ಎಲ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್ / ಸೂಪರ್ ಸ್ಪೆಷಾಲಿಟಿ ಲ್ಯಾಬ್" with the QXL dot arc.
 * Vector redraw of the supplied Kannada logo. To use the original artwork instead,
 * place it at /public/brand/qxl-logo-kannada.png and set USE_RASTER below to true.
 */
const USE_RASTER = false;

const DOTS: [number, number, number, string][] = [
  [278, 201, 9, "#f6f0a6"],
  [246, 175, 12, "#f8e67c"],
  [196, 166, 14, "#f9b95a"],
  [143, 182, 15, "#f4a28b"],
  [109, 219, 16, "#e9716f"],
  [95, 270, 16, "#ec7db5"],
  [106, 323, 19, "#a97bb9"],
  [142, 366, 21, "#6577bd"],
  [202, 387, 23, "#57a4dc"],
  [266, 371, 23, "#45c5eb"],
];

export default function KnLogo({ className = "", height = 48 }: { className?: string; height?: number }) {
  if (USE_RASTER) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/brand/qxl-logo-kannada.png" alt="ಕ್ಯೂಎಕ್ಸ್‌ಎಲ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್ — ಸೂಪರ್ ಸ್ಪೆಷಾಲಿಟಿ ಲ್ಯಾಬ್" style={{ height, width: "auto" }} className={className} />;
  }
  return (
    <svg
      viewBox="70 140 1000 275"
      height={height}
      role="img"
      aria-label="ಕ್ಯೂಎಕ್ಸ್‌ಎಲ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್ — ಸೂಪರ್ ಸ್ಪೆಷಾಲಿಟಿ ಲ್ಯಾಬ್"
      className={className}
      style={{ width: "auto", fontFamily: "'Noto Sans Kannada', sans-serif" }}
    >
      {DOTS.map(([cx, cy, r, fill]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
      <text x="160" y="300" fontSize="74" fontWeight="800" fill="#24346c">
        ಕ್ಯೂಎಕ್ಸ್‌ಎಲ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್
      </text>
      <text x="1040" y="392" fontSize="46" fontWeight="700" fill="#6b6b6b" textAnchor="end">
        ಸೂಪರ್ ಸ್ಪೆಷಾಲಿಟಿ ಲ್ಯಾಬ್
      </text>
    </svg>
  );
}
