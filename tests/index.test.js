import parser from '../src'
import path from 'path'
import fs from 'fs'

it('parse base table', async () => {
  const input = content('tests/__data__/input/base.html')
  const { default: expected } = await import('./__data__/expected/base.js')

  expect(parser.parse(input)).toEqual(expected)
})

function content(filepath) {
  return fs.readFileSync(path.resolve(filepath), {
    encoding: 'utf8'
  })
}
