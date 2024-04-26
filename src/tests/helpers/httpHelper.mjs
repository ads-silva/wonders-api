import envConfig from '../../config/envConfig.mjs';

export const fetchWithTimeout = ({ url, options, timeout = 5000, signal }) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();

    // Setup a timeout for the fetch request
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timeout'));
    }, timeout);

    fetch(url, { ...options, signal: AbortSignal.any([controller.signal, signal]) })
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

export const httpRequest = async ({ method, path, payload, token, signal }) => {
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
};

export const requestAuth = async ({ email, password, signal }) => {
  const response = await httpRequest({
    method: 'POST',
    path: '/auth',
    payload: {
      email,
      password,
    },
    signal,
  });
  return response;
};

export const requestAuthToken = async (email, t) => {
  const { data } = await requestAuth({ email, password: '123', signal: t.signal });
  return data.authToken;
};
