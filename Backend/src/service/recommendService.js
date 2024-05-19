const { Product, Category } = require("../models/index");
const natural = require("natural");

const tokenizer = new natural.WordTokenizer();

const getRecommendListProduct = async (data) => {
  if(data==="") return null;
  const products = await Product.findAll({});
  const categorys = await Category.findAll({});
  const productListByName = products.map((p) => p.name).filter(p => p!==null);
  const documents = [...productListByName];
  // Preprocess data
  const processedDocs = documents.map((doc) =>
    tokenizer.tokenize(doc.toLowerCase())
  );

  // Build TF-IDF model
  const tfidf = new natural.TfIdf();
  processedDocs.forEach((doc) => tfidf.addDocument(doc));
  const query = tokenizer.tokenize(data.toLowerCase());
  const scores = {};

  processedDocs.forEach((doc, index) => {
      let score = 0;
      query.forEach(word => {
          score += tfidf.tfidf(word, index);
      });
      scores[documents[index]] = score;
  });

  // Sort documents by score
  const sortedDocs = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

  // Return top recommendations

  return {recommendations:sortedDocs.slice(0, 9)};
};

module.exports = { getRecommendListProduct };
