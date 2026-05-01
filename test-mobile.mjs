import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'index.html');

const viewports = [
  { name: 'iphone-se',       width: 375, height: 667, dpr: 2 },
  { name: 'iphone-14',       width: 390, height: 844, dpr: 3 },
  { name: 'iphone-14-max',   width: 430, height: 932, dpr: 3 },
  { name: 'pixel-7',         width: 412, height: 915, dpr: 2.6 },
  { name: 'samsung-s23',     width: 360, height: 780, dpr: 3 },
];

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: vp.dpr, isMobile: true, hasTouch: true });

  // Intercept Firebase and external requests so page loads fast offline
  await page.setRequestInterception(true);
  page.on('request', req => {
    const url = req.url();
    if (url.includes('firebase') || url.includes('googleapis') || url.includes('gstatic') || url.includes('cloudflare') || url.includes('fontawesome')) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 600));

  // Inject state: Red Farmako Central on duty (same as the screenshot scenario)
  await page.evaluate(() => {
    // Remove loader
    const loader = document.getElementById('loader');
    if (loader) loader.remove();

    // Set date text
    const fecha = document.getElementById('fecha');
    if (fecha) fecha.textContent = 'Viernes, 1 de mayo de 2026';

    // Set timer
    const timer = document.getElementById('turno-timer');
    if (timer) { timer.textContent = '⏰ Finaliza en 18:14:59'; timer.style.display = 'flex'; }

    // Show Red Farmako logo
    const wrapper = document.getElementById('logo-red-wrapper');
    if (wrapper) wrapper.style.display = 'flex';

    // Set pharmacy name
    const nombre = document.getElementById('nombre-farmacia');
    if (nombre) { nombre.textContent = 'Central'; nombre.classList.add('nombre-farmacia--rmk'); }

    // Add RMK card class
    const card = document.getElementById('turno-card');
    if (card) card.classList.add('card--rmk');

    // Enable buttons
    document.getElementById('btn-maps').disabled = false;
    document.getElementById('btn-wpp').disabled = false;
  });

  await new Promise(r => setTimeout(r, 300));

  const screenshotPath = path.join(__dirname, `test-${vp.name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`✓ ${vp.name} (${vp.width}x${vp.height}) → test-${vp.name}.png`);

  await page.close();
}

await browser.close();
console.log('\nDone. Check the test-*.png files.');
