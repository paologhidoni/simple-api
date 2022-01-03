// Function to dynamically replace the content inside of each product template; it receives a template and an object (product) containing the values to use.

module.exports = (template, product) => {
  // Replace all instances of the placeholder inside the template with the value associated to a specific key inside the product object
  let output = template.replace(/{%ID%}/g, product.slug);

  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ORIGIN%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  // If the product is not organic, the class "not-organic" will be added to the product instead of the placeholder
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
  }
  return output;
};


