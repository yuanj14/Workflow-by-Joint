import autoImport from 'unplugin-auto-import/vite'

export default function () {
  return autoImport({
    imports: ['react', 'react-router'],
    dts: 'src/typings/auto-imports.d.ts',
  })
}
