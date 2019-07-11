/* eslint-env mocha */
const { expect } = require('chai')
const { test } = require('../browser')

describe('detail page', () => {
  it(
    'Can not be seen at /movie/:movie_id without time selected',
    test(async (browser, opts) => {
      const page = await browser.newPage()
      await page.goto(`${opts.appUrl}/movie/5d25ae6159e0cee928b9bf97`)

      const BODY_SELECTOR = 'body'
      await page.waitFor(BODY_SELECTOR)

      const innerText = await page.evaluate(sel => {
        return document.querySelector(sel).innerText
      }, BODY_SELECTOR)

      expect(innerText).to.contain('404')
    })
  )
  it(
    'Can be seen at /movie/:movie_id when time selected',
    test(async (browser, opts) => {
      const page = await browser.newPage()
      await page.goto(`${opts.appUrl}/movie/5d25ae6159e0cee928b9bf97?time=10.00`)

      const BODY_SELECTOR = 'body'
      await page.waitFor(BODY_SELECTOR)

      const innerText = await page.evaluate(sel => {
        return document.querySelector(sel).innerText
      }, BODY_SELECTOR)

      expect(innerText).not.to.contain('404')
    })
  )
})
