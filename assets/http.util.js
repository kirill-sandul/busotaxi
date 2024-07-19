const http = async (url, { method, body, headers }) => {
  try {
    const response = await $fetch(url, { method, body, headers });

    return response;
  } catch (e) {
    return e.data;
  }
}

export default http;