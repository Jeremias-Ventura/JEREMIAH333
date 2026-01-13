-- Explicitly deny UPDATE operations on focus_sessions
-- Even though RLS denies by default, this makes it explicit and auditable
CREATE POLICY "Users cannot update their sessions"
  ON focus_sessions
  FOR UPDATE
  USING (false)  -- Always deny, regardless of user
  WITH CHECK (false);  -- Also deny the new values, for completeness

-- Explicitly deny DELETE operations on focus_sessions
CREATE POLICY "Users cannot delete their sessions"
  ON focus_sessions
  FOR DELETE
  USING (false);  -- Always deny, regardless of user

