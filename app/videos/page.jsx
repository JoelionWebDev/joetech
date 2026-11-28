import Link from "next/link";

export const metadata = {
  title: "Videos | Joetech",
  description:
    "Watch Joetech videos: practical guides for Nigerian small businesses on JoeTech Studio, and daily Nigerian news on 360Headline.",
  alternates: {
    canonical: "https://joetech360.ng/videos",
  },
  openGraph: {
    type: "website",
    title: "Videos | Joetech",
    description:
      "Practical guides for Nigerian small businesses on JoeTech Studio, and daily Nigerian news on 360Headline.",
    url: "https://joetech360.ng/videos",
  },
};

// New videos go at the top of their channel list, newest first.
const JOETECH_VIDEOS = [
  { id: "VyCqzPIOS94", title: "Sell on Instagram: Turn Followers Into Customers", date: "28 November 2026" },
  { id: "Thl9PjVnILU", title: "Keep Your Business Money Straight: Simple Bookkeeping", date: "27 November 2026" },
  { id: "PVwd2Nn4cj8", title: "Stop Using Gmail for Business: Get a Pro Email", date: "27 November 2026" },
  { id: "91x1yo8lmuc", title: "Run Facebook Ads on a Small Budget: Get More Customers", date: "26 November 2026" },
  { id: "9KdID9XsL9k", title: "Stop Undercharging: Price Your Services Right", date: "26 November 2026" },
  { id: "yOu_Aa1u_Nw", title: "Take Product Photos With Your Phone That Sell", date: "25 November 2026" },
  { id: "Rcla4cEXAnE", title: "Is Your Business Website Safe? 3 Security Checks", date: "25 November 2026" },
  { id: "FzgwNNHAkqU", title: "Ask for Reviews: Turn Happy Customers Into New Customers", date: "24 November 2026" },
  { id: "5dK0TunK8QU", title: "Rank Higher on Google: Simple SEO for Your Business", date: "24 November 2026" },
  { id: "W7Bd6GV1iS4", title: "Is Your Website Too Slow? Speed It Up and Win", date: "23 November 2026" },
  { id: "P-D6uNI1lPw", title: "Is Your Website Ready for Phones? Check Now", date: "23 November 2026" },
  { id: "7umEO5e6qVg", title: "Get Paid Online: Accept Payments on Your Website", date: "22 November 2026" },
  { id: "vqYfojatKZo", title: "Not on Google Maps? Your Customers Can't Find You", date: "22 November 2026" },
  { id: "qb0K7_F0bqg", title: "Turn Website Visitors Into WhatsApp Customers", date: "21 November 2026" },
];

const HEADLINE_VIDEOS = [
  { id: "AClFIEs-DdE", title: "INEC Tests BVAS Today in 17,676 Polling Units", date: "28 November 2026" },
  { id: "q_Plh7Kpt_Q", title: "At Least 40 Killed in Fresh Plateau Attacks in Three Weeks", date: "27 November 2026" },
  { id: "0_B_Bw1i1R8", title: "INEC Warns Violence Could Derail 2027 Elections", date: "27 November 2026" },
  { id: "arA2HCeqz2I", title: "FG Begins ₦1.45tn Lagos Ports Upgrade, Targets 20,000 Jobs", date: "26 November 2026" },
  { id: "saAzdHJSYHA", title: "Nollywood Legend Pete Edochie Dies at 79", date: "26 November 2026" },
  { id: "t_OUcjbOjA8", title: "NDLEA Busts ₦303.9bn Meth Lab in Enugu, Arrests Five Mexicans", date: "25 November 2026" },
  { id: "vgiVBa2q1c4", title: "CBN Holds Interest Rate at 23%, Warns of Election Spending", date: "25 November 2026" },
  { id: "3H3zZiJEyq8", title: "Tinubu Asks National Assembly to Cut 2026 Budget to N65.18tn", date: "24 November 2026" },
  { id: "lr0uKM4dHsw", title: "Nigeria's Oil Revenue Falls N1.44tn Despite Crude Price Surge", date: "24 November 2026" },
  { id: "i328i1JMJxg", title: "Cooking Gas Hits N2,000/kg in Abuja, Families Ration Refills", date: "23 November 2026" },
  { id: "pNl8kbcVXZk", title: "At Least 24 Dead as Boat Capsizes in Bayelsa, Nigeria", date: "22 November 2026" },
  { id: "rm5FYEesxtQ", title: "Naira Slides to N1,440/$ as Foreign Reserves Drop $406m", date: "21 November 2026" },
];

function VideoCard({ video }) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="relative aspect-video bg-gray-900">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 leading-snug mb-1">{video.title}</h3>
        <p className="text-sm text-gray-500">{video.date}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
        >
          Watch on YouTube
        </a>
      </div>
    </article>
  );
}

function ChannelSection({ heading, intro, channelUrl, channelName, videos }) {
  return (
    <section className="mb-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{heading}</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">{intro}</p>
        </div>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors"
        >
          Subscribe on YouTube
        </a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-6">
        More videos on{" "}
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {channelName} on YouTube
        </a>
        .
      </p>
    </section>
  );
}

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium">Videos</li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Videos
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Short, practical videos for Nigerian small businesses — and the day&apos;s
            biggest Nigerian news stories, explained in plain language. New videos
            every day.
          </p>
        </header>

        <ChannelSection
          heading="JoeTech Studio"
          intro="Practical guides for Nigerian small businesses: websites, WhatsApp, Google Business Profile, payments, pricing, adverts and more."
          channelUrl="https://www.youtube.com/@joetechstudio"
          channelName="JoeTech Studio"
          videos={JOETECH_VIDEOS}
        />

        <ChannelSection
          heading="360Headline"
          intro="Nigeria-first news, every morning and evening: politics, the economy, business and the stories that affect everyday Nigerians."
          channelUrl="https://www.youtube.com/@MrJoe-hj8yb"
          channelName="360Headline"
          videos={HEADLINE_VIDEOS}
        />
      </div>
    </div>
  );
}
