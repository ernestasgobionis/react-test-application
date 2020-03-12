import { callGet, callPost, callUpdate, callDelete } from './api';
import { MOCK_GET_JSON_RESPONSE, MOCK_POST_JSON } from '../../test/mocks';
jest.setTimeout(60000);

describe('GET Requests', () => {
  test('should throw error if called with invalid URL', async () => {
    try {
      await callGet('not url', 'text/json');
    } catch (e) {
      expect(e).toEqual(new Error('Invalid URL'));
    }
  });

  test('should throw error if invalid API call', async () => {
    try {
      await callGet(
        'https://jsonplaceholder.typicode.com/posts/111',
        'text/json',
      );
    } catch (e) {
      expect(e).toEqual(new Error('Unexpected Error'));
    }
  });

  test('should return JSON response from API', async () => {
    const response = await callGet(
      'https://jsonplaceholder.typicode.com/posts/1',
      'text/json',
    );
    expect(response).toStrictEqual(MOCK_GET_JSON_RESPONSE);
  });
});
