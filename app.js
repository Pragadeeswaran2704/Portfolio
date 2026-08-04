document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // Theme Toggle Handler
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('theme-dark')) {
                body.classList.remove('theme-dark');
                body.classList.add('theme-light');
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            } else {
                body.classList.remove('theme-light');
                body.classList.add('theme-dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        });
    }

    // --------------------------------------------------------------------------
    // Navbar Scroll Effect
    // --------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --------------------------------------------------------------------------
    // Mobile Drawer Toggle
    // --------------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        });
    }

    // --------------------------------------------------------------------------
    // Skills Filter Bar
    // --------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // Stat Counter Animation
    // --------------------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const targetText = stat.getAttribute('data-target');
            const hasPercent = targetText.includes('%');
            const hasPlus = targetText.includes('+');
            const target = parseFloat(targetText);

            if (isNaN(target)) return;

            let count = 0;
            const step = target / 40;

            const updateCount = () => {
                count += step;
                if (count < target) {
                    stat.innerText = count.toFixed(1 > 0 && target % 1 !== 0 ? 1 : 0) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = targetText;
                }
            };
            updateCount();
        });
    };

    // Trigger animation when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('hero');
    if (heroSection) observer.observe(heroSection);

    // --------------------------------------------------------------------------
    // Resume Modal Controls
    // --------------------------------------------------------------------------
    const btnResumeModal = document.getElementById('btn-resume-modal');
    const resumeModal = document.getElementById('resume-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');

    const openResumeModal = () => {
        if (resumeModal) resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeResumeModal = () => {
        if (resumeModal) resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (btnResumeModal) btnResumeModal.addEventListener('click', openResumeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeResumeModal);
    if (modalClose) modalClose.addEventListener('click', closeResumeModal);

    // --------------------------------------------------------------------------
    // Project Detail Modal Controls & Data Injection
    // --------------------------------------------------------------------------
    const projectModal = document.getElementById('project-modal');
    const pModalBackdrop = document.getElementById('p-modal-backdrop');
    const pModalClose = document.getElementById('p-modal-close');
    const projectModalBody = document.getElementById('project-modal-body');
    const projectDetailBtns = document.querySelectorAll('.btn-project-detail');

    const projectData = {
        '4': {
            title: 'Retail Sales & Business Intelligence Dashboard',
            badge: 'Power BI & Analytics',
            tech: ['Microsoft Power BI', 'DAX', 'Power Query ETL', 'Star-Schema Data Modeling', 'Claude & ChatGPT Prompt Eng'],
            description: `
                <p class="mb-lg">Developed an end-to-end Business Intelligence dashboard using Microsoft Power BI to monitor retail performance, customer purchasing trends, and profitability metrics.</p>
                <h4 style="margin-bottom: 0.5rem; color: var(--accent-cyan);">Core Capabilities & Architectural Highlights:</h4>
                <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-muted);">
                    <li><strong>ETL & Data Transformation:</strong> Engineered Power Query data cleaning pipelines to transform raw Excel sales records into star-schema analytical models.</li>
                    <li><strong>DAX Analytics Engine:</strong> Created dynamic DAX measures for profit/loss, time-intelligence comparisons, and sales KPIs.</li>
                    <li><strong>Interactive Perspectives:</strong> Built multi-view dashboards analyzing customer behavior, product category trends, and regional sales distribution.</li>
                    <li><strong>AI-Assisted Optimization:</strong> Leveraged prompt engineering with Claude and ChatGPT to optimize DAX calculations and enhance visualization design.</li>
                </ul>
            `
        },
        '5': {
            title: 'Small-Lender Loan Book Portfolio Analytics, AML & KYC Risk Dashboard',
            badge: 'Financial Risk Analytics',
            tech: ['React.js', 'Recharts', 'Anti-Money Laundering (AML)', 'KYC Risk Scoring', 'JavaScript (ES6)'],
            description: `
                <p class="mb-lg">Designed a financial risk analytics dashboard simulating a lending institution's portfolio to evaluate loan health, detect financial crime, and automate KYC due diligence.</p>
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                    <a href="https://lending-risk-analytics.vercel.app" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live App</a>
                    <a href="https://github.com/Pragadeeswaran2704/lending-risk-analytics" target="_blank" class="btn btn-secondary btn-sm"><i class="fa-brands fa-github"></i> GitHub Repository</a>
                </div>
                <h4 style="margin-bottom: 0.5rem; color: var(--accent-cyan);">Key System Modules:</h4>
                <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-muted);">
                    <li><strong>Portfolio Performance Monitoring:</strong> Real-time tracking of outstanding balances, collection rates, and Non-Performing Loan (NPL) distributions using Recharts.</li>
                    <li><strong>Rule-Based AML Detection:</strong> Automated identification of suspicious structuring/smurfing patterns, third-party repayments, and rapid loan cycling into an alert queue.</li>
                    <li><strong>Weighted KYC Risk Scoring:</strong> Multi-factor risk algorithm categorizing borrowers into Low, Medium, and High-risk tiers for Enhanced Due Diligence (EDD).</li>
                    <li><strong>AI-Accelerated Development:</strong> Utilized AI prompt engineering to generate analytical logic and optimize React component rendering.</li>
                </ul>
            `
        },
        '1': {
            title: 'Smart Geo-Hazard Precaution System using IoT, AI & LoRaWAN',
            badge: 'B.E. Final Year Capstone Project',
            tech: ['Raspberry Pi 4', 'Random Forest ML (92.86%)', 'LoRa SX1278 (433MHz)', 'Python / Scikit-learn', 'Twilio API & SMTP', 'MPU6050 & MCP3008 ADC'],
            description: `
                <p class="mb-lg">Designed and built an autonomous, solar-powered landslide early warning system leveraging Raspberry Pi 4, Random Forest machine learning algorithms, and LoRaWAN wireless telemetry for off-grid disaster monitoring in hilly regions of Tamil Nadu (Ooty, Kodaikanal, Nilgiris).</p>
                <h4 style="margin-bottom: 0.5rem; color: var(--accent-cyan);">Core Technical Architecture & System Features:</h4>
                <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-muted);">
                    <li><strong>Multi-Sensor Data Acquisition:</strong> Integrated MPU6050 3-axis MEMS accelerometer (I2C) for ground tilt/vibration, DHT22 for humidity/temp, and analog soil moisture/rain sensors interfaced via an MCP3008 8-channel ADC (SPI).</li>
                    <li><strong>Random Forest AI Classifier (92.86% Accuracy):</strong> Trained a Scikit-learn Random Forest model (250 estimators, max depth 10) on IMD weather & soil telemetry datasets, achieving a 92.86% predictive accuracy with feature importance ranking.</li>
                    <li><strong>Hybrid Decision Engine:</strong> Combined ML classification with hardcoded IMD threshold backups (>50mm/hr rain, >750 ADC soil moisture, >1.5g acceleration, >90% humidity).</li>
                    <li><strong>Tri-Mode Emergency Alert System:</strong> Triggers 5V local siren buzzer, dispatches real-time SMS alerts via Twilio REST API, and sends structured email reports via SMTP protocol.</li>
                    <li><strong>Long-Range Off-Grid LoRa Telemetry:</strong> Programmed LoRa SX1278 transceiver (433 MHz) using pySX127x to broadcast JSON alert packets over long distances without cellular/internet access.</li>
                    <li><strong>Autonomous Solar Power:</strong> Configured a 12V 20W Solar Panel, Solar Charge Controller, 12V 7Ah SLA Battery, and LM2596 Buck Converter for 24x7 continuous off-grid operation.</li>
                </ul>
            `
        },
        '2': {
            title: 'IoT-Based Vehicle Accident Detection System',
            badge: 'Naan Mudhalvan Scheme Project',
            tech: ['Microcontroller', 'Accelerometer Sensor', 'GPS Module', 'GSM Dispatch', 'Naan Mudhalvan Framework'],
            description: `
                <p class="mb-lg">Developed under the prestigious <strong>Naan Mudhalvan Scheme</strong>, this system focuses on reducing emergency response latency during vehicular crashes on highways.</p>
                <h4 style="margin-bottom: 0.5rem; color: var(--accent-cyan);">Key Features & Capabilities:</h4>
                <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-muted);">
                    <li><strong>Accident Detection:</strong> High-g force and tilt sensors monitor vehicle orientation and sudden impact vectors.</li>
                    <li><strong>Geolocated Telemetry:</strong> Integrated GPS module captures exact latitude and longitude coordinates upon collision.</li>
                    <li><strong>Emergency Dispatch:</strong> Automated GSM transmitter dispatches emergency distress SMS directly to nearest hospitals, ambulances, and police stations.</li>
                    <li><strong>False Alarm Prevention:</strong> Manual cancel switch allows vehicle occupants to override accidental triggers within a 15-second window.</li>
                </ul>
            `
        },
        '3': {
            title: 'Forensic Science & Data Analytics Simulation',
            badge: 'Deloitte Job Simulation',
            tech: ['Data Analytics', 'Forensic Audit', 'Data Visualization', 'Deloitte Practical Framework', 'SQL'],
            description: `
                <p class="mb-lg">Completed comprehensive forensic data analytics tasks under Deloitte's virtual job simulation program, analyzing corporate datasets for pattern anomalies and integrity compliance.</p>
                <h4 style="margin-bottom: 0.5rem; color: var(--accent-cyan);">Scope & Deliverables:</h4>
                <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-muted);">
                    <li><strong>Forensic Data Scrubbing:</strong> Cleaned and structured large unorganized transaction logs to trace irregular activity patterns.</li>
                    <li><strong>Audit Analytics:</strong> Executed SQL queries to isolate transaction variances, duplicate entries, and timestamp discrepancies.</li>
                    <li><strong>Executive Reporting:</strong> Created interactive data visualization dashboards presenting forensic investigation findings for stakeholders.</li>
                </ul>
            `
        }
    };

    const openProjectModal = (projectId) => {
        const data = projectData[projectId];
        if (!data || !projectModalBody) return;

        projectModalBody.innerHTML = `
            <span class="badge badge-primary" style="margin-bottom: 1rem;">${data.badge}</span>
            <h2 style="font-size: 1.6rem; margin-bottom: 1rem;">${data.title}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                ${data.tech.map(t => `<span class="tag"><i class="fa-solid fa-code"></i> ${t}</span>`).join('')}
            </div>
            ${data.description}
            <button class="btn btn-primary" onclick="document.getElementById('project-modal').classList.remove('active'); document.body.style.overflow='';">
                <i class="fa-solid fa-check"></i> Close Overview
            </button>
        `;

        if (projectModal) projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
        if (projectModal) projectModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    projectDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pId = btn.getAttribute('data-project');
            openProjectModal(pId);
        });
    });

    if (pModalBackdrop) pModalBackdrop.addEventListener('click', closeProjectModal);
    if (pModalClose) pModalClose.addEventListener('click', closeProjectModal);
});
