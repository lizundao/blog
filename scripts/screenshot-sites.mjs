import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/images/sites');

const sites = [
  { name: 'inkdot', url: 'https://inkdot.cn/' },
  { name: 'qinqi', url: 'https://qinqi.wiki/' },
  { name: 'towalles', url: 'https://towalles.com/cn' },
  { name: 'world-clock', url: 'https://world-clock.app/' },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const site of sites) {
  await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const acceptCookies = page.getByRole('button', { name: /接受全部|Accept all/i });
  if (await acceptCookies.count()) {
    await acceptCookies.first().click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(500);
  }

  await page.screenshot({
    path: path.join(outDir, `${site.name}.png`),
    fullPage: false,
  });
  console.log(`saved ${site.name}.png`);
}

await browser.close();
