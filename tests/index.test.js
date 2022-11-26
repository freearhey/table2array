import table2array from '../src'
import path from 'path'
import fs from 'fs'

it('parse base table', async () => {
  const input = content('tests/__data__/input/base.html')
  const { default: expected } = await import('./__data__/expected/base.js')

  expect(table2array(input)).toEqual(expected)
})

it('parse table with colspan', async () => {
  const input = content('tests/__data__/input/colspan.html')
  const { default: expected } = await import('./__data__/expected/colspan.js')

  expect(table2array(input)).toEqual(expected)
})

it('parse table with rowspan', async () => {
  const input = content('tests/__data__/input/rowspan.html')
  const { default: expected } = await import('./__data__/expected/rowspan.js')

  expect(table2array(input)).toEqual(expected)
})

it('parse complex table', async () => {
  const input = content('tests/__data__/input/complex.html')
  const { default: expected } = await import('./__data__/expected/complex.js')

  expect(table2array(input)).toEqual(expected)
})

it('parse full schedule', async () => {
  const input = content('tests/__data__/input/schedule.html')
  const { default: expected } = await import('./__data__/expected/schedule.js')

  expect(table2array(input)).toEqual(expected)
})

function content(filepath) {
  return fs.readFileSync(path.resolve(filepath), {
    encoding: 'utf8'
  })
}
