export function brokerConnectAPI(settings) {
  try {
    const response = fetch(`${process.env.REACT_APP_API_URL}/broker/connect`, {
      method: "POST",
      mode: "no-cors",
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