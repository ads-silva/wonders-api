import envConfig from '../../config/envConfig.mjs';

export const fetchWithTimeout = ({ url, options, timeout = 10000, signal }) => {
  return new Promise((resolve, reject) => {
    const controller = signal ? { signal } : new AbortController();
    const timeoutId = signal
      ? null
      : setTimeout(() => {
          controller.abort();
          reject(new Error('Request timeout'));
        }, timeout);

    fetch(url, { ...options, signal: controller.signal })
      .then((response) => {
        timeoutId && clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        timeoutId && clearTimeout(timeoutId);
        reject(error);
      });
  });
};

export async function httpRequest({ method, path, payload, token, signal }) {
  const { APP_URL } = envConfig();
  try {
    const request = await fetchWithTimeout({
      url: `${APP_URL}${path}`,
      options: {
        method,
        ...(payload && { body: JSON.stringify(payload) }),
        headers: {
          'Content-Type': 'application/json',
          ...(token && { authorization: `Bearer ${token}` }),
        },
      },
      signal,
    });

    return { data: await request.json(), status: request.status };
  } catch (error) {
    return error;
  }
}

export async function requestAuth(email, password) {
  const data = await httpRequest({
    method: 'POST',
    path: '/auth',
    payload: {
      email,
      password,
    },
  });
  return data;
}
