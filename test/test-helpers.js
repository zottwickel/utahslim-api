function makeUsersArray() {
  return [
    {
      id: '955f6c01-a9f6-44bb-a7fd-75d1933f922e',
      user_name: 'user1',
      full_name: 'User One',
      email: 'userone@test.com',
      password: 'password',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString()
    },
    {
      id: '8c8383c4-dba7-401e-ab71-b5889354b8ef',
      user_name: 'user2',
      full_name: 'User Two',
      email: 'usertwo@test.com',
      password: 'password',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString()
    },
    {
      id: 'acb04dd9-425d-465e-b802-fee33ebe3459',
      user_name: 'user3',
      full_name: 'User Three',
      email: 'userthree@test.com',
      password: 'password',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString()
    },
    {
      id: 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132',
      user_name: 'user4',
      full_name: 'User Four',
      email: 'userfour@test.com',
      password: 'password',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString()
    },
  ]
}
function makeArticlesArray() {
  return [
    {
      id: 'a3e47496-5f5d-4ecd-9d0b-222c464199ba',
      title: 'Article 1',
      content: 'Some Content',
      user_id: '955f6c01-a9f6-44bb-a7fd-75d1933f922e',
      date_modified: new Date().toISOString(),
    },
    {
      id: '8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece',
      title: 'Article 2',
      content: 'Some Content',
      user_id: '8c8383c4-dba7-401e-ab71-b5889354b8ef',
      date_modified: new Date().toISOString(),
    },
    {
      id: '4cd62db9-63b9-42f1-b6ba-c7bbbd4c9451',
      title: 'Article 3',
      content: 'Some Content',
      user_id: 'acb04dd9-425d-465e-b802-fee33ebe3459',
      date_modified: new Date().toISOString(),
    },
    {
      id: '2ab0c059-4f84-4dc4-85d9-4d0ca037200f',
      title: 'Article 4',
      content: 'Some Content',
      user_id: 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132',
      date_modified: new Date().toISOString(),
    },
  ]
}

function makeCommentsArray() {
  return [
    {
      id: '6e72abfc-5128-48fa-b51b-d09b5bdf9051',
      text: 'This is a test comment',
      user_id: '955f6c01-a9f6-44bb-a7fd-75d1933f922e',
      article_id: 'a3e47496-5f5d-4ecd-9d0b-222c464199ba',
    },
    {
      id: 'a4e5efb0-6ae6-446c-a926-172f1e0b1ecc',
      text: 'This is a test comment',
      user_id: '955f6c01-a9f6-44bb-a7fd-75d1933f922e',
      article_id: '8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece',
    },
    {
      id: '0d1184dc-a17c-427a-bf5b-a4b276235663',
      text: 'This is a test comment',
      user_id: '955f6c01-a9f6-44bb-a7fd-75d1933f922e',
      article_id: '2ab0c059-4f84-4dc4-85d9-4d0ca037200f',
    },
    {
      id: '4ac95474-dca0-4cb9-bc0c-802150926b28',
      text: 'This is a test comment',
      user_id: '8c8383c4-dba7-401e-ab71-b5889354b8ef',
      article_id: '4cd62db9-63b9-42f1-b6ba-c7bbbd4c9451',
    },
    {
      id: 'c02ce608-8748-42a8-95fb-f5ab20400f45',
      text: 'This is a test comment',
      user_id: '8c8383c4-dba7-401e-ab71-b5889354b8ef',
      article_id: 'a3e47496-5f5d-4ecd-9d0b-222c464199ba',
    },
    {
      id: 'a14eb89c-ef4d-43c1-94af-0979d7d64447',
      text: 'This is a test comment',
      user_id: 'acb04dd9-425d-465e-b802-fee33ebe3459',
      article_id: '8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece',
    },
    {
      id: '1a6ef272-23e8-42a5-bb17-4d48e1404e0a',
      text: 'This is a test comment',
      user_id: 'acb04dd9-425d-465e-b802-fee33ebe3459',
      article_id: 'a3e47496-5f5d-4ecd-9d0b-222c464199ba',
    },
    {
      id: '2f9d9b21-a408-42f9-952a-3d69b23c3c24',
      text: 'This is a test comment',
      user_id: 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132',
      article_id: '4cd62db9-63b9-42f1-b6ba-c7bbbd4c9451',
    },
    {
      id: '45106986-43a9-4dc7-9d24-50d18fdfe3f5',
      text: 'This is a test comment',
      user_id: 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132',
      article_id: '2ab0c059-4f84-4dc4-85d9-4d0ca037200f',
    },
    {
      id: '850ad533-9e17-4907-ab36-76529b010bd5',
      text: 'This is a test comment',
      user_id: 'a8b1dba0-a39b-4f06-914e-c5fcd3ddc132',
      article_id: '8216a9bf-c45c-4ac7-9ff4-7c8c9e82cece',
    },
  ]
}

function makeGigsArray() {
  return [
    {
      id: '168444f2-27ce-4826-bc9d-c07792ca971a',
      gig_title: 'Test Event 1',
      description: 'This is a test event.',
      location: 'salt lake city',
      price: '0.00',
      gig_date: new Date().toISOString()
    },
    {
      id: '0203325f-ed38-48e7-8bc4-3e1e90629515',
      gig_title: 'Test Event 2',
      description: 'This is a test event.',
      location: 'salt lake city',
      price: '0.00',
      gig_date: new Date().toISOString()
    },
    {
      id: '37b4a5c4-4e35-4f01-a0dc-d741a35f5bd3',
      gig_title: 'Test Event 3',
      description: 'This is a test event.',
      location: 'salt lake city',
      price: '0.00',
      gig_date: new Date().toISOString()
    },
    {
      id: '07f4ba25-195c-4272-908a-11918f81316b',
      gig_title: 'Test Event 4',
      description: 'This is a test event.',
      location: 'salt lake city',
      price: '0.00',
      gig_date: new Date().toISOString()
    },
  ]
}

function seedTestDatabase(db, users, articles, comments) {
  return db
    .into('users')
    .insert(users)
    .then(() => 
      db
        .into('articles')
        .insert(articles)
    )
    .then(() =>
      db
        .into('comments')
        .insert(comments)
    )
}

function seedGigs(db, gigs) {
  return db
    .into('gigs')
    .insert(gigs)
}

function truncateTables(db) {
  return db.raw(
    `TRUNCATE
      articles,
      gigs,
      users,
      comments`
  )
}

function makeExpectedArticle(users, article, comments=[]) {
  const user = users.find(user => user.id === article.user_id)
  const articleComments = comments.filter(comment => comment.article_id === article.id)

  const number_of_comments = articleComments.length
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    date_modified: article.date_modified,
    number_of_comments,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      email: user.email,
      date_created: user.date_created,
      date_modified: user.date_modified
    }
  }
}

function makeExpectedComments(users, articleId, comments) {
  const expectedComments = comments.filter(comment => comment.article_id == articleId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      text: comment.text,
      date_created: comment.date_created,
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        full_name: commentUser.full_name,
        email: commentUser.email,
        date_created: commentUser.date_created,
      }
    }
  })
}

module.exports = {
  makeUsersArray,
  makeArticlesArray,
  makeCommentsArray,
  makeGigsArray,
  makeExpectedArticle,
  makeExpectedComments,
  seedTestDatabase,
  seedGigs,
  truncateTables,
}