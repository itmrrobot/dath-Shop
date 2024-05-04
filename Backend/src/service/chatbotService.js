// Initialize
var synaptic = require("synaptic");
var natural = require("natural");
var fs = require("fs");
var tokenizer = new natural.WordTokenizer();
var objectKeys = Object.keys || require("object-keys");
const path = require("path");

const networkFilePath = path.join(__dirname, "../../dataset/trained_network.json"); // Path to save/load the trained network

let network = null; // Declare the network variable outside the function
// Helpers
function objectSize(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

function arrayMaxIndex(array) {
  return array.indexOf(Math.max.apply(Math, array));
}

function arrayToDictonary(array, onlyKeys, preventTokenizing) {
  var dictionary = {};
  for (var i in array) {
    var single = array[i];
    var words = tokenizer.tokenize(single);
    if (preventTokenizing) {
      words = [single];
    }
    for (var j in words) {
      var word = words[j];
      if (typeof dictionary[word] == "undefined") {
        dictionary[word] = 0;
      }
      dictionary[word]++;
    }
  }
  return onlyKeys ? objectKeys(dictionary) : dictionary;
}

function textToVector(text, dictionary, preventTokenizing) {
  var vector = [];
  var dictionaryKeys = arrayToDictonary([text], true, preventTokenizing);
  for (var dictionaryKey in dictionary) {
    vector.push(dictionaryKeys.indexOf(dictionaryKey) === -1 ? 0 : 1);
  }

  return vector;
}
// Training function
function trainNetwork() {
  // Prepare
  // To-Do: Add a better dataset
  // Prepare
  // Load CSV file
  const fileContent = fs.readFileSync(
    path.join(__dirname, "../../dataset/data.csv"),
    "utf-8"
  );

  // Parse CSV content
  const csvData = fileContent.trim().split("\n");
  //console.log(csvData);

  // Convert CSV data to object
  var data = {};

  // Skip the first element since it contains headers
  for (var i = 1; i < csvData.length; i++) {
    var pair = csvData[i].split(":");
    var question = pair[0].trim();
    var answer = pair[1].trim();
    data[question] = answer;
  }

  console.log(data);
  var texts = [];
  var categories = [];

  for (var text in data) {
    var category = data[text];

    texts.push(text);
    if (categories.indexOf(category) === -1) {
      categories.push(category);
    }
  }

  // Train
  // console.log('-------- Initialization started --------');
  var trainingSet = [];
  var wordsDictionary = arrayToDictonary(texts);
  var categoriesDictionary = arrayToDictonary(categories, "", true);
  // console.log("wordsDictionary",wordsDictionary)
  // console.log("categoriesDictionary",categoriesDictionary)
  for (var text in data) {
    var category = data[text];
    // console.log("text",text," word dic ",wordsDictionary,"textToVector(text, wordsDictionary)",textToVector(text, wordsDictionary))
    // console.log("text",text," word dic ",categoriesDictionary,"textToVector(category, categoriesDictionary,true)",textToVector(category, categoriesDictionary,true))
    trainingSet.push({
      input: textToVector(text, wordsDictionary),
      output: textToVector(category, categoriesDictionary, true),
    });
  }

  var inputLayers = objectKeys(wordsDictionary).length;
  var hiddenLayers = 32;
  var outputLayers = objectKeys(categoriesDictionary).length;

  network = new synaptic.Architect.Perceptron(
    inputLayers,
    hiddenLayers,
    outputLayers
  );
  var trainer = new synaptic.Trainer(network);
  // console.log('-------- Initialization completed --------');

  // console.log('-------- Training started --------');
  // console.log(
  //     'Info: '+inputLayers+' input layers, '+hiddenLayers+' hidden layers and '+outputLayers+' output layers.'
  // );
  // console.log("trainingSet")
  // console.log(trainingSet)
  var testingSet = [];
  var test_data = ["Bạn có nhận", "Phí ship"];

  for (var i = 0; i < test_data.length; i++) {
    testingSet.push({
      input: test_data[i],
    });
  }

  var result = trainer.train(trainingSet, {
    rate: 0.1,
    iterations: 1000000000,
    error: 0.005,
    shuffle: true,
    // log: 10,
    cost: synaptic.Trainer.cost.CROSS_ENTROPY,
    schedule: {
      every: 100,
      do: function (data) {
        //console.log(data);

        if (data.iterations % 10 === 0) {
          // console.log('Testing the "it was very good" text. Category:');
          // var test = network.activate(textToVector('it was very good', wordsDictionary));
          // console.log(test)
          // console.log(categories[arrayMaxIndex(test)]);
        }
      },
    },
  });

  // Save the trained network to disk
  const serializedNetwork = JSON.stringify(network.toJSON());
  fs.writeFileSync(networkFilePath, serializedNetwork, "utf-8");
}

// Check if the trained network file exists
if (fs.existsSync(networkFilePath)) {
  // Load the trained network from disk
  const serializedNetwork = fs.readFileSync(networkFilePath, "utf-8");
  network = synaptic.Network.fromJSON(JSON.parse(serializedNetwork));
} else {
  // Train the network if the trained network file doesn't exist
  trainNetwork();
}  

//console.log(result);
// console.log('-------- Training completed --------');
// const newInput = "Tôi có";
const responeQuestions = (input) => {
  if (network === null) {
    // If the network is not trained yet, train it
    trainNetwork();
  }
  const singleCharacterRegex = /^[.?!@#$%^&*()-+=/*~`,:;'<>|\\{}[]]$/;
    if (singleCharacterRegex.test(input)) {
     return "Tôi không hiểu,làm ơn nhập đúng";
    }
  const fileContent = fs.readFileSync(
    path.join(__dirname, "../../dataset/data.csv"),
    "utf-8"
  );

  // Parse CSV content
  const csvData = fileContent.trim().split("\n");
  //console.log(csvData);

  // Convert CSV data to object
  var data = {};

  // Skip the first element since it contains headers
  for (var i = 1; i < csvData.length; i++) {
    var pair = csvData[i].split(":");
    var question = pair[0].trim();
    var answer = pair[1].trim();
    data[question] = answer;
  }

  var texts = [];
  var categories = [];

  for (var text in data) {
    var category = data[text];

    texts.push(text);
    if (categories.indexOf(category) === -1) {
      categories.push(category);
    }
  }

  // Train
  // console.log('-------- Initialization started --------');
  var trainingSet = [];
  var wordsDictionary = arrayToDictonary(texts);
  return categories[
    arrayMaxIndex(network.activate(textToVector(input, wordsDictionary)))
  ];
};

module.exports = { responeQuestions };
