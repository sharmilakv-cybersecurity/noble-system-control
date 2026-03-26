/* ============================================
   NOBLE SYSTEM CONTROL — SCRIPT.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LUCIDE ICONS ---------- */
  lucide.createIcons();

  /* ---------- STICKY NAVBAR ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('open');
    
    // Reset focused state if closing
    if (!mainNav.classList.contains('open')) {
      mainNav.classList.remove('navbar__nav--focused-services');
      dropdownParent.classList.remove('open');
    }
    
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close nav when a link is clicked (mobile)
  mainNav.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- CAREERS CARDS EXPANSION LOGIC ---------- */
  const careerCards = document.querySelectorAll('.career-card');
  careerCards.forEach(card => {
    const btn = card.querySelector('.career-expand-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Close other cards first
        careerCards.forEach(c => {
          if (c !== card) c.classList.remove('expanded');
        });

        // Toggle current card
        card.classList.toggle('expanded');
      });
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    careerCards.forEach(card => {
      if (card.classList.contains('expanded') && !card.contains(e.target)) {
        card.classList.remove('expanded');
      }
    });
  });

  // Re-initialize Lucide icons for the newly added buttons
  lucide.createIcons();

  /* ---------- DROPDOWN TOGGLE (CLICK-BASED) ---------- */
  const dropdownParent = document.querySelector('.navbar__dropdown');
  const dropdownToggle = dropdownParent.querySelector('.dropdown-toggle');

  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpening = !dropdownParent.classList.contains('open');
    dropdownParent.classList.toggle('open');

    // Focused view for mobile
    if (window.innerWidth <= 768) {
      mainNav.classList.toggle('navbar__nav--focused-services', isOpening);
    }
  });

  // Close dropdown when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!dropdownParent.contains(e.target)) {
      dropdownParent.classList.remove('open');
      mainNav.classList.remove('navbar__nav--focused-services');
    }
  });

  const dropdownLinks = dropdownParent.querySelectorAll('.dropdown-menu a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdownParent.classList.remove('open');
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation slightly
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ---------- COUNTER ANIMATION ---------- */
  const counters = document.querySelectorAll('.stat-item__number[data-target]');
  let countersDone = false;

  const animateCounters = () => {
    if (countersDone) return;
    countersDone = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      };
      requestAnimationFrame(tick);
    });
  };

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }



  /* ---------- HERO IMAGE SLIDESHOW ---------- */
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('hero__slide--active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('hero__slide--active');
    }, 5000);
  }

  /* ---------- SMOOTH ANCHOR SCROLLING (FALLBACK) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ---------- SERVICE MODAL DATA & LOGIC ---------- */
  const serviceDetails = {
    'building-management-system': `
      <p>A Building Management System (BMS) is a computer-based control system installed in buildings that controls and monitors the building's mechanical and electrical equipment such as ventilation, lighting, power systems, fire systems, and security systems.</p>
      <p>Our BMS solutions ensure centralized monitoring and control, leading to optimal building performance, reduced energy consumption, and enhanced operational efficiency. By integrating disparate systems into a unified platform, operators gain real-time visibility and actionable insights.</p>
    `,
    'cctv-surveillance': `
      <p>High-definition IP camera systems with intelligent analytics, remote access, and 24/7 recording capabilities. CCTV is the backbone of modern security operations for both deterrence and post-incident investigation.</p>
      <p>We deploy robust, scalable camera networks equipped with AI-driven analytics like facial recognition, object detection, and motion tracking. This proactive approach to surveillance helps organizations maintain safety across large complexes seamlessly.</p>
    `,
    'access-control': `
      <p>Biometric, RFID, and smart card-based entry systems designed to control and restrict access to physical facilities. From individual single-door control to enterprise-wide infrastructure management.</p>
      <p>Our robust Access Control systems offer comprehensive audit trails, integration with surveillance, and flexible authorization levels, ensuring that only authorized personnel have access to restricted spaces while maintaining a frictionless experience across the building.</p>
    `,
    'fire-alarm-system': `
      <p>Addressable and conventional fire detection with automatic suppression integration and emergency notification. Early detection is critical for life safety and property protection.</p>
      <p>Our sophisticated Fire Alarm systems include smoke, heat, and flame detectors networked to central command centers. They provide precise location data of incidents, trigger automated evacuation protocols, and alert local emergency services instantly.</p>
    `,
    'intrusion-detection': `
      <p>Perimeter protection with advanced motion sensors, glass-break detectors, beam monitoring, and integrated alarm monitoring. It guards against unauthorized physical entry.</p>
      <p>Designed to integrate deeply with your facility's surveillance, our intrusion systems trigger automated lockdown procedures, flash warning alerts, and notify security personnel immediately, ensuring absolute perimeter security 24/7.</p>
    `,
    'public-address-system': `
      <p>Integrated PA and voice evacuation systems designed for routine announcements, background music, and critical emergency communication.</p>
      <p>Featuring multi-zone paging and clear, intelligible audio transmission, these systems integrate with fire and life safety networks to broadcast automated, pre-recorded evacuation instructions during critical incidents across the entire facility.</p>
    `,
    'customized-solutions': `
      <p>Tailored automation and security packages designed to fit your unique infrastructure requirements, operational flow, and budget constraints.</p>
      <p>We understand that every facility is unique. Our team of expert engineers consults and designs bespoke system integrations—from hybrid surveillance setups to sector-specific compliance solutions, delivering exactly what your enterprise needs.</p>
    `,
    'gas-suppression-system': `
      <p>Gas suppression systems are waterless, automatic fire protection systems designed for sensitive environments like server rooms, data centers, and laboratories.</p>
      <p>They extinguish fires within seconds by releasing inert gases or clean agent chemicals that rapidly lower oxygen levels or absorb heat. Unlike water sprinklers, gas suppression leaves no residue, completely protecting expensive electronic equipment and allowing for rapid, safe recovery in high-value areas.</p>
    `,
    'water-leakage-system': `
      <p>Water leakage systems are safety mechanisms designed to detect, monitor, and often automatically shut off water flow to prevent catastrophic water damage in residential or commercial buildings.</p>
      <p>They utilize floor sensors, smart meters, or acoustic technology to identify anomalies ranging from minor drips to major pipe bursts. Upon detection, the integrated system immediately alerts personnel via BMS and mitigates damage by cutting off the main water supply.</p>
    `,
    'rodent-system': `
      <p>Ultrasonic rodent repellent systems emit high-frequency sound waves that create an extremely uncomfortable acoustic environment for rodents.</p>
      <p>This non-lethal, eco-friendly method effectively keeps pests away from critical IT infrastructure, server rooms, false ceilings, and electrical panels without the use of harmful chemicals or traps, preventing costly cable damage and short circuits.</p>
    `,
    'fire-hydrant-and-sprinkler-system': `
      <p>A fire hydrant system is an active, high-pressure water network comprising pipes, pumps, and valves designed for rapid fire suppression. It acts as a primary firefighting tool by providing instant access to municipal or private water reservoirs for firefighters via hoses.</p>
      <p>A sprinkler system enhances this by offering a passive, automatic response—a network of pipes containing pressurized water, equipped with heat-sensitive sprinklers that release localized water immediately when an escalating fire reaches critical temperatures.</p>
    `,
    'fire-extinguishers': `
      <p>Portable and specialized fire extinguishers designed for instant, manual response to various classes of fires by occupants before emergency services arrive.</p>
      <p>We supply, install, and continuously maintain powder, CO2, foam, and water-based extinguishers. Strategic placement and proper selection of extinguisher types ensure comprehensive safety compliance and immediate localized protection throughout your premises.</p>
    `,
    'auto-glow-and-led-signages': `
      <p>Photoluminescent and LED safety signages ensure clear visibility of emergency exits, evacuation routes, and critical life-saving equipment even in total darkness.</p>
      <p>Tested for long-lasting high luminance, these signs continue to glow during power outages or thick smoke, directing occupants safely out of the building and assisting emergency responders in locating critical assets like firefighting tools and alarms.</p>
    `
  };

  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('serviceModalTitle');
  const modalText = document.getElementById('serviceModalText');
  const modalClose = document.querySelector('.service-modal__close');
  const modalBackdrop = document.querySelector('.service-modal__backdrop');

  if (modal) {
    const openModal = (serviceId) => {
      const btn = document.querySelector(`a[data-service="${serviceId}"]`);
      if (btn) {
        const parentBody = btn.closest('.glass-card__body');
        const titleEl = parentBody.querySelector('.glass-card__title');
        modalTitle.textContent = titleEl ? titleEl.textContent : 'Service Details';

        const cardImg = btn.closest('.glass-card').querySelector('.glass-card__img');
        const modalImg = document.getElementById('serviceModalImg');
        if (modalImg && cardImg) {
          modalImg.src = cardImg.src;
          modalImg.alt = cardImg.alt;
          modalImg.style.display = 'block';
        } else if (modalImg) {
          modalImg.style.display = 'none';
        }
      }

      modalText.innerHTML = serviceDetails[serviceId] || '<p>Detailed information coming soon.</p>';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.learn-more-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceId = btn.getAttribute('data-service');
        openModal(serviceId);
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  }

  /* ---------- CAREERS MODAL LOGIC ---------- */
  const careersModal = document.getElementById('careersModal');
  const applyNowBtn = document.getElementById('applyNowBtn');
  const careersModalCloseBtn = document.getElementById('careersModalCloseBtn');
  const careersModalBackdrop = document.getElementById('careersModalBackdrop');

  if (careersModal && applyNowBtn) {
    const openCareersModal = () => {
      careersModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeCareersModal = () => {
      careersModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    applyNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCareersModal();
    });

    if (careersModalCloseBtn) careersModalCloseBtn.addEventListener('click', closeCareersModal);
    if (careersModalBackdrop) careersModalBackdrop.addEventListener('click', closeCareersModal);
  }

  /* ---------- CONTACT FORM GOOGLE SHEETS INTEGRATION ---------- */
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  // You MUST replace this URL with your deployed Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwKaYiAiScX_h5M7ZS9ZHOWguTZs6d-juer8LHU6uFmyBCXqUFWVgpNhCiXHycFsb0o/exec';

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      // Convert FormData to a plain object for JSON submission
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain' // Use text/plain to avoid CORS preflight while staying compatible with GAS JSON.parse
        }
      })
        .then(() => {
          formMessage.style.display = 'block';
          formMessage.style.backgroundColor = '#ecfdf5';
          formMessage.style.color = '#065f46';
          formMessage.style.border = '1px solid #10b981';
          formMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
          contactForm.reset();
        })
        .catch(error => {
          formMessage.style.display = 'block';
          formMessage.style.backgroundColor = '#fef2f2';
          formMessage.style.color = '#991b1b';
          formMessage.style.border = '1px solid #ef4444';
          formMessage.textContent = 'Submission error. Please check your internet connection or contact us directly.';
          console.error('Form Error:', error);
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 8000);
        });
    });
  }

  // Re-initialize Lucide icons for the newly added buttons
  lucide.createIcons();
});
