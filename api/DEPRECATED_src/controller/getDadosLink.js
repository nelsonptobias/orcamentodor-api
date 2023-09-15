const axios = require('axios');
const cheerio = require('cheerio')


const getDadosLink = async (req, res) => {
  const filter = req.headers.url

  try {
    const { data } = await axios(filter);
    const $ = cheerio.load(data)

    const imgProduto = $('.slider').find('img').attr('src')
    const nomeProduto = $('.slider').find('img').attr('title')

    console.log(imagem + $('.slider').find('img'))
    let avista = $('.preco_desconto_avista-cm').text()
    if (avista === '') {
      avista = $('.preco_desconto').find('strong').text()
    }

    console.log('preco a vista ' + avista)
    console.log('endreco da imagem ' + imgProduto)
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
