import react from '@vitejs/plugin-react'
import createAutoImport from './auto-import'

export function createVitePlugins(Env, isBuild = false) {
  console.log('Env:', Env)
  const vitePlugins = [
    react({ babel: { plugins: [['babel-plugin-react-compiler']] } }),
  ]
  vitePlugins.push(createAutoImport())
  return vitePlugins
}
