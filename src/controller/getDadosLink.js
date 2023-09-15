const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')

const getDadosLink = async (req, res) => {
  const filter = req.headers.url

  try {
    const { data } = await axios(filter);  
    fs.writeFileSync('./teste', data)

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

module.exports = {
  getDadosLink
}
