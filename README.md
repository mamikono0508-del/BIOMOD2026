# aQtSOME — HOME + MEMBER full refresh

Upload these four files **into the root of your GitHub repository**:
- index.html (replaces old Home)
- member.html (replaces old Member)
- home.css (NEW; used only by index.html)
- member.css (replaces old Member CSS)

Keep `style.css`, `script.js`, `design.css`, `elsi.css`, `aqs-unify.css`, all other HTML files, and `assets/` unchanged.
The two new HTML pages load `style.css` first, then their **scoped** page CSS. Neither depends on `aqs-unify.css`.

The header and footer use `assets/logo.webp`. Without it, the brand falls back to the text "aQtSOME.".
Member portraits retain the original filenames in `assets/member/`. Sponsor logos retain the following paths:
- `assets/member/InaoptikaBanner2000600_1.jpg`
- `assets/member/image_9.png`
- `assets/member/image_10.png`

Main body typography is 18px desktop and 17px mobile, matching ELSI. Profile-card descriptions are 16px for fit and legibility; smaller on narrow phones. Headers and footers match the ELSI branding and keep all seven navigation items.

After committing, visit your GitHub Pages URL and hard-refresh (Ctrl+F5) if cached styles persist. If an image doesn't show, verify its exact filename/capitalization in GitHub.
