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

      rowspan.value--
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

      const content = $cell.html().trim()
      rowArray.push(content)

      // Check rowspan
      let cellRowspan = $cell.attr('rowspan')
      cellRowspan = cellRowspan ? parseInt(cellRowspan, 10) - 1 : 0
      if (cellRowspan > 0) nextrowspans[j] = { content, value: cellRowspan }

      // Check colspan
      let cellColspan = $cell.attr('colspan')
      cellColspan = cellColspan ? parseInt(cellColspan, 10) - 1 : 0
      for (let x = 0; x < cellColspan; x++) {
        rowArray.push(content)
      }
    })

    rowspans = nextrowspans
    rowspans.forEach((rowspan, index) => {
      if (rowspan && rowspan.value === 0) rowspans[index] = null
    })

    // console.log(rowspans)

    tableArray.push(rowArray)
  })

  return tableArray
}

export default {
  parse
}
