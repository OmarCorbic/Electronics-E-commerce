const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const { search, brands, category, sort, numericFields } = req.query;
  let queryObject = {};

  if (search) {
    queryObject.name = { $regex: search, $options: "xim" };
  }
  if (brands) {
    const brandsArray = brands.split(",");
    queryObject.brand = { $in: [...brandsArray] };
  }
  if (category) {
    queryObject.category = category;
  }
  if (numericFields) {
    const operatorsMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const options = ["price", "rating"];
    const regExp = /\b(<|>|>=|<=|=)\b/g;

    const conditionsToMerge = [];

    numericFields.split(",").map((filter, i, a) => {
      const operator = filter.match(regExp)[0];
      const [field, oper, value] = filter
        .replace(regExp, `-${operatorsMap[operator]}-`)
        .split("-");

      if (options.includes(field)) {
        conditionsToMerge.push({ [field]: { [oper]: Number(value) } });
      }
    });

    const mergedConditions = [];

    conditionsToMerge.forEach((condition) => {
      const key = Object.keys(condition)[0];
      const operator = Object.keys(condition[key])[0];
      const value = condition[key][operator];

      const existingCondition = mergedConditions.find((obj) => obj[key]);
      if (existingCondition) {
        existingCondition[key][operator] = value;
      } else {
        mergedConditions.push({ [key]: { [operator]: value } });
      }
    });

    queryObject = { ...queryObject, $and: [...mergedConditions] };
  }

  const result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  }

  // list of fields
  result.select("_id name price imgUrl rating");

  // get list of brands for the given category
  const products = await result;

  const brandsList = await Product.find({
    category: queryObject.category,
  }).select("brand");
  const uniqueBrands = [];
  const filteredBrands = brandsList.filter((item) => {
    if (!uniqueBrands.includes(item.brand)) {
      uniqueBrands.push(item.brand);
      return true;
    }
    return false;
  });

  // get min and max price values for the given category
  // const priceMinMax = { min: 0, max: 0 };
  // const [minPriceObj] = await Product.find({ category })
  //   .sort({ price: 1 })
  //   .limit(1)
  //   .select("price");
  // priceMinMax.min = Number(minPriceObj.price);

  // const [maxPriceObj] = await Product.find({ category })
  //   .sort({ price: -1 })
  //   .limit(1)
  //   .select("price");
  // priceMinMax.max = Number(maxPriceObj.price);

  res.status(200).json({
    products,
    brands: filteredBrands,
    nbHits: products.length,
  });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const getProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new Error(`Product with id: ${productID} not found`);
  }
  res.status(200).json({ product });
};

module.exports = { getAllProducts, createProduct, getProduct };
