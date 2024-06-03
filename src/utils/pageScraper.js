const fs = require('fs')

const scraperObject = {
  url: 'http://pccomponentes.com/portatiles',
  scraper: async (browser, page, scrapedData = [], currentPage = 1) => {
    console.log(`Navigating to ${scraperObject.url} page ${currentPage}...`)
    await page.goto(scraperObject.url + `?page=${currentPage}`, {
      waitUntil: 'networkidle2',
      timeout: 120000
    })

    try {
      await page.waitForSelector('#category-list-product-grid', {
        timeout: 20000
      })
    } catch (error) {
      console.log('No products found on this page.')
      return scraperObject.writeAndClose(scrapedData)
    }

    let urls = await page.$$eval('#category-list-product-grid > a', (links) => {
      return links.map((link) => link.href)
    })

    console.log(urls)

    let pagePromise = async (link) => {
      await page.goto(link, { waitUntil: 'networkidle2', timeout: 120000 })

      const dataObj = {}
      try {
        dataObj['portatilName'] = await page.$eval('#pdp-title', (text) =>
          text.textContent.trim()
        )
      } catch (error) {
        dataObj['portatilName'] = 'Modelo no disponible'
      }

      try {
        dataObj['portatilPrice'] = await page.$eval(
          '#pdp-price-current-integer',
          (text) => text.textContent.trim()
        )
      } catch (error) {
        dataObj['portatilPrice'] = 'Precio no disponible'
      }

      try {
        dataObj['portatilImg'] = await page.$eval(
          '#pdp-section-images div div ul li:first-child img',
          (img) => img.src
        )
      } catch (error) {
        dataObj['portatilImg'] = 'Imagen no disponible'
      }

      return dataObj
    }

    for (let link of urls) {
      let currentPageData = await pagePromise(link)
      console.log(currentPageData)
      scrapedData.push(currentPageData)
    }

    const nextPage = currentPage + 1
    const nextPageUrl = `${scraperObject.url}?page=${nextPage}`

    console.log('Navigating to next page:', nextPageUrl)
    try {
      await page.goto(nextPageUrl, {
        waitUntil: 'networkidle2',
        timeout: 120000
      })
      await page.waitForSelector('#category-list-product-grid', {
        timeout: 10000
      })

      return scraperObject.scraper(browser, page, scrapedData, nextPage)
    } catch (error) {
      console.log('No more pages or failed to navigate to the next page.')
      return scraperObject.writeAndClose(scrapedData)
    }
  },

  writeAndClose: (scrapedData) => {
    fs.writeFile(
      'products.json',
      JSON.stringify(scrapedData, null, 2),
      (err) => {
        if (err) throw err
        console.log('File written')
      }
    )
  }
}

module.exports = scraperObject
