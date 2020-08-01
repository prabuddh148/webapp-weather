const apiKey = process.env.WEATHER_API_KEY;
const fetch = require('node-fetch');
exports.handler = async (event, context) => {
    try {
        const q = event.queryStringParameters.q || 'auto:ip';
        if (!q) {
            return {
                statusCode: 400,
                body: "Missing query parameters"
            };
        }
        const uri = `https://api.weatherapi.com/v1/forecast.json?q=${q}`;
        const response = await fetch(`${uri}&key=${apiKey}`);
        if (!response.ok) {
            console.log("Problem in fetching from WEATHER API");
            return {
                statusCode: response.status,
                body: JSON.stringify(data)
            };
        }
        const data = await response.json();
        return {
            statusCode: 200,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        };
    }
    catch (err) {
        console.log("invocation error:", err);
        return {
            statusCode: 500,
            body: "err.message"
        };
    }
}