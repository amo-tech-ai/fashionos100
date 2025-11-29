# Setup Instructions

## Fixing Current Errors

### 1. Install Dependencies

```bash
npm install
```

This will install Tailwind CSS, PostCSS, and Autoprefixer.

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual keys:

```env
# Supabase Configuration
# Get these from: https://app.supabase.com/project/_/settings/api
VITE_SUPABASE_URL=https://nvdlhrodvevgwdsneplk.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here

# Gemini API Key (for AI features)
# Get from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your-gemini-api-key-here
```

**Where to find Supabase keys:**
1. Go to https://app.supabase.com
2. Select your project
3. Go to Settings → API
4. Copy the "Project URL" → `VITE_SUPABASE_URL`
5. Copy the "anon public" key → `VITE_SUPABASE_ANON_KEY`

### 3. Restart Dev Server

After creating `.env`, restart your dev server:

```bash
npm run dev
```

## Issues Fixed

✅ **Tailwind CSS CDN removed** - Now using proper PostCSS build
✅ **Supabase placeholder key** - Better error messages, requires real key
✅ **Environment setup** - `.env.example` created for reference

## Remaining Steps

1. **Install dependencies**: `npm install`
2. **Create `.env` file** with your Supabase keys
3. **Restart dev server**: `npm run dev`

The WebSocket and 401 errors will be resolved once you add your real Supabase anon key to `.env`.

