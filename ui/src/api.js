export const api = async (task, params) => {
  if (params.houses) {
    params.houses = params.houses.map((x) => parseInt(x, 10));
  }
  if (params.infra) {
    params.infra = params.infra.map((x) => parseInt(x, 10));
  }

  const result = await fetch(`http://127.0.0.1:5000/${task}`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  return await result.json();
};
