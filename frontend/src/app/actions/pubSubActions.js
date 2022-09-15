export function pubSubStatsAPI(settings) {
  try {
    const response = fetch(`${process.env.REACT_APP_API_URL}/pubsub`, {
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
