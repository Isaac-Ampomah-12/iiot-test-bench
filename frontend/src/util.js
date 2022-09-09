export function genClientId(length) {
  let clientId = "clientId-";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = characters.length;
  for (let i = 0; i < length; i++) {
    clientId += characters.charAt(Math.floor(Math.random() * charLength));
  }
  return clientId;
}
