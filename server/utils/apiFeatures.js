class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // whatever matches the query
            $options: "i", // case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some fields from query string
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for Price and Rating
    let queryStr = JSON.stringify(queryCopy); // as we want to put $ in front of gt we need to convert json to string

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultsPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage-1);

    this.query = this.query.limit(resultsPerPage).skip(skip)

    return this

  }
}

module.exports = ApiFeatures;
