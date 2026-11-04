# SENG2045 Assignment 3

Development follows [Django with JavaScript and Ajax](https://learning.oreilly.com/videos/django-with-javascript/9781801816199/) by Lukasz Makinia.

[Open the app](https://seng2045-a3.vercel.app/). Sign in at [/admin/](https://seng2045-a3.vercel.app/admin/) with a Django staff account, then open the home page.

The app supports posts, likes, photo uploads, a carousel, and profile updates. Comments on posts are the optional feature.

## Run locally

Use Python 3.12 and run these commands from the repository root in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe src/manage.py migrate
.\.venv\Scripts\python.exe src/manage.py createsuperuser
.\.venv\Scripts\python.exe src/manage.py runserver
```

Sign in at <http://127.0.0.1:8000/admin/>, then open <http://127.0.0.1:8000/>.

Django uses Supabase when `.env.local` contains the connection values and falls back to SQLite and local images when those values are absent.

## Hosting setup

Vercel runs Django, Supabase stores the database and images, and Django handles login.

1. Created a Supabase project and selected **Transaction pooler** under **Connect**, using its PostgreSQL URI on port `6543` because Vercel runs serverless functions.
2. Created a public Storage bucket named `media` and uploaded the default `avatar.png` image.
3. Generated S3 credentials so Django could upload photos and avatars to Supabase Storage.
4. Saved the connection values and Django secret key in `.env.local`, keeping the actual credentials out of Git and placeholders in `.env.example`.
5. Ran migrations to create the hosted tables and set up a Django admin account with its associated profile.

I enabled Row Level Security (RLS) and removed public Data API access to the Django tables because the app accesses them through Django's server connection.

## Vercel deployment

I completed most of the setup on the Vercel website by linking GitHub and importing the repository, selecting the repository root and **Django** framework, and adding the values from `.env.local` to the Production environment variables.

I also tried deploying manually through the terminal, so the commands below are included for deploying without switching back and forth to the website.

The successful terminal deployment used a temporary copy without Git metadata because Vercel rejected the commit author, so these commands were run from that copy:

```powershell
npm install --global vercel@latest
vercel login
vercel link --project seng2045-a3
vercel deploy --prod
```

- `.python-version` selects Python 3.12.
- `vercel.json` runs migrations during deployment.
- `.vercelignore` excludes credentials, local data, and generated files.
- `wsgi.py` lets Vercel import Django from `src`.

## References

- [Django on Vercel](https://vercel.com/docs/frameworks/full-stack/django)
- [Supabase PostgreSQL connections](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Supabase Storage S3 credentials](https://supabase.com/docs/guides/storage/s3/authentication)
