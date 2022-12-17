const axios = require("axios");
const config = require('../config/config');

const calorieNinjas = {
    requestUrl: "https://api.calorieninjas.com/v1/",

    /**
     * Gets nutritions
     * @returns object {success, data|message}
     */
    async getNutritions(searchQuery) {
        let responseData = { success: false, message: "Nothing found" };

        if (searchQuery === "" || searchQuery === null || searchQuery === undefined) return responseData;
        
        responseData = await axios
        .get(this.requestUrl + "nutrition?query=" + searchQuery, {
            headers: { "Accept-Encoding": "gzip,deflate,compress", 'X-Api-Key': config.calorieNinjas.apiKey },
        })
        .then(function (response) {
            return { success: true, data: response.data };
        })
        .catch(function (error) {
            return { success: false, message: error };
        });

        return responseData;
    }
}

module.exports = calorieNinjas;