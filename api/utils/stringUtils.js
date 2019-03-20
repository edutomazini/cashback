const onlyNumbers = (str) => {
  return str.replace(/\D+/g, '')
}

const toUpper = (str) => {
  if (str != undefined && str != null) {
    return str.toString().toUpperCase()
  } else {
    return null
  }
}

const toLower = (str) => {
  if (str != undefined && str != null) {
    return str.toString().toLowerCase()
  } else {
    return null
  }
}

const emptyToNull = (str) => {
  if (str == "" || str == " " || str == undefined || str == null) {
    str = null
  }
  return str
}

const trata_nsuhost_sitef = (num) => {
  var num = num + ""
  var qtd_carac = num.length

  num = num.substr(4, qtd_carac) // Padrão do sitef é 0+[numero_dia_ano_ate_365]+id

  return parseInt(num) // parseInt para remover os zeros da esquerda
}

const remove_left_zeros = (str) => {
  if (str != undefined && str != null) {
    str = str.replace(/^0+/, '');
  }
  return str
}

/** Completa com zeros na esquerda. Ex (5, 3) => 00003 */
const completaInfoZerosEsquerda = function (quantidade, info) {
  if ((info.toString().length) > (quantidade)) { //para truncar, caso seja maior
    if (quantidade == 0)
      quantidade = 1; //garante que info nao sera retornado vazio, caso qtd = 0

    return info.toString().substring(0, quantidade);
  }

  let infozeros = info
  while (infozeros.toString().length < quantidade)
    infozeros = "0" + infozeros

  return infozeros
}

module.exports = {
  onlyNumbers, toUpper, toLower, emptyToNull, remove_left_zeros, completaInfoZerosEsquerda, trata_nsuhost_sitef
}