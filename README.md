# researchx

A quiet, animated reading collection by Pratham Mishra.

**[Open researchx](https://iprathammishra.github.io/researchx/)**

Scroll or swipe naturally; use arrow keys to move between articles. Click any full title to open its original paper or article in a new tab. Search and optional dry scroll ticks sit behind two small controls. No generated article pages, previews, counters, home sections, or browser inbox.

**[Read finx](https://iprathammishra.github.io/researchx/finx/)** — the AI × finance guide, articles, preparation library, and CFA planner. Its source lives in `finx/` and ships with the collection. The finx link beside search opens the guide; each guide page links back to researchx.

## Add a source

Drop a PDF or a text file of URLs into `inbox/`, then ask Codex to verify its original title, author, canonical public source URL, and one concise description. Each source gets a dedicated research pass. Add its metadata to `content/`; the collection updates on build. For a local PDF, establish its original public link before adding it to this public site.

## Run locally

Node 22+ and Python 3. No dependencies or installation required.

```sh
npm test
npm run build
npm run check
npm run preview
```

Open `http://localhost:8000`. Generated files are in ignored `_site/`. `browse.html` is an alias of the same collection for existing preview links. The reading collection is published at the root; the finance guide is published at `/finx/`.

The default sound is an original 22 ms dry noise tick, synthesized locally. Sound is optional, requires browser activation, and stays muted when disabled. Only scroll-driven article focus changes make sound; hover, search and links stay silent. Scroll position continuously controls gentle scale and opacity changes. Native scrolling preserves platform momentum and remains interruptible; keyboard navigation centres each source smoothly. Reduced-motion settings disable transforms and animated scrolling.

GitHub Actions checks and publishes `master`. Local commit identity: Pratham Mishra / mishrapratham.codeit@gmail.com. Origin: `https://github.com/iprathammishra/researchx.git`.
