/**
 * Generates favicon / app icon sizes from public/images/brand/logo.png
 * Run: pnpm brand:icons
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const source = path.join(root, 'public/images/brand/logo.png')
const outDir = path.join(root, 'public')

async function squareIcon(size, background, outName) {
  const logo = sharp(source)
  const meta = await logo.metadata()
  const maxSide = Math.max(meta.width ?? size, meta.height ?? size)
  const inner = Math.round(size * 0.82)

  const resized = await logo
    .resize(inner, inner, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: resized, gravity: 'centre' }])
    .png()
    .toFile(path.join(outDir, outName))

  console.log(`  ✓ ${outName} (${size}×${size})`)
}

async function main() {
  console.log('Generating brand icons from public/images/brand/logo.png …')
  await mkdir(outDir, { recursive: true })

  await squareIcon(32, { r: 250, g: 248, b: 243, alpha: 1 }, 'icon-light-32x32.png')
  await squareIcon(32, { r: 26, g: 20, b: 16, alpha: 1 }, 'icon-dark-32x32.png')
  await squareIcon(180, { r: 250, g: 248, b: 243, alpha: 1 }, 'apple-icon.png')
  await squareIcon(192, { r: 250, g: 248, b: 243, alpha: 1 }, 'icon-192.png')
  await squareIcon(512, { r: 250, g: 248, b: 243, alpha: 1 }, 'icon-512.png')

  // favicon.ico (32px)
  await sharp(path.join(outDir, 'icon-light-32x32.png'))
    .resize(32, 32)
    .toFile(path.join(outDir, 'favicon.ico'))

  console.log('  ✓ favicon.ico')
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
