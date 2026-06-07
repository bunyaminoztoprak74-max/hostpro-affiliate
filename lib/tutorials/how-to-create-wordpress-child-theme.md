---
title: "How to Create a WordPress Child Theme (2026 Guide)"
excerpt: "Create a child theme to safely customize any WordPress parent theme without losing changes on updates. Includes creating the child theme files and the most common customization examples."
date: "2026-05-20"
readTime: "6 min read"
difficulty: "intermediate"
tags: ["wordpress", "child theme", "customization", "development", "themes"]
lastModified: "2026-05-20"
steps:
  - name: "Create the child theme folder"
    text: "In your hosting File Manager or via FTP, navigate to wp-content/themes/ and create a new folder named parenttheme-child (e.g., astra-child)."
  - name: "Create style.css"
    text: "In your child theme folder, create a style.css file with the theme header including Theme Name, Template (parent theme folder name), and Version. Add @import or use wp_enqueue_style."
  - name: "Create functions.php"
    text: "Create a functions.php file in your child theme folder. Add the wp_enqueue_scripts hook to properly enqueue the parent theme's stylesheet."
  - name: "Activate the child theme"
    text: "In WordPress admin, go to Appearance > Themes. Your child theme appears as a separate theme. Click Activate."
  - name: "Add your customizations"
    text: "Override parent theme templates by copying template files to your child theme folder. Add custom CSS in style.css. Add PHP customizations in functions.php."
author: marcus
---

A child theme inherits all of its parent theme's styling, templates, and functionality — but your customizations in the child theme always take precedence. When the parent theme updates, your changes survive because they live in a separate folder.

## Why Use a Child Theme?

**Without a child theme:**
- You edit parent theme files directly
- Theme update overwrites all your changes
- You lose custom CSS, modified templates, and functions.php changes

**With a child theme:**
- Your changes live in a separate folder
- Parent theme updates safely — your customizations are unaffected
- You override only the specific files you need to change

**When you DON'T need a child theme:**
- CSS changes via the WordPress Customizer (Appearance → Customize → Additional CSS) — these are stored in the database, not theme files
- Changes via a code snippets plugin (WPCode) — also stored in the database
- Using a page builder like Elementor — designs are stored in the database

Use a child theme when you need to modify actual PHP template files or add PHP functions.

## Step 1: Identify Your Parent Theme

First, know the exact folder name of your parent theme:

1. In WordPress, go to **Appearance → Themes**
2. Click on your active theme
3. Note the theme name and check its folder name:
   - **Astra:** folder is `astra`
   - **GeneratePress:** folder is `generatepress`
   - **OceanWP:** folder is `oceanwp`
   - **Storefront:** folder is `storefront`

4. Or in File Manager/FTP, navigate to `wp-content/themes/` and confirm the folder name

## Step 2: Create the Child Theme Folder

In your hosting **File Manager** (cPanel → File Manager):

1. Navigate to `public_html/wp-content/themes/`
2. Click **New Folder**
3. Name it `[parenttheme]-child` (e.g., `astra-child`, `generatepress-child`)
4. Click **Create New Folder**

Or via FTP, create the same folder in the themes directory.

## Step 3: Create style.css

In your child theme folder, create a file called `style.css`:

1. In File Manager, open your child theme folder
2. Click **New File** → name it `style.css`
3. Open the file and add this header (replace values with your info):

```css
/*
 Theme Name:   Astra Child
 Theme URI:    https://yourdomain.com
 Description:  Child theme for Astra
 Author:       Your Name
 Author URI:   https://yourdomain.com
 Template:     astra
 Version:      1.0.0
 License:      GNU General Public License v2 or later
 License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 Text Domain:  astra-child
*/

/* Your custom CSS goes below this line */
```

**Critical:** The `Template:` value must exactly match the parent theme's folder name. Wrong value = child theme won't activate.

## Step 4: Create functions.php

Create `functions.php` in your child theme folder to enqueue the parent theme's styles:

```php
<?php
add_action( 'wp_enqueue_scripts', 'my_child_theme_enqueue_styles' );

function my_child_theme_enqueue_styles() {
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/style.css'
    );
}
```

**Why not use @import in style.css?**
`@import` in CSS is slower because it blocks rendering until the parent stylesheet loads. The PHP `wp_enqueue_style` method is the correct WordPress way to load stylesheets in the correct order.

## Step 5: Activate the Child Theme

1. In WordPress admin, go to **Appearance → Themes**
2. Your child theme appears as a new theme in the list
3. Hover over it and click **Activate**
4. Your site now runs the child theme, inheriting the parent's design

**Verify it's working:**
Your site should look exactly the same as before. The child theme inherits everything from the parent.

## Adding Custom CSS

Add CSS customizations in your child theme's `style.css` (below the header comment):

```css
/* Example: Change the body font */
body {
    font-family: 'Georgia', serif;
}

/* Example: Change link color */
a {
    color: #e74c3c;
}

/* Example: Make the header sticky */
.site-header {
    position: sticky;
    top: 0;
    z-index: 100;
}

/* Example: Increase max content width */
.entry-content {
    max-width: 800px;
}
```

Child theme CSS is loaded after the parent's CSS, so your rules override parent styles.

**Tip:** Use browser DevTools (F12) to inspect elements and find the exact CSS class names used by your parent theme.

## Overriding Template Files

WordPress's template hierarchy means your child theme can override any parent theme template by creating a file with the same name.

**Example: Override the single post template**

1. In parent theme folder (`wp-content/themes/astra/`), find `single.php`
2. Copy `single.php` to your child theme folder (`astra-child/single.php`)
3. Edit the copy in your child theme — your version takes precedence
4. Parent theme updates won't affect your custom `single.php`

**Common templates to override:**

| File | Controls |
|------|---------|
| `header.php` | Site header |
| `footer.php` | Site footer |
| `single.php` | Single post page |
| `page.php` | Static page |
| `archive.php` | Blog archive |
| `sidebar.php` | Sidebar widget area |
| `404.php` | 404 error page |

**You only copy files you want to override** — everything else continues to be inherited from the parent.

## Adding PHP Functions in functions.php

Add custom functionality to your site's `functions.php` without editing parent theme code:

```php
<?php
// Enqueue parent styles (always needed)
add_action( 'wp_enqueue_scripts', 'my_child_theme_enqueue_styles' );
function my_child_theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}

// Example: Increase excerpt length
add_filter( 'excerpt_length', 'custom_excerpt_length' );
function custom_excerpt_length() {
    return 30; // 30 words
}

// Example: Add custom image sizes
add_action( 'after_setup_theme', 'child_theme_setup' );
function child_theme_setup() {
    add_image_size( 'featured-blog', 800, 500, true );
}

// Example: Add a custom CSS class to body
add_filter( 'body_class', 'add_custom_body_class' );
function add_custom_body_class( $classes ) {
    $classes[] = 'my-custom-class';
    return $classes;
}
```

## Common Child Theme Use Cases

### Customize the Header

Copy `header.php` from the parent theme to your child theme and modify it. Common changes:
- Add phone number or social icons to top bar
- Change logo position or size
- Add an announcement bar

### Custom 404 Page

Copy or create `404.php` in your child theme with a user-friendly 404 design that matches your brand and includes a search form and links to key pages.

### Add Google Fonts

In child `functions.php`:
```php
add_action( 'wp_enqueue_scripts', 'my_google_fonts' );
function my_google_fonts() {
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
        false
    );
}
```

Then use the font in your `style.css`:
```css
body {
    font-family: 'Lato', sans-serif;
}
```

## Faster Alternative: Child Theme Generator

Don't want to create the files manually? Use a child theme generator:

1. Visit [childthemegenerator.com](https://www.childthemegenerator.com)
2. Enter your parent theme name and basic info
3. Download the generated ZIP
4. Upload via **Appearance → Themes → Upload Theme**

Or install the **Child Theme Configurator** plugin which creates child themes from within WordPress.

---

**Need a premium WordPress theme worth customizing?** Paired with [Hostinger's fast NVMe servers](https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU), even complex custom themes load quickly. Starts at $2.99/month.
