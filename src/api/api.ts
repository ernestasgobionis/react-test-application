import { validateUrl } from '../utils/string';

type RequestOptions = {
  method: string;
  body?: string;
};

const callApi = (
  url: string,
  options: RequestOptions,
  requestType?: string,
) => {
  return new Promise((resolve, reject) => {
    if (!validateUrl(url)) {
      reject(new Error('Invalid URL'));
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, url);

    if (requestType) {
      xhr.overrideMimeType(requestType);
    }

    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        if (requestType === 'text/json') {
          resolve(JSON.parse(xhr.response));
        } else {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error('Unexpected Error'));
      }
    };

    xhr.onerror = e => {
      reject(new Error('Unexpected Error'));
    };

    xhr.send();
  });
};

export function callGet(
  url: string,
  requestType: string = 'text/json',
): Promise<unknown> {
  return callApi(
    url,
    {
      method: 'GET',
    },
    requestType,
  );
}
