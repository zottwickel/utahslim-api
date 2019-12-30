CREATE TABLE comments (
  comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  article_id UUID REFERENCES articles(article_id) ON DELETE CASCADE NOT NULL
);