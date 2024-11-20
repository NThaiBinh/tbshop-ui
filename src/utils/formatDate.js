function dateTimeFormat(isoTime) {
   const isoDate = new Date(isoTime)
   isoDate.setHours(isoDate.getHours() - 7)
   return isoDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
}

function dateFormat(isoTime) {
   const isoDate = new Date(isoTime)
   isoDate.setHours(isoDate.getHours() - 7)
   return isoDate.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
}

export { dateTimeFormat, dateFormat }
