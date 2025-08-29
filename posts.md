---
layout: page
title: "All Posts"
subtitle: "Explore our latest insights on technology and innovation"
permalink: /posts/
---

<div class="content-section">
  <h1>📚 All Blog Posts</h1>
  
  <p>Discover our latest articles, insights, and analysis on cutting-edge technology trends.</p>
</div>

<div class="content-section">
  <h2>🔥 Featured Posts</h2>
  
  <div class="featured-posts">
    {% for post in site.posts limit:3 %}
    <div class="post-card">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.author }}</p>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      <div class="post-tags">
        {% for tag in post.tags %}
        <span class="tag">{{ tag }}</span>
        {% endfor %}
      </div>
      <a href="{{ post.url }}" class="read-more">Read Full Article →</a>
    </div>
    {% endfor %}
  </div>
</div>

<div class="content-section">
  <h2>📖 All Posts</h2>
  
  <div class="posts-list">
    {% for post in site.posts %}
    <div class="post-item">
      <div class="post-header">
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <div class="post-meta">
          <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
          <span class="post-author">{{ post.author }}</span>
          {% if post.categories %}
          <span class="post-categories">
            {% for category in post.categories %}
            <span class="tag">{{ category }}</span>
            {% endfor %}
          </span>
          {% endif %}
        </div>
      </div>
      
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
      
      <div class="post-footer">
        <div class="post-tags">
          {% for tag in post.tags %}
          <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
        <a href="{{ post.url }}" class="read-more">Read More →</a>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<div class="content-section">
  <h2>🏷️ Browse by Category</h2>
  
  <div class="categories-grid">
    {% assign categories = site.posts | map: "categories" | uniq | sort %}
    {% for category in categories %}
    <div class="category-card">
      <h4>{{ category }}</h4>
      <p>{{ site.posts | where: "categories", category | size }} posts</p>
      <a href="/category/{{ category | downcase | replace: ' ', '-' }}/" class="category-link">View Posts</a>
    </div>
    {% endfor %}
  </div>
</div>

<div class="content-section">
  <h2>🔍 Search Posts</h2>
  
  <div class="search-section">
    <p>Looking for something specific? Use the search bar above or browse our categories to find the content you're looking for.</p>
  </div>
</div>

<div class="content-section">
  <hr>
  
  <p class="cta-text"><strong>Can't find what you're looking for?</strong> <a href="mailto:hello@metateic.com">Contact us</a> with your suggestions for future blog posts!</p>
  
  <p class="cta-text"><em>Stay updated with our latest insights by following us on <a href="https://github.com/metateic">GitHub</a>, <a href="https://twitter.com/metateic">Twitter</a>, and <a href="https://linkedin.com/company/metateic">LinkedIn</a>.</em></p>
</div>
