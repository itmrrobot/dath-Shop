const fs = require("fs");
const path = require("path");
const natural = require("natural");
const datasetFiles = ["dataset.json","product-dataset.json"]; // Add more file names as needed

// Preprocess data and split into input-output pairs
const conversations = [];

datasetFiles.forEach((file) => {
  const dataset = JSON.parse(fs.readFileSync(path.join(__dirname,'../../dataset',file), "utf8"));
  conversations.push(...dataset.conversations);
});

// Train chatbot
const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

conversations.forEach((conversation) => {
  const input = conversation.input;
  const output = conversation.output;

  const tokens = tokenizer.tokenize(input);
  const processedInput = tokens.map((token) => token.toLowerCase()); // Example preprocessing, adjust as needed
  classifier.addDocument(processedInput, output);
});

classifier.train();

const responeQuestions = async(input) => {
        // Check if req.body and req.body.input are defined
        if (!input) {
          throw new Error("Input is missing in the request body.");
        }
    
        console.log("Received input:", input);
    
        // Verify tokenizer is properly initialized
        if (!tokenizer) {
          throw new Error("Tokenizer is not initialized.");
        }
    
        // const singleCharacterRegex = /^[.?!@#$%^&*()-+=/*~`,:;'<>|\\{}[]]$/;
        // if (singleCharacterRegex.test(input)) {
        //  res.send({answer:"I don't understand.Please provide a valid input."});
        // }
    
        // Tokenize and process input
        const tokens = tokenizer.tokenize(input);
        const processedInput = tokens.map((token) => token.toLowerCase());
    
        // Verify classifier is properly initialized
        if (!classifier) {
          throw new Error("Classifier is not initialized.");
        }
    
        // Classify input
        const classifications = classifier.getClassifications(processedInput);
    
        // Sort classifications by score in descending order
        const sortedClassifications = classifications.sort(
          (a, b) => b.value - a.value
        );
    
        //console.log(sortedClassifications);
        // Get the top 3 classifications
        let topClassifications = sortedClassifications.slice(0, 3);
        let topClassificationsList = [];
    
        let highestScore = topClassifications[0].value;
        if (topClassifications.length > 0) {
          topClassificationsList.push(topClassifications[0]);
          for (let i = 1; i < topClassifications.length; i++) {
            if (topClassifications[i].value === highestScore) {
              topClassificationsList.push(topClassifications[i]);
              //if (topClassificationsList.length === 3) break;
            } else {
              break; // Exit loop if a different value is encountered
            }
          }
        }
        console.log(topClassificationsList);
        // Extract input labels from top classifications
        const topInputs = topClassificationsList.map((classification) => {
            const matchingConversation = conversations.find((conversation) => conversation.output === classification.label || conversation.output.includes(classification.label));
            if (!matchingConversation) {
                return null;
            }
            return matchingConversation.input;
        })
          .filter((i) => i !== null);
          //const matchingConversation = conversations.find((conversation) => conversation.output.includes("Chào mừng bạn! Để giúp bạn tìm"));
        // Return the top inputs to the client
        //console.log(topInputs,matchingConversation);
        console.log(topInputs,1);
        if (topInputs.length > 1) {
         return topInputs;
        }
    
        
        const response =
          topInputs.toString() !== ""
            ? classifier.classify(topInputs.toString())
            : "Xin lỗi tôi không hiểu câu hỏi của bạn";
        //const response = classifier.classify(processedInput);
        return response;
}

module.exports = {responeQuestions};