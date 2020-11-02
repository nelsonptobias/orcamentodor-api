const axios = require('axios');
const cheerio = require('cheerio')


const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
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

    const imgProduto = $('.slider').find('img').attr('src')
    const nomeProduto = $('.slider').find('img').attr('title')

    let avista = $('.preco_desconto_avista-cm').text()
    if (avista === '') {
      avista = $('.preco_desconto').find('strong').text()
    }

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

module.exports = allowCors(link)