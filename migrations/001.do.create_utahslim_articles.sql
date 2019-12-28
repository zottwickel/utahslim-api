CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date_modified TIMESTAMP NOT NULL DEFAULT now()
);