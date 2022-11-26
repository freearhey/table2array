import cheerio from 'cheerio'

export function parse(html) {
  const $ = cheerio.load(html)

  let tableArray = []
  let nextRow = {}

  const rows = $('tr').toArray()
  rows.forEach((row, i) => {
    const rowArray = []

    const cells = $(row).find('td,th').toArray()
    cells.forEach((cell, j) => {
      const content = $(cell).text().trim()

      if (nextRow[j] && nextRow[j].rowspan > 0) {
        rowArray.push(nextRow[j].content)
        nextRow[j].rowspan--
      }

      rowArray.push(content)

      let colspan = $(cell).attr('colspan')
      colspan = colspan ? parseInt(colspan) - 1 : 0
      for (let k = 0; k < colspan; k++) {
        rowArray.push(content)
      }

      if (nextRow[j + 1] && nextRow[j + 1].rowspan > 0) {
        for (let n = 0; n < nextRow[j + 1].colspan; n++) {
          rowArray.push(nextRow[j + 1].content)
        }
      }

      let rowspan = $(cell).attr('rowspan')
      rowspan = rowspan ? parseInt(rowspan) - 1 : 0
      if (rowspan > 0) nextRow[j] = { content, rowspan, colspan: colspan + 1 }
    })

    tableArray.push(rowArray)
  })

  console.log(tableArray)

  return tableArray
}

export default {
  parse
}
