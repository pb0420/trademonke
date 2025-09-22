/*
  # Add increment view count function

  1. Functions
    - `increment_view_count` - Safely increment post view count
*/

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET view_count = view_count + 1,
      updated_at = now()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_view_count(uuid) TO authenticated;