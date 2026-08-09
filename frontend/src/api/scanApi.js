import api from "./axios";

export const scanProductLabel = (file) => {
  const form = new FormData();
  form.append("file", file);

  return api.post("/scan", form);
};

export const scanProductText = (text, filename) => {
  return api.post("/scan-text", { text, filename });
};
