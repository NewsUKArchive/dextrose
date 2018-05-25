/* global describe it expect */
const nock = require('nock');
const githubCommentManager = require('./github-comment-manager');

const account = 'testAccountName';
const token = 'testKey';
const repository = 'testRepo';
const pullRequest = 1;

const noCommentsResponse = [
  {
    id: 1,
    user: {
      login: 'not test account name',
    },
  },
];

const mixedCommentsResponse = [
  {
    id: 1,
    body: 'Please find visual snapshots of your changed components here:',
    user: {
      login: 'not test account name',
    },
  },
  {
    id: 2,
    body: 'Please find visual snapshots of your changed components here:',
    user: {
      login: account,
    },
  },
  {
    id: 3,
    body: 'Please find visual snapshots of your changed components here:',
    user: {
      login: 'a different non test account name',
    },
  },
];

const multipleUserCommentsResponse = [
  {
    id: 1,
    body: 'Please find visual snapshots of your changed components here:',
    user: {
      login: account,
    },
  },
  {
    id: 2,
    body: 'Please find visual snapshots of your changed components here:',
    user: {
      login: account,
    },
  },
];

const sameUserCommentsResponse = [
  {
    id: 1,
    body: 'Please find visual snapshots of your changed components here:',
    user: {
      login: account,
    },
  },
  {
    id: 2,
    body: 'If you use Expo, view our components by scanning this qr code:',
    user: {
      login: account,
    },
  },
];

describe('deleteAllVisualSnapshotComments', () => {
  it('should delete multiple visual snapshot comments', async () => {
    nock('https://api.github.com')
      .get(`/repos/${account}/${repository}/issues/${pullRequest}/comments`)
      .reply(200, multipleUserCommentsResponse);

    nock('https://api.github.com')
      .delete(`/repos/${account}/${repository}/issues/comments/1`)
      .reply(200);
    nock('https://api.github.com')
      .delete(`/repos/${account}/${repository}/issues/comments/2`)
      .reply(200);

    const deletedCount = await githubCommentManager.deleteAllVisualSnapshotComments(
      account,
      token,
      pullRequest,
      repository,
    );

    expect(deletedCount).toEqual(2);
  });

  it('should not delete any comments', async () => {
    nock('https://api.github.com')
      .get(`/repos/${account}/${repository}/issues/${pullRequest}/comments`)
      .reply(200, noCommentsResponse);

    const deletedCount = await githubCommentManager.deleteAllVisualSnapshotComments(
      account,
      token,
      pullRequest,
      repository,
    );

    expect(deletedCount).toEqual(0);
  });

  it('should only delete comments from specific user', async () => {
    nock('https://api.github.com')
      .get(`/repos/${account}/${repository}/issues/${pullRequest}/comments`)
      .reply(200, mixedCommentsResponse);

    nock('https://api.github.com')
      .delete(`/repos/${account}/${repository}/issues/comments/2`)
      .reply(200);

    const deletedCount = await githubCommentManager.deleteAllVisualSnapshotComments(
      account,
      token,
      pullRequest,
      repository,
    );

    expect(deletedCount).toEqual(1);
  });

  it('should only delete visual snapshot comments', async () => {
    nock('https://api.github.com')
      .get(`/repos/${account}/${repository}/issues/${pullRequest}/comments`)
      .reply(200, sameUserCommentsResponse);

    nock('https://api.github.com')
      .delete(`/repos/${account}/${repository}/issues/comments/1`)
      .reply(200);

    const deletedCount = await githubCommentManager.deleteAllVisualSnapshotComments(
      account,
      token,
      pullRequest,
      repository,
    );

    expect(deletedCount).toEqual(1);
  });
});

describe('createNewVisualSnapshotComment', () => {
  it('should create a visual snapshot comment', async () => {
    nock('https://api.github.com')
      .post(
        `/repos/${account}/${repository}/issues/${pullRequest}/comments`,
        '{"body": "Please find visual snapshots of your changed components here: index.html"}',
      )
      .reply(200);

    const documentPath = 'index.html';
    const successful = await githubCommentManager
      .createNewVisualSnapshotComment(account, token, documentPath, pullRequest, repository)
      .then(() => true)
      .catch((error) => {
        console.log(error);
        return false;
      });

    expect(successful).toEqual(true);
  });
});
