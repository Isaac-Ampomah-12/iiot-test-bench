export function brokerConncectAPI(settings) {
  try {
    const response = fetch(`${process.env.REACT_APP_API_URL}/broker/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings)
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}