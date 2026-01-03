// app/blog/page.jsx
import { BlogCard } from "./BlogCard";

export const revalidate = 86400; // 24 hours

async function getCryptoNews() {
  try {
    const res = await fetch(
      "https://cryptopanic.com/api/v1/posts/?auth_token=free&public=true&kind=news",
      {
        next: { revalidate: 86400 },
      }
    );
    const data = await res.json();

    return (
      data.results?.slice(0, 6).map((item) => ({
        id: item.id,
        title: item.title,
        summary: item.title.slice(0, 120) + "...",
        category: "Crypto News",
        source: item.source?.title || "CryptoPanic",
        date: new Date(item.created_at).toLocaleDateString(),
        url: item.url,
      })) || []
    );
  } catch {
    return [];
  }
}

async function getCryptoTrending() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        next: { revalidate: 86400 },
      }
    );
    const data = await res.json();

    return (
      data.coins?.slice(0, 4).map((item) => ({
        id: item.item.id,
        title: `${item.item.name} (${item.item.symbol}) Trending`,
        summary: `${
          item.item.name
        } is currently trending with a market cap rank of #${
          item.item.market_cap_rank || "N/A"
        }. Price BTC: ${item.item.price_btc?.toFixed(8) || "N/A"}`,
        category: "Crypto Forecast",
        source: "CoinGecko",
        date: new Date().toLocaleDateString(),
        url: `https://www.coingecko.com/en/coins/${item.item.id}`,
      })) || []
    );
  } catch {
    return [];
  }
}

async function getDevTrends() {
  try {
    const res = await fetch("https://dev.to/api/articles?top=7", {
      next: { revalidate: 86400 },
    });
    const data = await res.json();

    return data.slice(0, 6).map((item) => ({
      id: item.id.toString(),
      title: item.title,
      summary: item.description || item.title.slice(0, 120) + "...",
      category: "Web Dev",
      source: item.user?.name || "Dev.to",
      date: new Date(item.published_at).toLocaleDateString(),
      url: item.url,
    }));
  } catch {
    return [];
  }
}

async function getInvestmentInsights() {
  // Using crypto market data as investment insights
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&sparkline=false",
      {
        next: { revalidate: 86400 },
      }
    );
    const data = await res.json();

    return data.map((coin) => ({
      id: coin.id,
      title: `${coin.name}: Market Opportunity Analysis`,
      summary: `Current price: $${coin.current_price.toLocaleString()}. 24h change: ${coin.price_change_percentage_24h?.toFixed(
        2
      )}%. Market cap: $${(coin.market_cap / 1e9).toFixed(2)}B`,
      category: "Investment",
      source: "CoinGecko Markets",
      date: new Date().toLocaleDateString(),
      url: `https://www.coingecko.com/en/coins/${coin.id}`,
    }));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const [cryptoNews, cryptoForecasts, devTrends, investments] =
    await Promise.all([
      getCryptoNews(),
      getCryptoTrending(),
      getDevTrends(),
      getInvestmentInsights(),
    ]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Tech & Crypto Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with the latest trends in crypto, development, and
            investment opportunities
          </p>
        </div>

        {/* Crypto News Section */}
        {cryptoNews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Crypto News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cryptoNews.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Crypto Forecast Section */}
        {cryptoForecasts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Daily Crypto Outlook
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cryptoForecasts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Web Dev Trends Section */}
        {devTrends.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Web Dev Trends
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devTrends.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Investment Opportunities Section */}
        {investments.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Investment Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {investments.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
