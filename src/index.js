import cheerio from 'cheerio'

export function parse(html) {
  const $ = cheerio.load(html)

  let tableObject = {}

  const rows = $('tr').toArray()
  rows.forEach((row, rowIndex) => {
    let cellIndex = 0
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
          if (tableObject[rowIndex + n][cellIndex]) cellIndex++
          tableObject[rowIndex + n][cellIndex] = content
        }

        cellIndex++
      }
    })
  })

  const tableArray = Object.values(tableObject).map(obj => Object.values(obj))

  return tableArray
}

export default {
  parse
}
