const request = require('request');

const existingComments = (accountName, accountKey, issueNumber) => new Promise((resolve, reject) => {

    const commentsToDelete = [];
    const auth = 'Basic ' + new Buffer(accountName + ':' + accountKey).toString('base64');
    const options = {
      url: `https://api.github.com/repos/newsuk/times-components/issues/${issueNumber}/comments`,
      headers: {
       'Authorization': auth,
       'User-Agent': accountName
      }
    };

    request.get(options, function(error, response, body) {
        if (error) reject(error);
        JSON.parse(body).forEach((comment) => {
          if(comment.user.login === accountName) {
            commentsToDelete.push(comment.id);
          }
        })
        resolve(commentsToDelete);
      });
});

const deleteComments = (commentsToDelete, accountName, accountKey) => new Promise((resolve, reject) => {
  commentsToDelete.forEach((commentId) => {
    const auth = 'Basic ' + new Buffer(accountName + ':' + accountKey).toString('base64');
    const deleteOptions = {
      url: `https://api.github.com/repos/newsuk/times-components/issues/comments/${commentId}`,
      headers: {
        'Authorization': auth,
        'User-Agent': accountName
      }
    };

    request.delete(deleteOptions, function(error, response, body) {
      if (error) reject(error);
      resolve('deleted');
    })
  });
});

const postComment = (accountName, accountKey, documentPath, issueNumber) => new Promise((resolve, reject) => {
    const auth = 'Basic ' + new Buffer(accountName + ':' + accountKey).toString('base64');
    const postCommentOptions = {
      url: `https://api.github.com/repos/newsuk/times-components/issues/${issueNumber}/comments`,
      headers: {
        'Authorization': auth,
        'User-Agent': accountName
      },
      body: `{ "body": "Please find visual snapshots of your changed components here: ${documentPath} "}`
    };

    request.post(postCommentOptions, function(error, response, body) {
        if (error) reject(error);
        resolve('commented');
    });
});

module.exports = async (accountName, accountKey, documentPath, issueNumber) => {
  const commentsToDelete = await existingComments(accountName, accountKey, issueNumber);
  await deleteComments(commentsToDelete, accountName, accountKey);
  await postComment(accountName, accountKey, documentPath, issueNumber);
};
