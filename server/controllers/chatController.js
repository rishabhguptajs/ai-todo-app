import { talkToLLM } from "../utils/llm.js";

const chatController = async(req, res) => {
    try {
        const { message } = req.body;

        const result = await talkToLLM(message);

        if(result) {
            return res.status(200).json({
                message: 'Success',
                data: result
            })
        }
    } catch (error) {
        console.log('Error in chatController: ', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

export { chatController };