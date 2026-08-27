/**
 * ChatGPT Referral Traffic & Conversion Analytics Engine
 * Tracks ChatGPT referrals (utm_source=chatgpt.com, referrer: chatgpt.com / chat.openai.com)
 * GA4 Measurement & Reporting Events:
 * 1. Landing Page View (chatgpt_session_start)
 * 2. Test Views (chatgpt_test_view)
 * 3. Booking Start (chatgpt_booking_start)
 * 4. Completed Booking (chatgpt_booking_completed)
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function isChatGPTReferral(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = (params.get('utm_source') || '').toLowerCase();
    const referrer = (document.referrer || '').toLowerCase();

    const isUtmChatGPT = utmSource.includes('chatgpt') || utmSource.includes('openai');
    const isReferrerChatGPT =
      referrer.includes('chatgpt.com') ||
      referrer.includes('chat.openai.com') ||
      referrer.includes('openai.com') ||
      referrer.includes('oaistatic.com');

    const sessionFlag = sessionStorage.getItem('qxl_chatgpt_referral');

    return isUtmChatGPT || isReferrerChatGPT || sessionFlag === 'true';
  } catch {
    return false;
  }
}

export function initChatGPTTracking(): void {
  if (typeof window === 'undefined') return;

  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = (params.get('utm_source') || '').toLowerCase();
    const referrer = (document.referrer || '').toLowerCase();

    const isChatGPT =
      utmSource.includes('chatgpt') ||
      utmSource.includes('openai') ||
      referrer.includes('chatgpt.com') ||
      referrer.includes('chat.openai.com') ||
      referrer.includes('openai.com') ||
      referrer.includes('oaistatic.com');

    if (isChatGPT) {
      sessionStorage.setItem('qxl_chatgpt_referral', 'true');
      if (!sessionStorage.getItem('qxl_chatgpt_landing_page')) {
        sessionStorage.setItem('qxl_chatgpt_landing_page', window.location.pathname + window.location.search);
      }

      const landingPage = sessionStorage.getItem('qxl_chatgpt_landing_page') || window.location.pathname;

      if (typeof window.gtag === 'function') {
        window.gtag('set', 'user_properties', {
          traffic_source_type: 'chatgpt_referral',
          chatgpt_landing_page: landingPage,
        });

        window.gtag('event', 'chatgpt_session_start', {
          event_category: 'ChatGPT Traffic',
          landing_page: landingPage,
          utm_source: params.get('utm_source') || 'chatgpt.com',
          utm_medium: params.get('utm_medium') || 'referral',
          utm_campaign: params.get('utm_campaign') || 'chatgpt_recommendation',
        });
      }
    }
  } catch (err) {
    console.warn('ChatGPT analytics init error', err);
  }
}

export function trackChatGPTTestView(testName: string, testSlug: string, price?: number): void {
  if (!isChatGPTReferral()) return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'chatgpt_test_view', {
        event_category: 'ChatGPT Funnel',
        event_label: testName,
        test_name: testName,
        test_slug: testSlug,
        test_price: price || 0,
        landing_page: sessionStorage.getItem('qxl_chatgpt_landing_page') || window.location.pathname,
      });
    }
  } catch {}
}

export function trackChatGPTBookingStart(selectedTests: string[], totalPrice: number): void {
  if (!isChatGPTReferral()) return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'chatgpt_booking_start', {
        event_category: 'ChatGPT Funnel',
        event_label: selectedTests.join(', '),
        test_count: selectedTests.length,
        total_price: totalPrice,
        landing_page: sessionStorage.getItem('qxl_chatgpt_landing_page') || window.location.pathname,
      });
    }
  } catch {}
}

export function trackChatGPTBookingCompleted(bookingId: string, amount: number, selectedTests: string[]): void {
  if (!isChatGPTReferral()) return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'chatgpt_booking_completed', {
        event_category: 'ChatGPT Funnel',
        event_label: bookingId,
        transaction_id: bookingId,
        value: amount,
        currency: 'INR',
        items_booked: selectedTests.join(', '),
        landing_page: sessionStorage.getItem('qxl_chatgpt_landing_page') || window.location.pathname,
      });
    }
  } catch {}
}
