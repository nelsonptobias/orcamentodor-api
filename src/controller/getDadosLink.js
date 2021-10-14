const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')

const getDadosLink = async (req, res) => {
  const filter = req.headers.url

  try {
    const { data } = await axios(filter);  
    fs.writeFileSync('./teste', data)

    const $ = cheerio.load(data)

    const imgProduto = $('#carouselDetails').find('figure').find('img').attr('src') 
    const nomeProduto = $('section').find('h1').text()
    

    let avista = $('#blocoValores').find('h4').text() 

    console.log('preco a vista ' + avista)
    return res.send(
      {
        nome: nomeProduto,
        imagem: imgProduto,
        precoAvista: avista
      }
    )
  } catch (error) {
    return res.send({
      erro: error.message
    })
  }
}

module.exports = {
  getDadosLink
}
