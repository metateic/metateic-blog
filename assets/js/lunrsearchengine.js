---
layout: null
sitemap: false
---

{% assign counter = 0 %}
var searchDocuments = [{% for page in site.pages %}{% if page.url contains '.xml' or page.url contains 'assets' or page.url contains 'category' or page.url contains 'tag' %}{% else %}{
    "id": {{ counter }},
    "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
    "title": "{{ page.title | escape }}",
    "body": "{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}",
    "date": "{{ page.date | date: '%b %d, %Y' }}",
    "categories": [{% if page.categories %}{% for category in page.categories %}"{{ category | escape }}"{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}],
    "tags": [{% if page.tags %}{% for tag in page.tags %}"{{ tag | escape }}"{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}]
}{% assign counter = counter | plus: 1 %}, {% endif %}{% endfor %}{% for page in site.posts %}{
    "id": {{ counter }},
    "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
    "title": "{{ page.title | escape }}",
    "body": "{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}",
    "date": "{{ page.date | date: '%b %d, %Y' }}",
    "categories": [{% if page.categories %}{% for category in page.categories %}"{{ category | escape }}"{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}],
    "tags": [{% if page.tags %}{% for tag in page.tags %}"{{ tag | escape }}"{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}]
}{% if forloop.last %}{% else %}, {% endif %}{% endfor %}];

// Initialize Lunr search index
var searchIndex = lunr(function () {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('body', { boost: 5 });
    this.field('categories', { boost: 3 });
    this.field('tags', { boost: 2 });
    
    // Add documents to the index
    searchDocuments.forEach(function (doc) {
        this.add(doc);
    }, this);
});

// Make searchIndex and searchDocuments globally available
window.searchIndex = searchIndex;
window.searchDocuments = searchDocuments;

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // The search interface will be initialized by the search-lunr.html include
    console.log('Search index ready with', searchDocuments.length, 'documents');
});