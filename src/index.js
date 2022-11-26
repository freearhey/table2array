import cheerio from 'cheerio'

export function parse(html) {
  const jsonResponse = []
  let suffix

  const $ = cheerio.load(html)

  let tableAsJson = []
  const alreadySeen = {}

  let trs = $('tr')

  let rowspans = []

  // Fetch each row
  trs.each(function (i, row) {
    const rowAsJson = []

    function setColumn(j, content) {
      rowAsJson.push(content)
    }

    // Add content from rowspans
    rowspans.forEach((rowspan, index) => {
      if (!rowspan) return

      setColumn(index, rowspan.content)

      rowspan.value--
    })
    const nextrowspans = [...rowspans]

    const cells = $(row).find('td,th')
    cells.each((j, cell) => {
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

      const cheerioCell = $(cell)
      const cheerioCellText = cheerioCell.text()
      const cheerioCellHtml = cheerioCell.html()
      const cheerioCellRowspan = cheerioCell.attr('rowspan')

      const content = cheerioCellHtml ? cheerioCellHtml.trim() : ''

      setColumn(j, content)

      // Check rowspan
      const value = cheerioCellRowspan ? parseInt(cheerioCellRowspan, 10) - 1 : 0
      if (value > 0) nextrowspans[j] = { content, value }
    })

    rowspans = nextrowspans
    rowspans.forEach((rowspan, index) => {
      if (rowspan && rowspan.value === 0) rowspans[index] = null
    })

    tableAsJson.push(rowAsJson)
  })

  return tableAsJson
}

export default {
  parse
}
