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

  filter(){
    const queryCopy = {...this.queryStr}

    // Removing some fields from query string
    const removeFields = ["keyword","page","limit"]

    removeFields.forEach(key => delete queryCopy[key] );
    this.query = this.query.find(queryCopy);
    // console.log(this.query);
    return this;

  }
}

module.exports = ApiFeatures;
