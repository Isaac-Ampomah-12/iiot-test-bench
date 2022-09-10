export function connectToBroker(settings) {
  const response = fetch(`${process.env.API_URL}/broker/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  return response;
}