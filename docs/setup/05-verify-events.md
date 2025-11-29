# Verify Events in Supabase

## Quick Verification

### Option 1: Supabase Dashboard
1. Go to: https://app.supabase.com/project/nvdlhrodvevgwdsneplk/editor
2. Navigate to `events` table
3. Check for recently created events

### Option 2: Using Verification Script
```bash
node verify-events.js
```

This will:
- Connect to your Supabase database
- List the 10 most recent events
- Show ticket tiers and schedules
- Verify data was saved correctly

## What to Check

### Events Table
- ✅ `title` - Event name
- ✅ `slug` - URL-friendly identifier
- ✅ `status` - Should be 'published'
- ✅ `organizer_id` - User ID (or mock ID)
- ✅ `start_time` / `end_time` - Event dates
- ✅ `created_at` - When event was created

### Ticket Tiers Table
- ✅ `event_id` - Links to events table
- ✅ `name` - Ticket tier name
- ✅ `price` - Ticket price
- ✅ `quantity_total` - Available tickets

### Event Schedules Table
- ✅ `event_id` - Links to events table
- ✅ `title` - Schedule item name
- ✅ `start_time` - When it happens

## Troubleshooting

### No Events Found
**Possible Causes:**
1. Event submission failed (check console for errors)
2. RLS policies blocking access
3. Table doesn't exist

**Fix:**
- Check browser console for submission errors
- Verify RLS policies in Supabase
- Check table exists in database

### Events Found But Missing Data
**Possible Causes:**
1. Ticket/schedule inserts failed
2. Foreign key constraints
3. Data validation errors

**Fix:**
- Check console for specific error messages
- Verify table schemas match code expectations

---

**Status:** Ready to verify

