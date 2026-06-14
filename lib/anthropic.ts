import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function convertHtmlToWordPress(
  htmlContent: string,
  fileName: string,
  themeName: string,
  allFiles: string[]
): Promise<string> {
  const isIndex = fileName === 'index.html' || fileName === 'index.htm';
  const templateType = isIndex ? 'index' : 'page';

  const prompt = `You are a WordPress theme developer. Convert the following HTML file into a WordPress PHP template file.

File name: ${fileName}
Theme name: ${themeName}
Template type: ${templateType}
All files in project: ${allFiles.join(', ')}

Rules:
1. Replace the <head> section content (keep the body content inline) with <?php get_header(); ?>
2. Replace the closing </body></html> area with <?php get_footer(); ?>
3. Replace any <nav> or navigation elements with <?php wp_nav_menu(['theme_location' => 'primary']); ?>
4. Replace static copyright year with <?php echo date('Y'); ?>
5. Keep all CSS classes and structure intact
6. Add WordPress loop for index.php: <?php if (have_posts()) : while (have_posts()) : the_post(); ?> ... <?php endwhile; endif; ?>
7. Use WordPress template tags where appropriate: the_title(), the_content(), the_permalink(), bloginfo()
8. Only output the PHP code, no explanation

HTML Content:
${htmlContent.substring(0, 8000)}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }
  return htmlContent;
}
