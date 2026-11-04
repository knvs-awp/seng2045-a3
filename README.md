# SENG2045 Assignment 3

Development follows [Django with JavaScript and Ajax](https://learning.oreilly.com/videos/django-with-javascript/9781801816199/) by Lukasz Makinia.

[Open the app](https://seng2045-a3.vercel.app/). Sign in at [/admin/](https://seng2045-a3.vercel.app/admin/) with a Django staff account, then open the home page.

The app supports posts, likes, photo uploads, a carousel, and profile updates.

## Optional additions

- Added comments on post Details pages, showing the author, creation time, and comment text, with a comment count.
- Added an avatar preview when choosing an image, which is uploaded only after clicking Save, and a link to the saved avatar that updates after saving.
- Improved mobile layouts, form spacing, carousel image sizing, and button colours, with a consistent width for Like and Unlike.

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

The app can run locally with SQLite and local images, or optionally connect to Supabase through `.env.local`. With the hosted connection values set, local commands use the same database and image storage as the deployed app, so changes affect its data too.

I used this optional connection to test the hosted services locally and create the deployed admin account. With `DATABASE_URL` pointing to the hosted database, the command was:

```powershell
.\.venv\Scripts\python.exe src/manage.py createsuperuser
```

The account was created in Supabase and could then sign in to the Vercel app's `/admin/` page without redeploying, because both the local app and Vercel used the same database. Once an admin exists, additional users can be created through Django admin.

## Hosting setup

Vercel runs Django, Supabase stores the database and images, and Django handles login.

### Supabase setup

1. Created a Supabase project and used its transaction-pooler connection URI on port `6543`.
2. Created a public `media` bucket, uploaded the default `avatar.png`, and generated S3 credentials for Django uploads.
3. Saved the database and storage connection values and Django secret key in `.env.local`, with placeholders in `.env.example` and real credentials excluded from Git.
4. Ran Django migrations to create the tables and created the first admin account against the hosted database.
5. Enabled Row Level Security (RLS) and removed public Data API access to the Django tables, because the app uses Django's server connection.

### Vercel deployment

I completed most of the setup on the Vercel website:

1. Linked GitHub and imported the repository.
2. Selected the Django framework and kept the root directory at the repository root.
3. Copied the values from `.env.local` into the project's production environment variables.
4. Deployed the app, with migrations run through `vercel.json` and static files collected by Vercel.

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
