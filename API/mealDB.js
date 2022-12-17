const axios = require("axios");

const mealDB = {
  requestUrl: "https://themealdb.com/api/json/v1/1/",
  SEARCH_BY_CATEGORY: "category",
  SEARCH_BY_AREA: "area",
  SEARCH_BY_INGREDIANT: "ingrediant",
  SEARCH_BY_ID: "id",
  SEARCH_BY_TEXT: "search",
  SEARCH_BY_FIRST_LETTER: "firstLetter",

  /**
   * Get random meal
   */
  async getRandomMeal() {
    let responseData = await axios
      .get(this.requestUrl + "random.php", {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      })
      .then(function (response) {
        return { success: true, data: response.data.meals };
      })
      .catch(function (error) {
        return { success: false, message: error };
      });

    return responseData;
  },

  /**
   * Get categories
   */
  async getCategories() {
    let responseData = await axios
      .get(this.requestUrl + "categories.php", {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      })
      .then(function (response) {
        return { success: true, data: response.data.categories };
      })
      .catch(function (error) {
        return { success: false, message: error };
      });

    return responseData;
  },

  /**
   * Search meals from meal db API
   * @param {string} searchQuery search text
   * @param {string} type default search
   * @returns array
   */
  async search(searchQuery, type = this.SEARCH_BY_TEXT) {
    let responseData = { success: false, message: "Nothing found" };

    if (searchQuery === "" || searchQuery === null || searchQuery === undefined)
      return responseData;

    switch (type) {
      case this.SEARCH_BY_TEXT:
      default:
        responseData = await axios
          .get(this.requestUrl + "search.php?s=" + searchQuery, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then(function (response) {
            return { success: true, data: response.data.meals };
          })
          .catch(function (error) {
            return { success: false, message: error };
          });
        break;
      case this.SEARCH_BY_CATEGORY:
        responseData = await axios
          .get(this.requestUrl + "list.php?c=" + searchQuery, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then(function (response) {
            return { success: true, data: response.data.meals };
          })
          .catch(function (error) {
            return { success: false, message: error };
          });
        break;
      case this.SEARCH_BY_AREA:
        responseData = await axios
          .get(this.requestUrl + "list.php?a=" + searchQuery, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then(function (response) {
            return { success: true, data: response.data.meals };
          })
          .catch(function (error) {
            return { success: false, message: error };
          });
        break;
      case this.SEARCH_BY_INGREDIANT:
        responseData = await axios
          .get(this.requestUrl + "list.php?i=" + searchQuery, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then(function (response) {
            return { success: true, data: response.data.meals };
          })
          .catch(function (error) {
            return { success: false, message: error };
          });
        break;
      case this.SEARCH_BY_ID:
        responseData = await axios
          .get(this.requestUrl + "lookup.php?i=" + searchQuery, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then(function (response) {
            return { success: true, data: response.data.meals };
          })
          .catch(function (error) {
            return { success: false, message: error };
          });
        break;
      case this.SEARCH_BY_FIRST_LETTER:
        responseData = await axios
          .get(this.requestUrl + "search.php?f=" + searchQuery, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then(function (response) {
            return { success: true, data: response.data.meals };
          })
          .catch(function (error) {
            return { success: false, message: error };
          });
        break;
    }

    return responseData;
  },
};

module.exports = mealDB;
