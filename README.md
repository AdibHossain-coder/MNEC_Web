# MIST Nuclear Engineering Society — Website

A React 19 + Tailwind CSS site for the MIST Nuclear Science & Engineering
student club, backed by Firebase (Auth + Firestore + Storage + Hosting).
Every section of the menu bar (Home, News, Panel, Alumni, Activities,
Resources, Gallery, About) is its own route, and there's a password-protected
`/admin` dashboard where executives can add/edit/delete content without
touching code.

The site works out of the box with placeholder ("demo mode") content even
before Firebase is connected — every page falls back to bundled dummy data
in `src/data/dummyData.js` if its Firestore collection doesn't exist yet or
is empty. Once you connect Firebase, real content takes over automatically.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL. You'll see the full site in demo mode (a
small amber banner marks any section using placeholder data), but the
admin dashboard and sign-in won't work until step 2 is done.

## 2. Connect your Firebase project

You said you already have a Firebase account, so:

1. Go to the [Firebase Console](https://console.firebase.google.com) →
   **Add project** (or reuse an existing one).
2. **Add a Web app** inside that project (the `</>` icon on the project
   overview page). Copy the `firebaseConfig` values it gives you.
3. Copy `.env.example` to `.env.local` and paste those values in:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
4. In the console, enable the three services this app uses:
   - **Authentication** → Sign-in method → enable **Email/Password**.
   - **Firestore Database** → Create database (start in production mode —
     the rules file below already locks it down correctly).
   - **Storage** → Get started (used for image uploads from `/admin`).
5. Restart `npm run dev`. The amber "demo mode" banners will disappear
   as soon as a collection has real data (see seeding, below).

### Create your first admin (executive) account

There's intentionally no public sign-up page — only someone with Firebase
Console access can create panel accounts, which keeps the dashboard secure.

Firebase Console → Authentication → Users → **Add user** → enter an email
and password for each executive who should have access. They can then sign
in at `/login`.

## 3. Firestore data model

Each menu section reads from its own top-level collection. Documents can
have any shape you like, but the admin forms and public pages expect these
fields:

| Collection          | Used by page(s)     | Key fields |
|----------------------|----------------------|------------|
| `news`               | Home, News, /news/:id | `title, excerpt, body, date, author, tag, cover` |
| `panel_executives`   | Panel                | `name, role, batch, photo` |
| `panel_advisors`     | Panel                | `name, role, dept, photo` |
| `alumni`              | Alumni               | `name, batch, role, current, photo` |
| `activities`          | Home, Activities      | `title, category, description, frequency, icon` |
| `resources`            | Resources             | `title, category, type, size, link` |
| `gallery`              | Home, Gallery          | `title, album, url` |

You never have to create these collections by hand — the first time an
executive clicks **Add new** in `/admin` and saves, Firestore creates the
collection automatically.

### Optional: seed starter content

If you'd rather start with the placeholder content already in Firestore
(so there's something to look at/edit immediately) instead of typing it
all in by hand:

```bash
# 1. Firebase Console → Project Settings → Service accounts →
#    "Generate new private key" → save the file as:
#    scripts/serviceAccountKey.json   (already git-ignored, never commit it)

# 2. Install the one extra package this script needs:
npm install firebase-admin --save-dev

# 3. Run it:
npm run seed
```

This pushes every dummy news post, panel member, alumnus, activity,
resource, and gallery photo into Firestore with `merge: true`, so it's
safe to re-run.

## 4. Deploy to Firebase Hosting

```bash
npm install -g firebase-tools   # once, if you don't have it
firebase login
firebase init                   # choose your existing project; when asked
                                 # about Hosting/Firestore/Storage config
                                 # files, keep the ones already in this repo
npm run build
firebase deploy
```

`firebase.json` is already set up to serve the built `dist/` folder with a
single-page-app rewrite (so routes like `/news/some-id` work on refresh).

**Important:** `.env.local` is never committed. Before you deploy from a
new machine or CI, make sure `.env.local` exists there with your real
Firebase config, since `npm run build` needs it to compile the app with
the right keys.

## 5. What's inside

```
src/
  components/     Navbar, Footer, PageHeader, ReactorCore (hero visual), etc.
  context/        AuthContext — wraps Firebase Authentication
  data/           dummyData.js — placeholder content + fallback data
  hooks/          useFirestoreCollection — live Firestore reads with fallback
  lib/firebase.js Firebase app initialization (reads .env.local)
  pages/          One file per menu section, plus NewsDetail, Login, 404
  pages/admin/    Password-protected dashboard + generic CRUD manager
firestore.rules   Public read, signed-in write
storage.rules     Public read, signed-in + image-only + 8MB cap write
scripts/seed.js   Optional one-time Firestore seeding script
```

### Design notes

The visual language leans into the subject matter rather than a generic
tech-startup look: a "containment" dark navy background, a Cherenkov-blue
accent, and a uranium-amber secondary accent for tags/warnings. The hero's
signature visual is a hexagonal fuel-rod lattice (the way real reactor fuel
assemblies are packed), not a stock illustration. Swap colors in
`tailwind.config.js` (the `containment`, `cherenkov`, `uranium`, `alloy`
palettes) if you'd like a different feel.

## 6. Things you'll likely want to replace

- **Logo / favicon** — currently a simple atom-orbit SVG at
  `public/favicon.svg` and inline in `Navbar.jsx`. Swap in the club's real
  logo.
- **Copy** — club mission/history/contact info lives in
  `src/data/dummyData.js` under `clubInfo`; edit directly or move it into
  Firestore later if you want it editable from `/admin` too.
- **Photos** — all photos are stock placeholders from Unsplash. Replace via
  `/admin` (with real uploads to Firebase Storage) once you're ready.

## Suggestions / open questions for you

A few things I made reasonable default choices on — flag any of these if
you'd like something different:

1. **Google/social sign-in for admins?** Currently email/password only,
   since panel turnover each year is easier to manage by just adding/
   removing users in the Firebase console. Happy to add Google sign-in too.
2. **Should "About" content (mission/history/contact) also be editable from
   `/admin`?** Right now it's a static file for simplicity; I can move it
   into a `settings` Firestore doc if you want it editable without a
   redeploy.
3. **Custom domain** — once you're happy with the Firebase Hosting default
   URL, Firebase Hosting → Add custom domain is a one-time step if the club
   has (or wants) its own domain.
