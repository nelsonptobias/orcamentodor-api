const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');


const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, url'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}



const link = async (req, res) => {
  const filter = req.headers.url

  try {
    const { data } = await axios(filter);
    const $ = cheerio.load(data)

    const imgProduto = $('meta[name="twitter:image"]').attr('content')
    const nomeProduto = $('section').find('h1').text()
    

    let avista = $('#blocoValores').find('h4').text()

    const response = {
      nome: nomeProduto,
      imagem: imgProduto,
      precoAvista: avista}

    console.log('request response ' + JSON.stringify(response))
    return res.send(response)
  } catch (error) {
    return res.send({
      erro: error.message
    })
  }
}

module.exports = allowCors(link)