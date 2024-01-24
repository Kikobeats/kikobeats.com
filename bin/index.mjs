import { spawn } from 'child_process'

const [command, type, ...args] = process.argv.slice(2)

const __dirname = new URL('.', import.meta.url).pathname.replace(/\/$/, '')
const filepath = `${__dirname}/${command}/${type}.mjs`

spawn('node', [filepath, ...args], { stdio: 'inherit' })
