"""Wraps a plain-text email subject/body into a branded HTML page.

Every outbound email in the app is written as plain text (see
``notification_templates.py`` — kept plain because the same copy also has to
satisfy DLT-approved SMS wording). This module turns that same text into a
proper HTML email automatically, so ``notification_service.send_email``
always sends a real, styled HTML page (with a plain-text fallback part for
clients that prefer it) instead of a raw text blob — no per-template-call-site
changes needed.
"""
from __future__ import annotations

from html import escape

_BRAND = "QXL Diagnostics"
_BRAND_COLOR = "#0b1424"
_ACCENT = "#2563eb"
_TAGLINE = "Accurate diagnostics. Trusted care."
_ADDRESS_LINE = "QXL Diagnostics · NABL-accredited pathology lab & health checkup centre"
_WEBSITE = "https://qxldiagnostics.com"
_SUPPORT_PHONE = "+91 90370 90838"


def render_html_email(
    subject: str,
    body: str,
    *,
    cta_label: str | None = None,
    cta_url: str | None = None,
    unsubscribe_url: str | None = None,
) -> str:
    """Builds a self-contained (inline-styled) HTML email from plain text.

    Blank lines in ``body`` become paragraph breaks. Optionally renders a
    single call-to-action button (e.g. "View my booking"). Pass
    ``unsubscribe_url`` for automated/marketing-style emails (reminders,
    offers) to add a footer opt-out link — never set for one-off
    transactional emails (booking received, payment success/failure, etc.).
    """
    paragraphs = [line.strip() for line in body.split("\n") if line.strip()]
    body_html = "".join(
        f'<p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#1f2937;">{escape(p)}</p>'
        for p in paragraphs
    )

    cta_html = ""
    if cta_label and cta_url:
        cta_html = f"""
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0 4px 0;">
          <tr>
            <td style="border-radius:999px;background:{_ACCENT};">
              <a href="{escape(cta_url)}"
                 style="display:inline-block;padding:12px 28px;font-size:13px;font-weight:700;
                        letter-spacing:.04em;text-transform:uppercase;color:#ffffff;text-decoration:none;
                        border-radius:999px;">
                {escape(cta_label)}
              </a>
            </td>
          </tr>
        </table>"""

    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{escape(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef1f6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f6;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:{_BRAND_COLOR};padding:26px 28px;">
                <p style="margin:0;font-size:17px;font-weight:800;letter-spacing:.02em;color:#ffffff;">{_BRAND}</p>
                <p style="margin:4px 0 0 0;font-size:12px;color:#93a4c3;">{_TAGLINE}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px 10px 28px;">
                <p style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#0f172a;">{escape(subject)}</p>
                {body_html}
                {cta_html}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 28px 28px;">
                <hr style="border:none;border-top:1px solid #e5e9f0;margin:0 0 16px 0;" />
                <p style="margin:0 0 4px 0;font-size:11px;color:#94a3b8;">{_ADDRESS_LINE}</p>
                <p style="margin:0;font-size:11px;color:#94a3b8;">
                  <a href="{_WEBSITE}" style="color:{_ACCENT};text-decoration:none;">{_WEBSITE.replace("https://", "")}</a>
                  &nbsp;·&nbsp; {_SUPPORT_PHONE}
                </p>
                {f'<p style="margin:10px 0 0 0;font-size:11px;color:#b0b9c9;">Don&#39;t want reminders/offers like this? <a href="{escape(unsubscribe_url)}" style="color:#94a3b8;text-decoration:underline;">Unsubscribe</a></p>' if unsubscribe_url else ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"""
