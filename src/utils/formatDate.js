function formattedDate(isoString) {
   return new Date(isoString).toLocaleString()
}

export { formattedDate }
