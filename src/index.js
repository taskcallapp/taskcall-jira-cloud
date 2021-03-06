import Resolver from '@forge/resolver';
import * as VarNames from '../src/VarNames';
import axios from 'axios';
import api, { requestJira, route } from '@forge/api';

export const BASE_URL = `https://jsonplaceholder.typicode.com/`;
const API = axios.create({ baseURL: BASE_URL });

const resolver = new Resolver();

resolver.define('getText', (req) => {
  const issueId = req.context.extension.issue.key;
  var data = {
    "incident_title": "Test incident 5",
    "status": "Open",
    "toShowActionOptions": true,
    "issueId": issueId
  }
  return data;
});

resolver.define('getIssue', async (req) => {
  try {
    const issueId = req.context.extension.issue.key;
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/api/3/issue/${issueId}?fields=summary,description`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
});

// this resolver helps update summary and description by taking in updated summary and description as payload
// https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-issue-issueidorkey-put

resolver.define('updateIssue', async (req) => {
  try {
    const { summary, description } = req.payload;

    const issueId = req.context.extension.issue.key;
    const response = await api
      .asApp()
      .requestJira(route`/rest/api/2/issue/${issueId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            description,
            summary,
          },
        }),
      });
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
});

resolver.define('getPostData', async (req) => {
  const { postId } = req.payload;
  try {
    const res = await API.get(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
});

resolver.define('createIncident', async (req) => {
  try {
    console.log('going to create incident');
  } catch (err) {
    console.log(err);
  }
});

export const handler = resolver.getDefinitions();
