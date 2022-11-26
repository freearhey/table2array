import cheerio from 'cheerio'

export function parse(html) {
  const $ = cheerio.load(html)

  let tableArray = []
  let rowspans = []

  const rows = $('tr')
  rows.each((i, row) => {
    const rowArray = []

    // Add content from rowspans
    rowspans.forEach((rowspan, index) => {
      if (!rowspan) return

      rowArray.push(rowspan.content)

      for (let y = 0; y < rowspan.colspan; y++) {
        rowArray.push(rowspan.content)
      }

      rowspan.rowspan--
    })
    const nextrowspans = [...rowspans]

    const cells = $(row).find('td,th')
    cells.each((j, cell) => {
      const $cell = $(cell)

      // Apply rowspans offsets
      let kbuf = j
      let k = 0
      do {
        while (rowspans[k]) k++
        while (kbuf && !rowspans[k]) {
          k++
          kbuf--
        }
      } while (kbuf)

      const content = $cell.text().trim()
      rowArray.push(content)

      // Check colspan
      let cellColspan = $cell.attr('colspan')
      cellColspan = cellColspan ? parseInt(cellColspan, 10) - 1 : 0
      for (let x = 0; x < cellColspan; x++) {
        rowArray.push(content)
      }

      // Check rowspan
      let cellRowspan = $cell.attr('rowspan')
      cellRowspan = cellRowspan ? parseInt(cellRowspan, 10) - 1 : 0
      if (cellRowspan > 0) nextrowspans[j] = { content, rowspan: cellRowspan, colspan: cellColspan }
    })

    rowspans = nextrowspans
    rowspans.forEach((rowspan, index) => {
      if (rowspan && rowspan.rowspan === 0) rowspans[index] = null
    })

    tableArray.push(rowArray)
  })

  console.log(tableArray)

  return tableArray
}

export default {
  parse
}
