import { Injectable, Req, Res } from '@nestjs/common';
import axios from 'axios';
import { CreateRepoResponse } from 'src/utils/types/reqres';
import { join } from 'path';

@Injectable()
export class GitCreateRepo {
  async createRepo(@Res() res: CreateRepoResponse, { body, authHeader }) {
    console.log(authHeader);
    console.log(body);
    const headersList = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: authHeader,
    };

    const reqOptions = {
      url: 'https://api.github.com/user/repos',
      method: 'POST',
      headers: headersList,
      data: body,
    };
    try {
      const response: any = await axios.request(reqOptions);
      async function uploadFileToRepo(
        token: string,
        owner: string,
        repo: string,
        filePath: string,
        content: string,
      ) {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
        const headers = {
          Authorization: token,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        };
        const body = {
          message: 'Added new file via API',
          content: content,
        };
        const response = await fetch(url, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(body),
        });
        const json = await response.json();
        return json;
      }
      const {
        name,
        owner: { login },
      } = response.data;
      const owner = login;
      const repo = name;
      const filePath = 'demo_site.html';
      const content =
        'PCFET0NUWVBFIGh0bWw+DQo8aHRtbCBsYW5nPSJlbiI+DQo8aGVhZD4NCiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+DQogICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4NCiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+DQogICAgPHRpdGxlPkdpdGh1YiBPYXV0aDwvdGl0bGU+DQo8L2hlYWQ+DQo8Ym9keT4NCiAgICA8aDE+V2VsY29tZSB0byBHaXRodWI8L2gxPg0KICAgIDxwPkxvcmVtIGlwc3VtLCBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBEaWduaXNzaW1vcyBwcm92aWRlbnQgcXVpZGVtIG9mZmljaWlzIHRlbmV0dXIgZWFydW0gbmVxdWUgbGliZXJvIHN1c2NpcGl0LCBxdWFlcmF0IGVhcXVlIG1vbGxpdGlhIGF1dCByYXRpb25lIHJlcGVsbGF0IGRlbGVuaXRpIHF1aSBvZmZpY2lhIG9kaW8gZXhlcmNpdGF0aW9uZW0gdmVybyB2aXRhZSBjb25zZXF1dW50dXIsIGF0cXVlIHBhcmlhdHVyIG5hbSBleHBsaWNhYm8gbWludXMuIEVpdXMgcHJvdmlkZW50LCBkb2xvcmVzIGV4Y2VwdHVyaSB2ZWxpdCBpbGx1bSBzaXQgcXVvZCBhYiBwYXJpYXR1ciB2b2x1cHRhdGVtIG5hbS4gUXVhcywgb3B0aW8uPC9wPg0KICAgIDxoMT5XaHkgdG8gdXNlIEdpdGh1YiA/PC9oMT4NCiAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBWb2x1cHRhdGVtIG5lbW8gZXhwZWRpdGEgaW4gZWFydW0gY29uc2VxdWF0dXIsIHV0IHZlcm8sIHBhcmlhdHVyIGVhIGF0IHJlcGVsbGF0IGRvbG9yZXMgZG9sb3JlbSwgdGVtcG9yaWJ1cyBtaW51cyEgU2VkIHZvbHVwdGF0ZXMgcXVhbSBwbGFjZWF0IGxhYm9yZSEgRXhjZXB0dXJpIGZ1Z2lhdCBlYXJ1bSBuZXNjaXVudCwgcXVhZSBxdWFzIHBvcnJvIGRvbG9yZSBkb2xvcnVtIHF1aWJ1c2RhbSBpbmNpZHVudCE8L3A+DQo8L2JvZHk+DQo8L2h0bWw+';
      const resp = await uploadFileToRepo(
        authHeader,
        owner,
        repo,
        filePath,
        content,
      );
      console.log(resp);
      res.status(201).json(response.data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
}
