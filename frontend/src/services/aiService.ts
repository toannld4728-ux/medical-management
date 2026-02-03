import { api } from "./api";

export const analyzeRetina = async (imageId: number) => {
  const res = await api.post("/ai/analyze-retina", {
    image_id: imageId,
  });

  return res.data;
};