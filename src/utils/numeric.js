export default function formatNumber (number) {
  if (number === 0 || number === '' || number === '0') {
    return 0
  } else if (number) {
    if (number < 0) {
      number = number * (-1)

      let str = number.toString()
      if (str.startsWith('0')) {
        str = str.replace('0', '')
      }
      return '-' + converse_number(str)
    }

    let str = number.toString()
    if (str.startsWith('0')) {
      str = str.replace('0', '')
    }
    return converse_number(str)
  } else {
    return ''
  }
}

function converse_number (str_number) {
  let new_str = ''
  let i
  let index = 0

  for (i = str_number.length - 1; i >= 0; i--) {
    if (index % 3 === 0 && index !== 0) {
      new_str = ',' + new_str
    }
    new_str = str_number[i] + new_str
    index += 1
  }

  return new_str
}
