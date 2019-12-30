BEGIN;

TRUNCATE
  articles,
  gigs,
  users,
  comments;

INSERT INTO users (user_id, user_name, full_name, email, password)
VALUES
  ('955f6c01-a9f6-44bb-a7fd-75d1933f922e', 'user1', 'User One', 'userone@test.com', '$2a$12$YO.9oRT5vD76vu3aiygPm.NZm88anyulFqvSlVQWwk2Zye1lDQGxi'),
  ('8c8383c4-dba7-401e-ab71-b5889354b8ef', 'user2', 'User Two', 'usertwo@test.com', '$2a$12$YO.9oRT5vD76vu3aiygPm.NZm88anyulFqvSlVQWwk2Zye1lDQGxi'),
  ('acb04dd9-425d-465e-b802-fee33ebe3459', 'user3', 'User Three', 'userthree@test.com', '$2a$12$YO.9oRT5vD76vu3aiygPm.NZm88anyulFqvSlVQWwk2Zye1lDQGxi'),
  ('a8b1dba0-a39b-4f06-914e-c5fcd3ddc132', 'user4', 'User Four', 'userfour@test.com', '$2a$12$YO.9oRT5vD76vu3aiygPm.NZm88anyulFqvSlVQWwk2Zye1lDQGxi');

INSERT INTO articles (article_id, title, content, user_id)
VALUES
  ('a3e47496-5f5d-4ecd-9d0b-222c464199ba', 'Article 1', 'Some Content', '955f6c01-a9f6-44bb-a7fd-75d1933f922e'),
  ('8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece', 'Article 2', 'Some Content', '8c8383c4-dba7-401e-ab71-b5889354b8ef'),
  ('4cd62db9-63b9-42f1-b6ba-c7bbbd4c9451', 'Article 3', 'Some Content', 'acb04dd9-425d-465e-b802-fee33ebe3459'),
  ('2ab0c059-4f84-4dc4-85d9-4d0ca037200f', 'Article 4', 'Some Content', 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132');

INSERT INTO gigs (gig_title, description, location, price, gig_date)
VALUES
  ('Event 1', 'This is a placeholder event.', 'feldmans deli salt lake', 0, '2020-01-01T00:00:01Z'),
  ('Event 2', 'This is a placeholder event.', 'mestizo coffee salt lake', 0, '2020-01-01T00:00:01Z'),
  ('Event 3', 'This is a placeholder event.', 'zion national park', 0, '2020-01-01T00:00:01Z');

INSERT INTO comments (text, user_id, article_id)
VALUES
  ('This is a placeholder comment.', '955f6c01-a9f6-44bb-a7fd-75d1933f922e', 'a3e47496-5f5d-4ecd-9d0b-222c464199ba'),
  ('This is a placeholder comment.', '955f6c01-a9f6-44bb-a7fd-75d1933f922e', '8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece'),
  ('This is a placeholder comment.', '955f6c01-a9f6-44bb-a7fd-75d1933f922e', '2ab0c059-4f84-4dc4-85d9-4d0ca037200f'),
  ('This is a placeholder comment.', '8c8383c4-dba7-401e-ab71-b5889354b8ef', '4cd62db9-63b9-42f1-b6ba-c7bbbd4c9451'),
  ('This is a placeholder comment.', '8c8383c4-dba7-401e-ab71-b5889354b8ef', 'a3e47496-5f5d-4ecd-9d0b-222c464199ba'),
  ('This is a placeholder comment.', 'acb04dd9-425d-465e-b802-fee33ebe3459', '8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece'),
  ('This is a placeholder comment.', 'acb04dd9-425d-465e-b802-fee33ebe3459', 'a3e47496-5f5d-4ecd-9d0b-222c464199ba'),
  ('This is a placeholder comment.', 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132', '4cd62db9-63b9-42f1-b6ba-c7bbbd4c9451'),
  ('This is a placeholder comment.', 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132', '2ab0c059-4f84-4dc4-85d9-4d0ca037200f'),
  ('This is a placeholder comment.', 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132', '8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece');

COMMIT;