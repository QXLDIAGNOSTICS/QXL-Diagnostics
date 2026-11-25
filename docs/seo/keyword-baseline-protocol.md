# QXL 100-keyword ranking baseline — measurement protocol (baseline 20 Nov 2026)

Data: `keyword-baseline-100.csv` (10 clusters × 10 fixed non-branded queries; do not change after launch).

| Item | Rule |
|---|---|
| Property | qxldiagnostics.com (sc-domain or canonical URL-prefix property) |
| GSC search type | Web, country India (`ind`), device mobile; exact-query rows, rolling 28 complete days |
| Bengaluru SERP | Bengaluru, Karnataka, India; mobile; English; Google organic; no personalisation |
| KPI #1 / top 3 / top 10 | Count Bengaluru mobile SERP ranks = 1, ≤3, ≤10 among the 100 fixed queries |
| Coverage | Keywords with a populated city SERP rank; blank = unchecked |
| 0 input rank | Not observed in returned results — NOT proof of rank > 40 |
| GSC caveat | GSC average position is impression-weighted, not a live city rank |
| Missing keywords | Absent rows can mean no impressions or API row limits; do not classify as rank > 10 |

Status at baseline: Google Search Console not connected; no paid rank run; no numerical rankings claimed.
References: GSC Search Analytics API — https://developers.google.com/webmaster-tools/v1/searchanalytics/query ·
Average position — https://support.google.com/webmasters/answer/7042828
