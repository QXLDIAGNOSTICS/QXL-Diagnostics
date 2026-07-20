
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `

    <!-- Header / Navigation -->
    <header>
        <div class="container nav-container">
            <a href="#" class="logo">
                <img src="image/Logo (1).png" alt="QXL Diagnostics Logo" class="logo-img" onerror="this.src='QXL-Diagnostics-Lab-Logo-1.jpg'">
            </a>
            <button class="hamburger" aria-label="Toggle menu" onclick="toggleMenu()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <nav class="nav-links" id="nav-links">
                <a href="#">Home</a>
                <a href="#about">About Us</a>
                <a href="#team-preview">Founder & Consultants</a>
                <a href="#specialities">Our Specialities</a>
                <a href="/login" class="btn btn-outline" style="padding: 10px 24px; border-radius: 100px; font-weight: 700; margin-right: 15px;">Login</a>
                <a href="https://api.whatsapp.com/send?phone=919964639639&text=Hi%20QXL%20Diagnostics%2C%20I%20want%20to%20book%20a%20test" target="_blank" class="btn btn-primary" style="padding: 10px 24px; border-radius: 100px; font-weight: 700;">Book a Test</a>
            </nav>
        </div>
    </header>
    <main style="min-height: 60vh; padding: 100px 20px; text-align: center; background-color: #f8fafc;">
        <div class="container">
            <h1 style="font-size: 42px; color: #1A365D; margin-bottom: 20px;">For Hospitals</h1>
            <p style="font-size: 18px; color: #4a5568;">Content for For Hospitals will be restored shortly.</p>
        </div>
    </main>
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <img src="image/Logo (1).png" alt="QXL Diagnostics Logo" class="footer-logo-img" onerror="this.src='QXL-Diagnostics-Lab-Logo-1.jpg'">
                    <p>QXL Diagnostics super speciality lab bangalore is committed to accurate, NABL-standard diagnostic testing and home visit blood test bangalore across Bengaluru.</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#specialities">Specialities</a></li>
                        <li><a href="#packages">Checkup Packages</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Popular Specialities</h4>
                    <ul class="footer-links">
                        <li><a href="#specialities">Gastroenterology</a></li>
                        <li><a href="#specialities">Hematology</a></li>
                        <li><a href="#specialities">Infectious Diseases</a></li>
                        <li><a href="#specialities">Neurology</a></li>
                        <li><a href="#specialities">Oncology</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact Us</h4>
                    <ul class="footer-links">
                        <li>3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru</li>
                        <li><a href="tel:+919964639639">+91 99646 39639</a></li>
                        <li><a href="mailto:qxldiagnostics@gmail.com">qxldiagnostics@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                © 2026 QXL Diagnostics. All rights reserved. | NABL Certified Diagnostic Lab Bengaluru
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp Button -->
    <a href="https://api.whatsapp.com/send?phone=919964639639&text=Hi%20QXL%20Diagnostics%2C%20I%20want%20to%20book%20a%20test" target="_blank" class="fab-whatsapp" aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
     </a>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="backToTop" aria-label="Back to top" onclick="scrollToTop()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
    </button>

    
` }} />
  );
}
