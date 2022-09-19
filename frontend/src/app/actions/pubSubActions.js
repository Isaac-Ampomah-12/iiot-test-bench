const baseUrl = process.env.REACT_APP_API_URL;

export function pubSubStatsAPI(settings) {
  try {
    const response = fetch(`${baseUrl}/pubsub`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function pubSubTestAPI(publish) {
  try {
    const response = fetch(`${baseUrl}/test/subpub`, {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(publish)
    });
    return response;
  } catch(error) {
    console.log(error);
  }
}
