---
layout: default
title: "Welcome to Metateic"
subtitle: "Exploring the future of technology and innovation"
permalink: /
---

<div class="hero-section">
  <h1 class="hero-title">🚀 Welcome to Metateic</h1>
  <p class="hero-subtitle">Exploring technology, innovation, and the future of computing</p>
  <div class="hero-cta">
    <a href="/posts/" class="btn btn-primary">Read Our Blog</a>
    <a href="https://metateic.com" class="btn btn-secondary">Learn More</a>
  </div>
</div>

<div class="content-section">
  <h2>🎯 What We Do</h2>
  
  <p>Metateic is at the forefront of technological innovation, exploring emerging trends in:</p>
  
  <ul class="feature-list">
    <li><strong>Artificial Intelligence & Machine Learning</strong></li>
    <li><strong>Quantum Computing & Cryptography</strong></li>
    <li><strong>Blockchain & Web3 Technologies</strong></li>
    <li><strong>Cybersecurity & Privacy</strong></li>
    <li><strong>Cloud Computing & Infrastructure</strong></li>
  </ul>
</div>

<div class="content-section">
  <h2>📚 Latest Posts</h2>
  
  <div class="featured-posts">
    {% for post in site.posts limit:3 %}
    <div class="post-card">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.author }}</p>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
      <a href="{{ post.url }}" class="read-more">Read More →</a>
    </div>
    {% endfor %}
  </div>
</div>

<div class="content-section">
  <h2>🌟 Why Metateic?</h2>
  
  <p>We believe in <strong>democratizing technology</strong> and making complex concepts accessible to everyone. Our mission is to:</p>
  
  <ul class="mission-list">
    <li><strong>Educate</strong> through clear, engaging content</li>
    <li><strong>Inspire</strong> with cutting-edge insights</li>
    <li><strong>Connect</strong> communities of innovators</li>
    <li><strong>Build</strong> the future, one idea at a time</li>
  </ul>
</div>

<div class="content-section">
  <h2>📬 Stay Connected</h2>
  
  <div class="social-links">
    <a href="https://github.com/metateic" class="social-link">🐙 GitHub</a>
    <a href="https://twitter.com/metateic" class="social-link">🐦 Twitter</a>
    <a href="https://linkedin.com/company/metateic" class="social-link">💼 LinkedIn</a>
    <a href="mailto:hello@metateic.com" class="social-link">📧 Email</a>
  </div>
</div>

<div class="content-section">
  <hr>
  
  <p class="cta-text"><em>Ready to explore the future? <a href="/posts/">Start reading our latest posts</a> or <a href="https://metateic.com">learn more about us</a>.</em></p>
</div>
