CREATE TABLE gigs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description TEXT NOT NULL,
  gig_title TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC (5, 2),
  gig_date TIMESTAMP NOT NULL
);