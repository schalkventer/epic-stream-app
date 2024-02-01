/**
 *
 */
export const BASE_API_URL = "https://epic-stream-api.netlify.app";

/**
 * @param {string} path
 */
export const request = async (path) => {
  const response = await fetch(`${BASE_API_URL}/${path}`);

  if (!response.ok) {
    const { statusText } = response;
    throw new Error(`Invalid response: ${statusText}`);
  }

  const data = await response.json();
  return data;
};
