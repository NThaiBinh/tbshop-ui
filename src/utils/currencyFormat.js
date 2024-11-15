function currencyFormat(currency = '') {
   let strArr = currency.toString().split('')
   if (strArr.length >= 5) {
      let tmp = 0
      for (let i = strArr.length; i >= 2; i--) {
         tmp++
         if (tmp === 3) {
            strArr.splice(i - 1, 0, '.')
            tmp = 0
         }
      }
      return strArr.join('')
   }
   return currency
}

export default currencyFormat
