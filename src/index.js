const cheerio = require('cheerio')

module.exports = function table2array(html) {
  const $ = cheerio.load(html)

  let tableObject = {}

  const rows = $('tr').toArray()
  rows.forEach((row, rowIndex) => {
    let colIndex = 0
    const cells = $(row).find('td,th').toArray()
    cells.forEach(cell => {
      const content = $(cell).text().trim()
      let rowspan = $(cell).attr('rowspan')
      rowspan = rowspan ? parseInt(rowspan) : 1
      let colspan = $(cell).attr('colspan')
      colspan = colspan ? parseInt(colspan) : 1

      for (let k = 0; k < colspan; k++) {
        for (let n = 0; n < rowspan; n++) {
          if (!tableObject[rowIndex + n]) tableObject[rowIndex + n] = {}
          while (tableObject[rowIndex + n][colIndex]) colIndex++

          tableObject[rowIndex + n][colIndex] = content
        }

        colIndex++
      }
    })
  })

  return Object.values(tableObject).map(obj => Object.values(obj))
}
