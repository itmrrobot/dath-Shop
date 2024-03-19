const chatbotService = require("../service/chatbotService");

const handleResponeQuestion = async (req,res) => {
    try {
        const {input} = req.body;
        const data = await chatbotService.responeQuestions(input);
        if (data.length > 1) {
         return res.send({ answer: data });
        }
        return res.send({ answer: data });
    } catch(e) {

    }
}

module.exports = {handleResponeQuestion};