# UtahSlim

This is the back-end for https://www.utahslim.com

## Summary

This is a Node.js app made with Express, knex, pg, and other familiar node packages. It lives on Heroku at https://secret-basin-57769.herokuapp.com/ along with it's PostgreSQL database.

Tech used: JavaScript, Node.JS, PostgreSQL, Heroku, VSCode, JSON, Git.

## Endpoints

### /api/users

This endpoint allows for POST requests only to register a new user. The body of the response is generated from user inputs on the front end.

### /api/auth/login

This endpoint takes a POST request and returns a JWT representing the existing user. This JWT is used for authorization middleware when sent as part of protected endpoint requests.

### /api/articles

This endpoint takes GET, and POST requests. The GET request requires no body and returns an array of article objects that contain information about the article and the user that generated the article. The POST request is protected and takes article information caputred by user forms in the front end and adds it to the datase.

### /api/articles/:article_id

This endpoint takes GET, PATCH, and DELETE requests. The GET request returns a single article and it's user information. The PATCH request is not accessable from the front-end, however it will update an article with new information. The DELETE request is also not accessable from the front-end, and will delete the article with that ID along with it's comments. PATCH and DELETE are considered admin endpoints.

### /api/articles/:article_id/comments

This endpoint takes GET requests only. The GET request will return a list of comments for the article along with their user information.

### /api/comments

This endpoint takes POST requests only, receives comment data from the body and relates it to an article. This endpoint is a protected endpoint.

### /api/comments/:comment_id

This endpoint takes DELETE requests only and deletes the comment with the comment id. It is not available from the front-end and is another admin only endpoint.

### /api/gigs

This endpoint takes GET and POST requests. GET requests return a list of all gig objects in the database with the most recent gigs at the top. POST is admin only and adds a new gig to the DB.

### /api/gigs/:gig_id

This endpoint takes PATCH and DELETE requests. PATCH requests update with the new gig reflecting the body of the request and the DELETE request deletes the gig. This is an admin endpoint.