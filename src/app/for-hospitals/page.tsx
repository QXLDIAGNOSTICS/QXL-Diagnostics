
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
` }} />
  );
}
