import { read, remove, create } from 'github-comment-manager';

const filterVisualSnapshotComments = (comments, account) =>
  JSON.parse(comments)
    .filter(({ user }) => user.login === account)
    .filter(({ body }) =>
      body.includes('Please find visual snapshots of your changed components here'))
    .map(({ id }) => id);

const getVisualSnapshotComments = (account, token, pullRequest, repository) =>
  read
    .comments({
      account,
      token,
      pullRequest,
      repository,
    })
    .then(comments => filterVisualSnapshotComments(comments, account));

const deleteComment = (commentId, account, token, repository) =>
  remove.comment({
    account,
    token,
    repository,
    commentId,
  });

const deleteCommentsFromList = (comments, account, token, repository) =>
  Promise.all(comments.map(commentId => deleteComment(commentId, account, token, repository))).then(() => comments.length);

const deleteAllVisualSnapshotComments = async (account, token, pullRequest, repository) => {
  const comments = await getVisualSnapshotComments(account, token, pullRequest, repository);
  return deleteCommentsFromList(comments, account, token, repository);
};

const createNewVisualSnapshotComment = (account, token, documentPath, pullRequest, repository) =>
  create.comment({
    account,
    token,
    repository,
    comment: `Please find visual snapshots of your changed components here: ${documentPath}`,
    pullRequest,
  });

module.exports = {
  deleteAllVisualSnapshotComments,
  createNewVisualSnapshotComment,
};
