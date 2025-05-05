import { v4 as UUID4 } from "uuid";

export const bannerPostsData = [
  {
    id: UUID4(),
    title: "AI Revolution: How Bangladesh is Embracing the Future",
    thumbnail: "./banner-images/AI-Revulation.png",
    tag: ["AI", "Technology", "Bangladesh"],
    category: "Technology",
    slug: "ai-revolution-in-bangladesh",
    description:
      "Discover how Bangladesh is integrating AI into key sectors like education, agriculture, and healthcare.",
    author: {
      name: "Raihan Chowdhury",
      profile_image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: [
      {
        id: "c1",
        title: "The AI Boom in Bangladesh",
        images: [
          "https://images.unsplash.com/photo-1636977822883-ea20b37a7b16?q=80&auto=format&fit=crop&w=1600",
        ],
        description:
          "Startups and government initiatives are driving Bangladesh’s AI journey, creating jobs and innovation hubs.",
      },
    ],
  },
  {
    id: UUID4(),
    title: "NASA's Artemis II: Humanity's Return to the Moon",
    thumbnail: "./banner-images/nasa-artemis.png",
    tag: ["Space", "NASA", "Science"],
    category: "Science",
    slug: "nasa-artemis-ii-moon-mission",
    description:
      "Artemis II prepares to send astronauts around the Moon—marking a historic leap in space exploration.",
    author: {
      name: "Sophia Allen",
      profile_image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content: [
      {
        id: "c2",
        title: "Mission Details and Objectives",
        images: [
          "https://images.unsplash.com/photo-1554475901-4538ddfbccc6?q=80&auto=format&fit=crop&w=1600",
        ],
        description:
          "The mission builds toward permanent lunar bases and eventual Mars exploration.",
      },
    ],
  },
  {
    id: UUID4(),
    title: "T20 World Cup 2024: Bangladesh’s Inspiring Run",
    thumbnail: "./banner-images/t20-2024.jpg",
    tag: ["Cricket", "Sports", "Bangladesh"],
    category: "Sports",
    slug: "t20-world-cup-2024-bangladesh",
    description:
      "Bangladesh surprises the cricketing world with an unforgettable World Cup campaign.",
    author: {
      name: "Farhan Hossain",
      profile_image: "https://randomuser.me/api/portraits/men/48.jpg",
    },
    content: [
      {
        id: "c3",
        title: "Historic Victories and Records",
        images: [
          "https://images.unsplash.com/photo-1608897013039-18df184d73b9?q=80&auto=format&fit=crop&w=1600",
        ],
        description:
          "Unbeaten streaks, sensational wickets, and fan frenzy—the Tigers left a mark on 2024.",
      },
    ],
  },
  {
    id: UUID4(),
    title: "Meta Unveils Groundbreaking AI Chatbot",
    thumbnail: "./banner-images/meta-ai-chatbot.jpg",
    tag: ["AI", "Meta", "Tech News"],
    category: "Technology",
    slug: "meta-ai-chatbot-launch",
    description:
      "Meta’s new AI assistant redefines chatbot interactions with superior language understanding.",
    author: {
      name: "Jonathan Park",
      profile_image: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    content: [
      {
        id: "c4",
        title: "Meta vs. OpenAI: The Race for AI Supremacy",
        images: [
          "https://images.unsplash.com/photo-1624377631482-377dd5ac46dc?q=80&auto=format&fit=crop&w=1600",
        ],
        description:
          "With performance benchmarks exceeding expectations, Meta heats up the AI arms race.",
      },
    ],
  },
  {
    id: UUID4(),
    title: "Padma Bridge: A Milestone in Bangladesh's Infrastructure",
    thumbnail: "./banner-images/padma-bridge.jpg",
    tag: ["Infrastructure", "Bangladesh", "Development"],
    category: "Development",
    slug: "padma-bridge-bangladesh-impact",
    description:
      "The Padma Bridge redefines connectivity, reducing travel time and boosting the economy.",
    author: {
      name: "Momena Khan",
      profile_image: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    content: [
      {
        id: "c5",
        title: "Transforming Southern Bangladesh",
        images: [
          "https://images.unsplash.com/photo-1602233158242-dcbed6fe5c13?q=80&auto=format&fit=crop&w=1600",
        ],
        description:
          "From trade to tourism, the mega project has had a far-reaching socio-economic impact.",
      },
    ],
  },
  {
    id: UUID4(),
    title: "Taylor Swift’s 2025 World Tour Shakes the Globe",
    thumbnail: "./banner-images/taylor-swift.jpg",
    tag: ["Entertainment", "Music", "Taylor Swift"],
    category: "Entertainment",
    slug: "taylor-swift-2025-world-tour",
    description:
      "Taylor Swift’s latest tour sets attendance records and redefines global pop culture influence.",
    author: {
      name: "Ariana Silva",
      profile_image: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    content: [
      {
        id: "c6",
        title: "Behind the Phenomenon",
        images: [
          "https://images.unsplash.com/photo-1589810268143-d390d1f8a2f3?q=80&auto=format&fit=crop&w=1600",
        ],
        description:
          "With jaw-dropping performances and storytelling, Swift captivates fans around the world.",
      },
    ],
  },
];
