module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/" 
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.jsx$": "babel-jest", 
  },
};
