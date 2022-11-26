import cheerio from 'cheerio'

export function parse(html) {
  const $ = cheerio.load(html)

  let tableArray = []
  let rowspans = []

  $('tr').each(function (i, row) {
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
      let aux = j
      j = 0
      do {
        while (rowspans[j]) j++
        while (aux && !rowspans[j]) {
          j++
          aux--
        }
      } while (aux)

      const content = $cell.html().trim()

      rowArray.push(content)

      // Check rowspan
      const cellRowspan = $cell.attr('rowspan')
      const value = cellRowspan ? parseInt(cellRowspan, 10) - 1 : 0
      if (value > 0) nextrowspans[j] = { content, value }
    })

    rowspans = nextrowspans
    rowspans.forEach((rowspan, index) => {
      if (rowspan && rowspan.value === 0) rowspans[index] = null
    })

    tableArray.push(rowArray)
  })

  return tableArray
}

export default {
  parse
}
