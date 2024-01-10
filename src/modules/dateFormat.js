/**
 * @param {Date} day
 * @returns {string} 
 */
const dateFormatWithStartYear = (day) => {
  const month = day.getMonth() + 1
  const year = day.getFullYear()
  const date = day.getDate() + 1
  return `${year}-${month}-${date}`
}

export default dateFormatWithStartYear
