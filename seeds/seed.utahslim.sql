BEGIN;

TRUNCATE
  articles,
  gigs
  RESTART IDENTITY CASCADE;

INSERT INTO articles (title, content)
VALUES
  ('Article 1', 'Some Content'),
  ('Article 2', 'Some Content'),
  ('Article 3', 'Some Content'),
  ('Article 4', 'Some Content');

INSERT INTO gigs (gig_title, description, location, price, gig_date)
VALUES
  ('Event 1', 'This is a placeholder event.', 'feldmans deli salt lake', 0, '2020-01-01T00:00:01Z'),
  ('Event 2', 'This is a placeholder event.', 'mestizo coffee salt lake', 0, '2020-01-01T00:00:01Z'),
  ('Event 3', 'This is a placeholder event.', 'zion national park', 0, '2020-01-01T00:00:01Z');

COMMIT;