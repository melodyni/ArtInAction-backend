const { app } = require('./src/app');
const PORT = 3002 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
