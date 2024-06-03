const { startBrowser } = require('./startBrowser')
const pageScraper = require('./pageScraper')

async function startScraper() {
  const browserInstance = await startBrowser()
  if (browserInstance) {
    console.log('Starting scraping...')
    const page = await browserInstance.newPage()
    await pageScraper.scraper(browserInstance, page)
    console.log('Scraping completed')
  } else {
    console.log('Failed to start scraping: Browser instance not available')
  }
}

startScraper()
