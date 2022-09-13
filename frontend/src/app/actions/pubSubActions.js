export function pubSubStatsAPI(settings) {
  try {
    const response = fetch(`${process.env.REACT_APP_API_URL}/pubsub`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });
    // console.log(JSON.stringify(settings));
    return response;
  } catch (error) {
    console.log(error);
  }
}
