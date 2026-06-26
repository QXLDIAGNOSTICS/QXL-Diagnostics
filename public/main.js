// Mobile Menu Toggle
        function toggleMenu() {
            const navLinks = document.getElementById('nav-links');
            if (navLinks) navLinks.classList.toggle('active');
        }

        // Close mobile menu when clicking a link
        // Use event delegation for React route changes
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-links a')) {
                if (window.innerWidth <= 768) {
                    const navLinks = document.getElementById('nav-links');
                    if (navLinks) navLinks.classList.remove('active');
                }
            }
        });



        // Back to Top Button Visibility
        window.addEventListener('scroll', () => {
            const backToTopButton = document.getElementById('backToTop');
            if (!backToTopButton) return;
            if (window.scrollY > 400) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }



        