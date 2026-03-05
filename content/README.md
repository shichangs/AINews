# Content Source

CI auto publishing reads markdown from this directory.

- Daily reports: `content/daily-ai-news/*.md`
- Weekly reports (optional): `content/daily-ai-news/weekly/*.md`
- Portfolio reports: `content/portfolio-news/*.md`

After pushing markdown updates to `main`, GitHub Actions will regenerate:

- `data/site-data.json`

and commit it automatically.
