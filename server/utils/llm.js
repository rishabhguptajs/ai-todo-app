import { SYSTEM_PROMPT } from './prompt.js';
import { pgTable } from "drizzle-orm/pg-core";
import { db } from "../db/index";

const talkToLLM = async(message) => {
    // llm call, with the looping and returning the final result
}

export { talkToLLM };