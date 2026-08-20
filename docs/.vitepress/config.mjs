import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "System Design Primer",
  description: "A comprehensive guide to designing large-scale systems.",
  ignoreDeadLinks: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Study Guide', link: '/study-guide' },
    ],
    sidebar: [
      {
        text: 'Core Concepts',
        collapsed: false,
        items: [
          { text: 'Performance vs Scalability', link: '/core-concepts/performance-and-scalability' },
          { text: 'Latency vs Throughput', link: '/core-concepts/latency-vs-throughput' },
          { text: 'Availability vs Consistency', link: '/core-concepts/availability-vs-consistency' },
          { text: 'Consistency Patterns', link: '/core-concepts/consistency-patterns' },
          { text: 'Availability Patterns', link: '/core-concepts/availability-patterns' },
          { text: 'Domain Name System', link: '/core-concepts/domain-name-system' },
          { text: 'Content Delivery Network', link: '/core-concepts/content-delivery-network' },
          { text: 'Load Balancer', link: '/core-concepts/load-balancer' },
          { text: 'Reverse Proxy', link: '/core-concepts/reverse-proxy' },
          { text: 'Application Layer', link: '/core-concepts/application-layer' },
          { text: 'Database', link: '/core-concepts/database' },
          { text: 'Cache', link: '/core-concepts/cache' },
          { text: 'Asynchronism', link: '/core-concepts/asynchronism' },
          { text: 'Communication', link: '/core-concepts/communication' },
          { text: 'Security', link: '/core-concepts/security' }
        ]
      },
      {
        text: 'System Design Interviews',
        collapsed: true,
        items: [
          { text: 'Design Pastebin', link: '/system-design-interviews/pastebin' },
          { text: 'Design Twitter', link: '/system-design-interviews/twitter' },
          { text: 'Design Web Crawler', link: '/system-design-interviews/web_crawler' },
          { text: 'Design Mint', link: '/system-design-interviews/mint' },
          { text: 'Design Social Graph', link: '/system-design-interviews/social_graph' },
          { text: 'Design Key-Value Store', link: '/system-design-interviews/query_cache' },
          { text: 'Design Sales Rank', link: '/system-design-interviews/sales_rank' },
          { text: 'Design System for AWS', link: '/system-design-interviews/scaling_aws' }
        ]
      },
      {
        text: 'Object-Oriented Design',
        collapsed: true,
        items: [
          { text: 'Call Center', link: '/object-oriented-design/call_center' },
          { text: 'Deck of Cards', link: '/object-oriented-design/deck_of_cards' },
          { text: 'Hash Table', link: '/object-oriented-design/hash_table' },
          { text: 'LRU Cache', link: '/object-oriented-design/lru_cache' },
          { text: 'Online Chat', link: '/object-oriented-design/online_chat' },
          { text: 'Parking Lot', link: '/object-oriented-design/parking_lot' }
        ]
      },
      {
        text: 'Appendix',
        collapsed: true,
        items: [
          { text: 'Real World Architectures', link: '/appendix/real-world-architectures' },
          { text: 'Company Engineering Blogs', link: '/appendix/company-engineering-blogs' },
          { text: 'Latency Numbers', link: '/appendix/latency-numbers' },
          { text: 'Powers of Two', link: '/appendix/powers-of-two' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/donnemartin/system-design-primer' }
    ]
  }
})
