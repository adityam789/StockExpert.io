const tempData = {
  watchlist: [
    {
      name: "Apple",
      ticker: "AAPL",
      price: 160.25,
      change: 0.81,
      chartLink: "../../../../images/StockChart.png",
    },
    {
      name: "Microsoft",
      ticker: "MSFT",
      price: 160.25,
      change: 0.81,
      chartLink: "../../../../images/StockChart.png",
    },
    {
      name: "Amazon",
      ticker: "AMZN",
      price: 160.25,
      change: 0.81,
      chartLink: "../../../../images/StockChart.png",
    },
    {
      name: "Facebook",
      ticker: "META",
      price: 160.25,
      change: 0.81,
      chartLink: "../../../../images/StockChart.png",
    },
    {
      name: "Google",
      ticker: "GOOG",
      price: 160.25,
      change: 0.81,
      chartLink: "../../../../images/StockChart.png",
    },
    {
      name: "Tesla",
      ticker: "TSLA",
      price: 160.25,
      change: 0.81,
      chartLink: "../../../../images/StockChart.png",
    },
    {
      name: "Nvidia",
      ticker: "NVDA",
      price: 160.25,
      change: 0.81,
      chartLink: "../../../../images/StockChart.png",
    },
  ],
  news: [
    {
      newsTitle: "Apple's new iPhone 12 is here",
      newsSource: "Apple",
      newsLink: "https://www.apple.com/iphone-12/",
    },
    {
      newsTitle: "Microsoft's new Surface Laptop 4 is here",
      newsSource: "Microsoft",
      newsLink:
        "https://www.microsoft.com/en-us/p/surface-laptop-4/8wv9kz3x4q5p?activetab=pivot:overviewtab",
    },
    {
      newsTitle: "Amazon's new Echo Dot is here",
      newsSource: "Amazon",
      newsLink:
        "https://www.amazon.com/Echo-Dot-4th-Gen/dp/B07PFFMP9P/ref=sr_1_1?dchild=1&keywords=echo+dot&qid=1603760003&sr=8-1",
    },
    {
      newsTitle: "Facebook's new Oculus Quest 2 is here",
      newsSource: "Facebook",
      newsLink: "https://www.oculus.com/quest-2/",
    },
    {
      newsTitle: "Google's new Pixel 5 is here",
      newsSource: "Google",
      newsLink: "https://store.google.com/us/product/pixel_5",
    },
    {
      newsTitle: "Lorum Ipsum",
      newsSource: "Wack!",
      newsLink: "https://store.google.com/us/product/pixel_5",
    },
  ],
};

export async function dashboardTempData(response) {
  try {
    response.status(200).json(tempData);
  } catch (err) {
    console.log(err);
  }
}
