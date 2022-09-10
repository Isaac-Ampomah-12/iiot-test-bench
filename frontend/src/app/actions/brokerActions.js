export function connectToBroker(settings) {
  const response = fetch(`${process.env.REACT_APP_API_URL}/broker/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  console.log(process.env.REACT_APP_API_URL);
  return response;
}