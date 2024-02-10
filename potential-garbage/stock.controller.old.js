import 'dotenv/config';

function ston(str) {
    // convert form string to number and round to 2 decimal places
    return parseFloat(str).toFixed(2);
}

export async function getStockData(response, ticker) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.ALPHA_API_KEY}`;
    const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHA_API_KEY}`;
    // const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";
    // const overviewUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";
    const res = await fetch(url);
    const overviewRes = await fetch(overviewUrl);
    if (!res.ok || !overviewRes.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const priceData = await res.json();
    const overViewData = await overviewRes.json();
    const formattedData = {
        "_id": ticker,
        "exchange": overViewData["Exchange"],
        "price": ston(priceData["Global Quote"]["05. price"]),
        "change": ston(priceData["Global Quote"]["09. change"]),
        "changePercent": ston(priceData["Global Quote"]["10. change percent"]),
        "sentiment": 0.7,   // placeholder
        "expertReview": overViewData["Description"],    // placeholder
        "news": [
            {
                "title": "placeholder",
                "source": "placeholder",
                "link": "placeholder"
            }
        ]
    };
    response.json(formattedData);
}