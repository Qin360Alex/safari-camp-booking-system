# Safari Camp — Image files

Drop your photos here, then update paths in **`lib/images.ts`** (single source of truth).

## Folder layout

| Folder | Files to add | Shown on |
|--------|----------------|----------|
| `brand/` | `logo.png`, `og-image.jpg` | Nav, favicons (`pnpm brand:icons`), social previews |
| `home/` | `hero.jpg`, `why-choose-us.jpg`, `cta-background.jpg` (optional) | Landing page |
| `accommodations/` | `luxury-tent.jpg`, etc. | Home + Book |
| `experiences/` | `game-drive.webp`, `bush-walk.webp`, `night-safari.webp` | Home experiences |
| `auth/` | `welcome-panel.webp` | Sign-in / Sign-up |
| `bookings/` | `empty-state.webp`, `card-fallback.webp` | My Bookings |
| `book/` | `header-banner.webp` | Book page header |

Until a file exists, the site uses `/placeholder.svg` automatically.

## Quick workflow

1. Add your image under the folder above.
2. Set `recommendedSrc` in `lib/images.ts` to match the path (extension included).
3. Hard-refresh (`Ctrl+Shift+R`). The UI picks up `recommendedSrc` automatically.

Missing files show `/placeholder.svg` until the file exists.

## Logo & favicons

After updating `public/images/brand/logo.png`, run:

```bash
pnpm brand:icons
```

## Full slot reference

Every slot documents **where it appears**, **alt text**, and **creative guidance** in:

```
lib/images.ts
```

Search for `usedOn` and `guidance` in that file.
