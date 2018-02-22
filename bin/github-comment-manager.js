const request = require('request');

const existingComments = (accountName, accountKey, issueNumber) =>
  new Promise((resolve, reject) => {
    const auth = 'Basic ' + new Buffer(accountName + ':' + accountKey).toString('base64');
    const options = {
      url: `https://api.github.com/repos/newsuk/times-components/issues/${issueNumber}/comments`,
      headers: {
       Authorization: auth,
       'User-Agent': accountName
      }
    };

    request.get(options, (error, response, body) => {
      if (error) reject(error);
      const ids = JSON.parse(body)
        .filter(({ user }) => user.login === accountName)
        .map(({ id }) => id);
      
      resolve(ids);
    });
});

const deleteComment = (commentId, accountName, accountKey) =>
  new Promise((resolve, reject) => {
    const auth = 'Basic ' + new Buffer(accountName + ':' + accountKey).toString('base64');
    const deleteOptions = {
      url: `https://api.github.com/repos/newsuk/times-components/issues/comments/${commentId}`,
      headers: {
        Authorization: auth,
        'User-Agent': accountName
      }
    };

    request.delete(deleteOptions, (error) => {
      if (error) reject(error);
      resolve('deleted');
    });
  });

const deleteCommentsFromList = (commentsToDelete, accountName, accountKey) => {
  Promise.all(commentsToDelete
    .map((commentId) => deleteComment(commentId, accountName, accountKey)));
};

const postComment = (accountName, accountKey, documentPath, issueNumber) =>
  new Promise((resolve, reject) => {
    const auth = 'Basic ' + new Buffer(accountName + ':' + accountKey).toString('base64');
    const postCommentOptions = {
      url: `https://api.github.com/repos/newsuk/times-components/issues/${issueNumber}/comments`,
      headers: {
        Authorization: auth,
        'User-Agent': accountName
      },
      body: `{ "body": "Please find visual snapshots of your changed components here: ${documentPath} "}`
    };

    request.post(postCommentOptions, (error) => {
      if (error) reject(error);
      resolve('commented');
    });
});

const publishStories = async (accountName, accountKey, documentPath, issueNumber) => {
  const commentsToDelete = await existingComments(accountName, accountKey, issueNumber);
  await deleteCommentsFromList(commentsToDelete, accountName, accountKey);
  await postComment(accountName, accountKey, documentPath, issueNumber);
}

module.exports = {
  publishStories,
  existingComments
};
