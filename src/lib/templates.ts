export const defaultTemplates = [
  {
    name: 'Modern Landing Page',
    description: 'Clean and modern landing page with hero section and features',
    category: 'landing',
    thumbnail_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    html_content: `
      <div class="container">
        <header class="header">
          <div class="logo">YourBrand</div>
          <nav class="nav">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section class="hero">
          <h1 class="hero-title">Build Amazing Websites</h1>
          <p class="hero-subtitle">Create stunning landing pages in minutes with our intuitive platform</p>
          <button class="cta-button">Get Started Free</button>
        </section>

        <section class="features" id="features">
          <h2 class="section-title">Powerful Features</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Optimized for speed and performance</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Modern and responsive layouts</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Enterprise-grade security</p>
            </div>
          </div>
        </section>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
      .header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
      .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
      .nav { display: flex; gap: 30px; }
      .nav a { color: #4b5563; text-decoration: none; transition: color 0.3s; }
      .nav a:hover { color: #2563eb; }
      .hero { text-align: center; padding: 80px 0; }
      .hero-title { font-size: 56px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
      .hero-subtitle { font-size: 20px; color: #6b7280; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
      .cta-button { background: #2563eb; color: white; border: none; padding: 16px 32px; font-size: 18px; border-radius: 8px; cursor: pointer; transition: background 0.3s; }
      .cta-button:hover { background: #1d4ed8; }
      .features { padding: 80px 0; background: #f9fafb; }
      .section-title { text-align: center; font-size: 36px; margin-bottom: 60px; color: #1f2937; }
      .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .feature-card { background: white; padding: 40px; border-radius: 12px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; }
      .feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      .feature-icon { font-size: 48px; margin-bottom: 20px; }
      .feature-card h3 { font-size: 24px; margin-bottom: 10px; color: #1f2937; }
      .feature-card p { color: #6b7280; }
    `
  },
  {
    name: 'Portfolio Showcase',
    description: 'Perfect for showcasing your creative work and projects',
    category: 'portfolio',
    thumbnail_url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    html_content: `
      <div class="portfolio-container">
        <header class="portfolio-header">
          <h1>Creative Portfolio</h1>
          <p>Designer & Developer</p>
        </header>

        <section class="about">
          <h2>About Me</h2>
          <p>I create beautiful digital experiences that make people's lives easier and more enjoyable.</p>
        </section>

        <section class="projects">
          <h2>Featured Work</h2>
          <div class="project-grid">
            <div class="project-card">
              <div class="project-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <span class="project-number">01</span>
              </div>
              <h3>Brand Identity</h3>
              <p>Complete branding solution for tech startup</p>
            </div>
            <div class="project-card">
              <div class="project-image" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <span class="project-number">02</span>
              </div>
              <h3>Mobile App Design</h3>
              <p>iOS app for fitness tracking</p>
            </div>
            <div class="project-card">
              <div class="project-image" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                <span class="project-number">03</span>
              </div>
              <h3>Website Redesign</h3>
              <p>E-commerce platform overhaul</p>
            </div>
          </div>
        </section>

        <footer class="portfolio-footer">
          <p>Let's work together</p>
          <a href="mailto:hello@example.com" class="contact-btn">Get in Touch</a>
        </footer>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0f0f0f; color: #ffffff; }
      .portfolio-container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
      .portfolio-header { text-align: center; padding: 60px 0; }
      .portfolio-header h1 { font-size: 64px; font-weight: 300; margin-bottom: 10px; }
      .portfolio-header p { font-size: 20px; color: #888; letter-spacing: 2px; }
      .about { text-align: center; max-width: 600px; margin: 80px auto; }
      .about h2 { font-size: 32px; margin-bottom: 20px; }
      .about p { font-size: 18px; color: #aaa; line-height: 1.8; }
      .projects { margin: 100px 0; }
      .projects h2 { text-align: center; font-size: 36px; margin-bottom: 60px; }
      .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }
      .project-card { cursor: pointer; transition: transform 0.3s; }
      .project-card:hover { transform: scale(1.05); }
      .project-image { aspect-ratio: 4/3; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
      .project-number { font-size: 72px; font-weight: bold; opacity: 0.3; }
      .project-card h3 { font-size: 24px; margin-bottom: 10px; }
      .project-card p { color: #888; }
      .portfolio-footer { text-align: center; margin-top: 120px; padding: 60px 0; }
      .portfolio-footer p { font-size: 28px; margin-bottom: 30px; }
      .contact-btn { display: inline-block; padding: 16px 40px; background: white; color: #0f0f0f; text-decoration: none; border-radius: 50px; font-weight: 600; transition: transform 0.3s; }
      .contact-btn:hover { transform: translateY(-2px); }
    `
  },
  {
    name: 'SaaS Product Page',
    description: 'Professional SaaS product landing page with pricing',
    category: 'saas',
    thumbnail_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    html_content: `
      <div class="saas-page">
        <nav class="navbar">
          <div class="nav-brand">ProductName</div>
          <div class="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <button class="nav-cta">Start Free Trial</button>
          </div>
        </nav>

        <section class="hero-section">
          <h1>Streamline Your Workflow</h1>
          <p>The all-in-one platform to manage your business efficiently</p>
          <div class="hero-actions">
            <button class="primary-btn">Get Started Free</button>
            <button class="secondary-btn">Watch Demo</button>
          </div>
        </section>

        <section class="stats">
          <div class="stat-item">
            <div class="stat-number">50K+</div>
            <div class="stat-label">Active Users</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">Uptime</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support</div>
          </div>
        </section>

        <section class="pricing" id="pricing">
          <h2>Simple, Transparent Pricing</h2>
          <div class="pricing-grid">
            <div class="pricing-card">
              <h3>Starter</h3>
              <div class="price">$29<span>/month</span></div>
              <ul class="features-list">
                <li>✓ Up to 10 users</li>
                <li>✓ 100GB storage</li>
                <li>✓ Email support</li>
              </ul>
              <button class="plan-btn">Choose Plan</button>
            </div>
            <div class="pricing-card featured">
              <div class="popular-badge">Most Popular</div>
              <h3>Professional</h3>
              <div class="price">$79<span>/month</span></div>
              <ul class="features-list">
                <li>✓ Unlimited users</li>
                <li>✓ 1TB storage</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
              </ul>
              <button class="plan-btn primary">Choose Plan</button>
            </div>
            <div class="pricing-card">
              <h3>Enterprise</h3>
              <div class="price">Custom</div>
              <ul class="features-list">
                <li>✓ Everything in Pro</li>
                <li>✓ Dedicated support</li>
                <li>✓ Custom integrations</li>
                <li>✓ SLA guarantee</li>
              </ul>
              <button class="plan-btn">Contact Sales</button>
            </div>
          </div>
        </section>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .saas-page { min-height: 100vh; }
      .navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; border-bottom: 1px solid #e5e7eb; }
      .nav-brand { font-size: 24px; font-weight: bold; color: #10b981; }
      .nav-links { display: flex; gap: 30px; align-items: center; }
      .nav-links a { color: #4b5563; text-decoration: none; }
      .nav-cta { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
      .hero-section { text-align: center; padding: 100px 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); }
      .hero-section h1 { font-size: 56px; color: #1f2937; margin-bottom: 20px; }
      .hero-section p { font-size: 20px; color: #6b7280; margin-bottom: 40px; }
      .hero-actions { display: flex; gap: 20px; justify-content: center; }
      .primary-btn { background: #10b981; color: white; border: none; padding: 16px 32px; font-size: 16px; border-radius: 8px; cursor: pointer; }
      .secondary-btn { background: transparent; border: 2px solid #10b981; color: #10b981; padding: 14px 32px; font-size: 16px; border-radius: 8px; cursor: pointer; }
      .stats { display: flex; justify-content: center; gap: 80px; padding: 60px 20px; background: white; }
      .stat-number { font-size: 48px; font-weight: bold; color: #10b981; }
      .stat-label { color: #6b7280; margin-top: 8px; }
      .pricing { padding: 100px 20px; background: #f9fafb; }
      .pricing h2 { text-align: center; font-size: 40px; margin-bottom: 60px; }
      .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; }
      .pricing-card { background: white; padding: 40px; border-radius: 16px; border: 2px solid #e5e7eb; position: relative; }
      .pricing-card.featured { border-color: #10b981; box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1); transform: scale(1.05); }
      .popular-badge { position: absolute; top: -12px; right: 20px; background: #10b981; color: white; padding: 4px 16px; border-radius: 20px; font-size: 12px; }
      .pricing-card h3 { font-size: 24px; margin-bottom: 20px; }
      .price { font-size: 48px; font-weight: bold; margin-bottom: 30px; }
      .price span { font-size: 18px; color: #6b7280; }
      .features-list { list-style: none; margin-bottom: 30px; }
      .features-list li { padding: 10px 0; color: #4b5563; }
      .plan-btn { width: 100%; padding: 14px; border: 2px solid #10b981; background: white; color: #10b981; border-radius: 8px; font-size: 16px; cursor: pointer; }
      .plan-btn.primary { background: #10b981; color: white; }
    `
  },
  {
    name: 'Restaurant Menu',
    description: 'Elegant restaurant menu and booking page',
    category: 'restaurant',
    thumbnail_url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    html_content: `
      <div class="restaurant-site">
        <header class="restaurant-header">
          <h1 class="restaurant-name">La Bella Cucina</h1>
          <p class="restaurant-tagline">Authentic Italian Cuisine</p>
        </header>

        <section class="menu-section">
          <h2 class="menu-title">Our Menu</h2>

          <div class="menu-category">
            <h3>Antipasti</h3>
            <div class="menu-item">
              <div class="item-info">
                <h4>Bruschetta Classica</h4>
                <p>Toasted bread with fresh tomatoes, basil, and olive oil</p>
              </div>
              <span class="price">$12</span>
            </div>
            <div class="menu-item">
              <div class="item-info">
                <h4>Caprese Salad</h4>
                <p>Fresh mozzarella, tomatoes, and basil drizzled with balsamic</p>
              </div>
              <span class="price">$14</span>
            </div>
          </div>

          <div class="menu-category">
            <h3>Pasta</h3>
            <div class="menu-item">
              <div class="item-info">
                <h4>Spaghetti Carbonara</h4>
                <p>Classic Roman pasta with eggs, pecorino, and guanciale</p>
              </div>
              <span class="price">$18</span>
            </div>
            <div class="menu-item">
              <div class="item-info">
                <h4>Penne Arrabbiata</h4>
                <p>Spicy tomato sauce with garlic and red pepper</p>
              </div>
              <span class="price">$16</span>
            </div>
          </div>

          <div class="menu-category">
            <h3>Dolci</h3>
            <div class="menu-item">
              <div class="item-info">
                <h4>Tiramisu</h4>
                <p>Classic Italian dessert with espresso and mascarpone</p>
              </div>
              <span class="price">$10</span>
            </div>
          </div>
        </section>

        <section class="reservation">
          <h2>Make a Reservation</h2>
          <button class="reserve-btn">Book a Table</button>
        </section>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Georgia', serif; background: #faf8f3; color: #2d2d2d; }
      .restaurant-site { max-width: 900px; margin: 0 auto; }
      .restaurant-header { text-align: center; padding: 80px 20px; background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200'); background-size: cover; background-position: center; color: white; }
      .restaurant-name { font-size: 56px; margin-bottom: 10px; font-weight: 400; letter-spacing: 2px; }
      .restaurant-tagline { font-size: 20px; font-style: italic; letter-spacing: 1px; }
      .menu-section { padding: 60px 40px; }
      .menu-title { text-align: center; font-size: 40px; margin-bottom: 60px; color: #8b4513; }
      .menu-category { margin-bottom: 50px; }
      .menu-category h3 { font-size: 28px; color: #8b4513; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 2px solid #d4af37; }
      .menu-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 0; border-bottom: 1px solid #e8e3d6; }
      .item-info h4 { font-size: 20px; margin-bottom: 8px; color: #2d2d2d; }
      .item-info p { font-size: 14px; color: #666; font-style: italic; }
      .price { font-size: 20px; font-weight: bold; color: #8b4513; }
      .reservation { text-align: center; padding: 80px 40px; background: #8b4513; color: white; }
      .reservation h2 { font-size: 36px; margin-bottom: 30px; }
      .reserve-btn { background: #d4af37; color: #2d2d2d; border: none; padding: 18px 48px; font-size: 18px; border-radius: 4px; cursor: pointer; font-family: 'Georgia', serif; transition: transform 0.3s; }
      .reserve-btn:hover { transform: translateY(-2px); }
    `
  }
];
