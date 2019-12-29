CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE NOT NULL
);