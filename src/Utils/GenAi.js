
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEN_AI_KEY } from "./Constants";

// Access your API key (see "Set up your API key" above)
const GenAi = new GoogleGenerativeAI(GEN_AI_KEY);

export async function run(query) {
  // For text-only input, use the gemini-pro model
  const model = GenAi.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Act as a Moive recommendation system and suggest some movies  for the query : "+ query + ". Only gives me movies in range of 1 to 10 and dont give serial numbers of movies, comma seperated like the example result given ahead. Example result : Gadar,Dhamal,Don,Koi mil gya,Sholay. And only give movies suggestion when my query exist otherwise dont anwser anything just give '' " 

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}