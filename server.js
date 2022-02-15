const express = require('express');
const routes = require('./routes');

const { Tag, Product, ProductTag, Category } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

Category.sync();
Tag.sync();
Product.sync();
ProductTag.sync();

app.listen(PORT, () => {
  console.log(`Application started successfully on ${PORT}!`);
});