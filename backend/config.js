module.exports = {
  jwtSecretKey: "LinDemo.secretkey#%$",
  expiresIn: "2h",
  algorithms: ["RS256"],

  // MongoDB Config
  mongodb: {
    uri: "mongodb+srv://linmei:tododemo@cluster0.yllw7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    }
  }
};
