const axios = require('axios')

/*
 * Call GAS to get all scenario all level
 */
module.exports.getScenarioAllLevel = async function () {
    let json = await axios.get(
        `https://script.google.com/macros/s/${process.env.GOOGLE_APP_SCRIPT_ID}/exec?method=combineScenarioAllLevel`
    )

    return json
}

/*
 * Call GAS to get all scenario without node level 1
 */
module.exports.getScenarioAllLevelWithoutLevel1 = async function () {
    let json = await axios.get(
        `https://script.google.com/macros/s/${process.env.GOOGLE_APP_SCRIPT_ID}/exec?method=combineScenarioWithoutNode1`
    )

    return json
}

/*
 * Call GAS to get all nested scenario
 */
module.exports.getScenarioNestedAllLevel = async function () {
    let json = await axios.get(
        `https://script.google.com/macros/s/${process.env.GOOGLE_APP_SCRIPT_ID}/exec`
    )

    return json
}
