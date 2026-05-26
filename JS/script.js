
  // AOS init
  AOS.init({ duration: 800, once: true, offset: 100 });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Animated progress bars (Intersection Observer)
  const progressBars = document.querySelectorAll('.progress-bar');
  const animateSkills = () => {
    progressBars.forEach(bar => {
      const percent = bar.getAttribute('data-skill');
      if (percent && window.getComputedStyle(bar).width === '0px') {
        bar.style.width = percent + '%';
      }
    });
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
  // also trigger if already visible on load
  window.addEventListener('load', () => {
    if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight) animateSkills();
  });
  
  // Contact Form Validation
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      feedback.innerHTML = '<span class="text-danger">All fields are required!</span>';
      return;
    }
    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailPattern.test(email)) {
      feedback.innerHTML = '<span class="text-danger">Enter a valid email address.</span>';
      return;
    }
    feedback.innerHTML = '<span class="text-success">✅ Message sent! Mehwish will contact you soon.</span>';
    form.reset();
    setTimeout(() => feedback.innerHTML = '', 4000);
  });
  
  // preload skill bars if visible on load
  setTimeout(() => { if (skillsSection && window.scrollY < 500) animateSkills(); }, 500);
