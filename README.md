# researchx

A personal reading room by Pratham Mishra. Research papers and articles become clear takeaways, credited source figures, and small interactive explanations.

**[Open researchx](https://iprathammishra.github.io/researchx/)** · **[Turn through the reading dial](https://iprathammishra.github.io/researchx/browse.html)**

Five initial sources: AgentDojo, CaMeL, normalization of deviance in AI, the lethal trifecta, and the SEC financial-statement guide. Each had a dedicated research subagent. Source versions, limits, short exact quotations, and figure credits sit beside the explanation.

## Add your next paper

Put PDFs or a text file of URLs in `inbox/`, then ask Codex:

> Process pm/researchx/inbox/. Spawn a research subagent for each source, create sourced takeaways and an interactive visual explanation, then publish the checked site to GitHub Pages. Follow AGENTS.md.

The website's **Add a source** page also stores links and PDFs locally in your browser. Export the JSON manifest and attach PDF files separately when asking Codex. Browser collection does not run AI or commit files to GitHub.

## Run locally

Node 22+ and Python 3; no npm dependencies or installation required.

```sh
npm test
npm run build
npm run check
npm run preview
```

Open `http://localhost:8000`. Generated pages live in ignored `_site/`. The dial supports wheel, swipe, title selection, arrow keys, Home/End, and explicit previous/next buttons. Reduced-motion settings suppress animation.

## Structure

- `content/*.json`: sourced explanations and interaction data.
- `assets/sources/`: selected original figures; see [SOURCES.md](SOURCES.md).
- `app.js`, `style.css`: reading experience and browser-local source inbox.
- `scripts/build.mjs`: escapes content and generates static pages.
- `scripts/models.mjs`: inspectable logic behind teaching examples.
- `.github/workflows/pages.yml`: checks and publishes `master` to GitHub Pages.

All links and assets use paths compatible with `/researchx/`. Save/read markers use localStorage; PDFs and source metadata use IndexedDB. No backend, credentials, analytics, external fonts, or runtime dependencies.

The Git remote stays `https://github.com/iprathammishra/researchx.git`; the local branch is `master`. Commit identity is Pratham Mishra / mishrapratham.codeit@gmail.com.

The reading dial also has optional, locally synthesized tactile ticks. Sound starts only after enabling the visible control and a browser-authorized gesture. It can be muted at any time; no audio files or reference-site sound assets are downloaded.
