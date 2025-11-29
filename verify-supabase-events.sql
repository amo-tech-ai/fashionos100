-- Quick SQL to verify events in Supabase
-- Run this in Supabase SQL Editor

-- Check recent events
SELECT 
  id,
  title,
  slug,
  status,
  organizer_id,
  start_time,
  end_time,
  location,
  created_at
FROM events
ORDER BY created_at DESC
LIMIT 10;

-- Check ticket tiers for recent events
SELECT 
  tt.id,
  tt.event_id,
  e.title as event_title,
  tt.name as tier_name,
  tt.price,
  tt.quantity_total,
  tt.type
FROM ticket_tiers tt
JOIN events e ON e.id = tt.event_id
ORDER BY e.created_at DESC
LIMIT 20;

-- Check schedules for recent events
SELECT 
  es.id,
  es.event_id,
  e.title as event_title,
  es.title as schedule_item,
  es.start_time,
  es.end_time
FROM event_schedules es
JOIN events e ON e.id = es.event_id
ORDER BY e.created_at DESC
LIMIT 20;

-- Count events by status
SELECT 
  status,
  COUNT(*) as count
FROM events
GROUP BY status;


