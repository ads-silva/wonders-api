import envConfig from '../../config/envConfig.mjs';

export const fetchWithTimeout = (url, options, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timeout'));
    }, timeout);

    fetch(url, { ...options, signal: controller.signal })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

export async function httpRequest(method, path, data, token) {
  const { APP_URL } = envConfig();
  try {
    const request = await fetchWithTimeout(`${APP_URL}${path}`, {
      method,
      ...(data && { body: JSON.stringify(data) }),
      headers: {
        'Content-Type': 'application/json',
        ...(token && { authorization: `Bearer ${token}` }),
      },
    });
    return { data: await request.json(), status: request.status };
  } catch (error) {
    return error;
  }
}

export async function requestAuth(email, password) {
  const data = await httpRequest('POST', '/auth', {
    email,
    password,
  });
  return data;
}
