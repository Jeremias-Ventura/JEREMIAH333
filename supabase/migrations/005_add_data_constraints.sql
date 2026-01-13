-- Add CHECK constraints to enforce data integrity at database level

-- Constraint on focus_sessions.duration_minutes
-- Ensure sessions are between 1 and 240 minutes (4 hours max)
ALTER TABLE focus_sessions
ADD CONSTRAINT duration_minutes_check
CHECK (duration_minutes > 0 AND duration_minutes <= 240);

-- Constraint on user_settings.default_timer_minutes (if exists)
-- Note: Only add if user_settings table has default_timer_minutes column
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_settings'
    AND column_name = 'default_timer_minutes'
  ) THEN
    ALTER TABLE user_settings
    ADD CONSTRAINT default_timer_check
    CHECK (default_timer_minutes > 0 AND default_timer_minutes <= 240);
  END IF;
END $$;

-- Constraint on user_settings.theme_preference (if exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_settings'
    AND column_name = 'theme_preference'
  ) THEN
    ALTER TABLE user_settings
    ADD CONSTRAINT theme_preference_check
    CHECK (theme_preference IN ('light', 'dark', 'system') OR theme_preference IS NULL);
  END IF;
END $$;
