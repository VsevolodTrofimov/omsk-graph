import { notification } from "antd";

export const api = async (task, params) => {
  if (params.houses) {
    params.houses = params.houses.map((x) => parseInt(x, 10));
  }
  if (params.infra) {
    params.infra = params.infra.map((x) => parseInt(x, 10));
  }

  try {
    const result = await fetch(`http://127.0.0.1:5000/${task}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    return await result.json();
  } catch (error) {
    console.error("err", error);
    notification.error({
      message: "Не удалось получить ответ от сервера",
      description: error.message,
    });
  }
};
