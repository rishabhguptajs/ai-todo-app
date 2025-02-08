import { SYSTEM_PROMPT } from './prompt.js';
import { tools } from './functions.js';
import readlineSync from 'readline-sync';
import axios from 'axios';

const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

while (true) {
    const query = readlineSync.question('>> ');
    const userMessage = {
        role: 'user',
        user: query
    };

    messages.push({ role: 'user', content: JSON.stringify(userMessage) });

    while (true) {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "qwen/qwen2.5-vl-72b-instruct:free",
            messages: messages,
            response_format: { type: 'json_object' }
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://localhost:3000",
                "X-Title": "Weather App"
            }
        });

        console.log(response.data)

        const result = response.data.choices[0].message.content;
        messages.push({ role: 'assistant', content: result });

        const action = JSON.parse(result);

        if (action.type === 'output') {
            console.log(action.output);
            break;
        } else if (action.type === 'action') {
            const tool = tools[action.function];
            if (!tool) {
                console.log('Invalid tool');
                break;
            }

            const observation = await tool(action.input);
            const observationMessage = {
                type: 'observation',
                observation: observation
            };
            messages.push({ role: 'system', content: JSON.stringify(observationMessage) });
        }
    }
}