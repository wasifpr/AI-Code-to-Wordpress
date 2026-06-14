import JSZip from 'jszip';
import { convertHtmlToWordPress } from './anthropic';

export interface ConversionFile {
  name: string;
  type: 'php' | 'css' | 'js' | 'image' | 'other';
  size: number;
  path: string;
}

export interface PreviewResult {
  themeName: string;
  detectedPlatform: string;
  files: ConversionFile[];
  htmlFiles: string[];
  cssFiles: string[];
  jsFiles: string[];
  imageFiles: string[];
  totalSize: number;
}

export function detectPlatform(fileNames: string[]): string {
  const allNames = fileNames.join(' ').toLowerCase();
  if (allNames.includes('lovable')) return 'Lovable';
  if (allNames.includes('vite') || allNames.includes('v0')) return 'v0.dev / Vite';
  if (allNames.includes('next')) return 'Next.js';
  if (allNames.includes('cursor')) return 'Cursor';
  if (allNames.includes('bolt')) return 'Bolt.new';
  if (allNames.includes('replit')) return 'Replit';
  if (allNames.includes('framer')) return 'Framer';
  return 'Custom / Unknown';
}

export function sanitizeThemeName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 40) || 'my-wp-theme';
}

export async function generatePreview(zipBuffer: Buffer, originalName: string): Promise<PreviewResult> {
  const zip = await JSZip.loadAsync(zipBuffer);
  const files: ConversionFile[] = [];
  let totalSize = 0;
  const fileNames: string[] = [];

  for (const [path, file] of Object.entries(zip.files)) {
    if (file.dir) continue;
    const content = await file.async('uint8array');
    const size = content.length;
    totalSize += size;
    fileNames.push(path);

    const ext = path.split('.').pop()?.toLowerCase() || '';
    let type: ConversionFile['type'] = 'other';
    if (['html', 'htm'].includes(ext)) type = 'php';
    else if (ext === 'css') type = 'css';
    else if (ext === 'js' || ext === 'ts' || ext === 'jsx' || ext === 'tsx') type = 'js';
    else if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(ext)) type = 'image';

    files.push({ name: path.split('/').pop() || path, type, size, path });
  }

  const themeName = sanitizeThemeName(originalName.replace(/\.zip$/i, ''));
  const detectedPlatform = detectPlatform(fileNames);

  const htmlFiles = fileNames.filter(f => /\.(html|htm)$/i.test(f));
  const cssFiles = fileNames.filter(f => /\.css$/i.test(f));
  const jsFiles = fileNames.filter(f => /\.(js|ts|jsx|tsx)$/i.test(f));
  const imageFiles = fileNames.filter(f => /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(f));

  return { themeName, detectedPlatform, files, htmlFiles, cssFiles, jsFiles, imageFiles, totalSize };
}

export async function convertToWordPress(zipBuffer: Buffer, themeName: string): Promise<Buffer> {
  const zip = await JSZip.loadAsync(zipBuffer);
  const outputZip = new JSZip();
  const themeFolder = outputZip.folder(themeName)!;

  const allFileNames: string[] = [];
  const htmlFiles: Record<string, string> = {};
  const otherFiles: Record<string, Uint8Array> = {};

  for (const [path, file] of Object.entries(zip.files)) {
    if (file.dir) continue;
    allFileNames.push(path);

    const ext = path.split('.').pop()?.toLowerCase() || '';
    if (['html', 'htm'].includes(ext)) {
      htmlFiles[path] = await file.async('string');
    } else {
      otherFiles[path] = await file.async('uint8array');
    }
  }

  // Convert HTML files to WordPress PHP templates
  for (const [path, content] of Object.entries(htmlFiles)) {
    const fileName = path.split('/').pop() || path;
    const phpContent = await convertHtmlToWordPress(content, fileName, themeName, allFileNames);
    const phpName = fileName.replace(/\.html?$/i, '.php');
    themeFolder.file(phpName, phpContent);
  }

  // Copy other files preserving structure
  for (const [path, content] of Object.entries(otherFiles)) {
    const parts = path.split('/');
    const relativePath = parts.length > 1 ? parts.slice(1).join('/') : path;
    themeFolder.file(relativePath, content);
  }

  // Generate WordPress-required files
  themeFolder.file('style.css', generateStyleCSS(themeName));
  themeFolder.file('functions.php', generateFunctionsPhp(themeName));
  themeFolder.file('header.php', generateHeaderPhp(themeName));
  themeFolder.file('footer.php', generateFooterPhp(themeName));

  if (!htmlFiles['index.html'] && !htmlFiles['index.htm']) {
    themeFolder.file('index.php', generateDefaultIndexPhp());
  }

  const outputBuffer = await outputZip.generateAsync({ type: 'nodebuffer' });
  return outputBuffer;
}

function generateStyleCSS(themeName: string): string {
  const displayName = themeName
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return `/*
Theme Name: ${displayName}
Theme URI: https://example.com
Author: AI Code to WordPress
Author URI: https://aicode2wp.com
Description: AI-converted WordPress theme generated from your website.
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: ${themeName}
Tags: custom, responsive, ai-generated
*/

/* =WordPress Core
-------------------------------------------------------------- */
.alignnone { margin: 5px 20px 20px 0; }
.aligncenter, div.aligncenter { display: block; margin: 5px auto 5px auto; }
.alignright { float: right; margin: 5px 0 20px 20px; }
.alignleft { float: left; margin: 5px 20px 20px 0; }
`;
}

function generateFunctionsPhp(themeName: string): string {
  return `<?php
/**
 * ${themeName} Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( '${themeName.toUpperCase().replace(/-/g, '_')}_VERSION', '1.0.0' );

function ${themeName.replace(/-/g, '_')}_setup() {
    load_theme_textdomain( '${themeName}', get_template_directory() . '/languages' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
    add_theme_support( 'customize-selective-refresh-widgets' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );

    register_nav_menus([
        'primary' => __( 'Primary Menu', '${themeName}' ),
        'footer'  => __( 'Footer Menu', '${themeName}' ),
    ]);
}
add_action( 'after_setup_theme', '${themeName.replace(/-/g, '_')}_setup' );

function ${themeName.replace(/-/g, '_')}_scripts() {
    wp_enqueue_style( '${themeName}-style', get_stylesheet_uri(), [], ${themeName.toUpperCase().replace(/-/g, '_')}_VERSION );
    wp_enqueue_script( '${themeName}-script', get_template_directory_uri() . '/assets/js/main.js', [], ${themeName.toUpperCase().replace(/-/g, '_')}_VERSION, true );
}
add_action( 'wp_enqueue_scripts', '${themeName.replace(/-/g, '_')}_scripts' );

function ${themeName.replace(/-/g, '_')}_widgets_init() {
    register_sidebar([
        'name'          => __( 'Sidebar', '${themeName}' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Add widgets here.', '${themeName}' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ]);
}
add_action( 'widgets_init', '${themeName.replace(/-/g, '_')}_widgets_init' );
`;
}

function generateHeaderPhp(themeName: string): string {
  return `<?php
/**
 * Header template
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
    <div class="site-branding">
        <?php
        if ( has_custom_logo() ) {
            the_custom_logo();
        } else {
            echo '<a href="' . esc_url( home_url('/') ) . '" rel="home">' . get_bloginfo('name') . '</a>';
        }
        ?>
    </div>
    <nav class="main-navigation">
        <?php
        wp_nav_menu([
            'theme_location' => 'primary',
            'menu_id'        => 'primary-menu',
            'container'      => false,
        ]);
        ?>
    </nav>
</header>
`;
}

function generateFooterPhp(themeName: string): string {
  return `<?php
/**
 * Footer template
 */
?>
<footer class="site-footer">
    <div class="footer-inner">
        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
        <nav class="footer-navigation">
            <?php
            wp_nav_menu([
                'theme_location' => 'footer',
                'container'      => false,
                'depth'          => 1,
            ]);
            ?>
        </nav>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
`;
}

function generateDefaultIndexPhp(): string {
  return `<?php
/**
 * Main template file
 */
get_header();
?>
<main id="primary" class="site-main">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                </header>
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile;
    else :
        echo '<p>No content found.</p>';
    endif;
    ?>
</main>
<?php get_footer(); ?>
`;
}
