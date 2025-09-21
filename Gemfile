source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#

# If you have any plugins, put them here!
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
group :jekyll_plugins do
    gem 'jekyll-feed'
    gem 'jekyll-sitemap'
    gem 'jekyll-paginate'
    gem 'jekyll-seo-tag'
    # gem 'jekyll-archives'  # Temporarily disabled due to eventmachine compatibility issues
    gem 'kramdown'
    gem 'kramdown-parser-gfm'
    gem 'rouge'
end

# Use newer Jekyll version for better macOS compatibility
gem 'jekyll', '~> 4.0'

# Force newer eventmachine version for macOS compatibility
gem 'eventmachine', '~> 1.3.0'
