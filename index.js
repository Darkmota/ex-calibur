const crypto = require('crypto')
const cheerio = require('cheerio')
const https = require('https')
const axios = require('axios')
const zlib = require('zlib')
const url = require('url')
const iconv = require('iconv-lite')
const HttpsProxyAgent = require('https-proxy-agent')

let proxy = process.env.http_proxy || 'http://127.0.0.1:1080'
let endpoint = 'https://e-hentai.org/'
let options = url.parse(endpoint)

let agent = new HttpsProxyAgent(proxy)
options.agent = agent

options.headers = {
  'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'accept-language: zh-CN,zh;q=0.9',
  'cache-control': 'max-age=0',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
}

async function a() {
  let res = await axios.get('https://e-hentai.org/' , {
  }, {
    headers: {
      ':authority': 'e-hentai.org',
      ':scheme': 'https',
      ':path': '/',
      'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'accept-language: zh-CN,zh;q=0.9',
      'cache-control': 'max-age=0',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
    }
  })
}

async function main() {
  try {
    https.get(options, (res) => {
      let chunks = []
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        if (res.headers['content-encoding'].indexOf('gzip') != -1) {
          let b = zlib.unzipSync(Buffer.concat(chunks))
          console.log(iconv.decode(b, 'utf-8'))
        }
      })
    })
  } catch (e) {
    if (e) {
      console.log(e)
    }
  }
}

main()
