document.addEventListener('DOMContentLoaded', function () {

    // --- Header Logic ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        header.classList.toggle('bg-white/90', isScrolled);
        header.classList.toggle('shadow-lg', isScrolled);
        header.classList.toggle('backdrop-blur-sm', isScrolled);
        header.classList.toggle('bg-transparent', !isScrolled);

        const headerLinks = header.querySelectorAll('a, button');
        headerLinks.forEach(link => {
            link.classList.toggle('text-white', !isScrolled);
            link.classList.toggle('text-gray-200', !isScrolled);
            link.classList.toggle('hover:text-white', !isScrolled);
            link.classList.toggle('text-gray-800', isScrolled);
            link.classList.toggle('hover:text-[#F28C28]', isScrolled);
        });
    });
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section-title, .animated-item, .border-draw-card').forEach(el => {
        observer.observe(el);
    });

    // --- Data for Dynamic Sections ---
    const services = [ "Demolition", "Excavation & Grading", "Site Development & Utilities", "Road & Runway Construction", "Commercial Metal Buildings", "Paving & Concrete" ];
    const features = [
        { title: "Owner-Managed Service", description: "Mark Donahue meets personally with each client, delivering detailed proposals and direct communication.", icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>` },
        { title: "Local Market Expertise", description: "With deep roots in Albuquerque since 2009, we understand the unique challenges of the Southwest.", icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5-7.5-7.5 7.5-7.5z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 12h17.25" /></svg>` },
        { title: "Veterans-Led Operations", description: "Our team brings discipline, integrity, and a commitment to excellence to every job site.", icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5v12m3-12v12" /></svg>` },
    ];
    const projects = [
        { title: "Subdivision Infrastructure", image: "https://placehold.co/800x600/F28C28/FFFFFF?text=Subdivision" },
        { title: "Commercial Lot Preparation", image: "https://placehold.co/800x600/222222/FFFFFF?text=Lot+Prep" },
        { title: "Roadway & Paving", image: "https://placehold.co/800x600/F4F4F4/222222?text=Roadway" }
    ];

    // --- Populate Grids ---
    const servicesGrid = document.getElementById('services-grid');
    services.forEach((service, index) => {
        const item = document.createElement('div');
        item.className = 'flex items-center space-x-3 bg-gray-100 p-4 rounded-lg border border-gray-200 animated-item';
        item.style.transitionDelay = `${0.1 + index * 0.05}s`;
        item.innerHTML = `
            <div class="w-3 h-3 bg-[#F28C28] rounded-full flex-shrink-0"></div>
            <span class="text-gray-800 font-medium">${service}</span>
        `;
        servicesGrid.appendChild(item);
        observer.observe(item);
    });

    const whyUsGrid = document.getElementById('why-us-grid');
    features.forEach((feature, index) => {
        const card = document.createElement('div');
        card.className = 'border-draw-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="flex items-center justify-center w-16 h-16 mb-6 bg-[#F28C28] rounded-full text-white mx-auto">${feature.icon}</div>
            <h3 class="text-xl font-bold text-white mb-3 font-poppins">${feature.title}</h3>
            <p class="text-gray-400">${feature.description}</p>
        `;
        whyUsGrid.appendChild(card);
        observer.observe(card);
    });

    const projectsGrid = document.getElementById('projects-grid');
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'group relative h-96 rounded-lg overflow-hidden shadow-lg animated-item';
        card.style.transitionDelay = `${0.1 + index * 0.15}s`;
        card.innerHTML = `
            <div class="overflow-hidden h-full">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
                <h3 class="text-white text-xl font-bold font-poppins">${project.title}</h3>
            </div>
        `;
        projectsGrid.appendChild(card);
        observer.observe(card);
    });
});
