// Reflection Media Platform - Primary Knowledge & Content Database

export const CATEGORIES = [
  { id: 'all', label: 'All Content', icon: 'Sparkles' },
  { id: 'interviews', label: 'Interviews', icon: 'Mic' },
  { id: 'opinions', label: 'Opinions & Discussions', icon: 'Brain' },
  { id: 'history', label: 'History', icon: 'Scroll' },
  { id: 'india', label: 'India', icon: 'Compass' },
  { id: 'culture', label: 'Culture & Heritage', icon: 'Landmark' },
  { id: 'youth', label: 'Youth & Future', icon: 'GraduationCap' },
  { id: 'short_films', label: 'Short Films', icon: 'Film' },
  { id: 'events', label: 'Events & Conclaves', icon: 'Calendar' },
  { id: 'shorts', label: 'Shorts', icon: 'Zap' },
];

export const VIDEOS = [
  {
    id: 'vid-1',
    title: 'The Great Partition of 1947: Declassified Files and Border Politics',
    category: 'history',
    duration: '48:22',
    views: '1.4M',
    date: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    featured: true,
    trending: true,
    rating: 'Fact Checked',
    tags: ['Partition', 'Colonial India', 'Radcliffe Line', '1947', 'Archives'],
    speaker: 'Amogh & Dr. Sanjeev Sanyal',
    description: 'An exhaustive investigative breakdown examining declassified British Cabinet papers, Mountbatten notes, and the hurried drafting of the Radcliffe Line. We analyze the socio-demographic aftermath in Punjab and Bengal.',
    claimBreakdown: [
      {
        type: 'fact',
        claim: 'Radcliffe was granted only 5 weeks to demarcate 4,500 km of international borders without prior geographical knowledge of India.',
        source: 'Transfer of Power Documents, Vol. XII, Her Majesty’s Stationery Office (HMSO), 1983.',
        badge: 'Official Document'
      },
      {
        type: 'analysis',
        claim: 'The economic dislocation of Punjab’s canal colonies caused long-term agricultural imbalance lasting over two decades.',
        source: 'Reserve Bank of India Historical Bulletin 1948; Harvard Economic Review (2004).',
        badge: 'Scholarly Paper'
      },
      {
        type: 'opinion',
        claim: 'Earlier British intervention could have significantly mitigated refugee transit casualties.',
        source: 'Historian discourse & panel perspective with Prof. Meghnad Desai.',
        badge: 'Editorial Perspective'
      }
    ]
  },
  {
    id: 'vid-2',
    title: 'How the Indian Constitution Was Really Written: Inside the 3-Year Debates',
    category: 'india',
    duration: '54:10',
    views: '980K',
    date: '1 week ago',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    featured: true,
    trending: true,
    rating: 'Constitutional Archive',
    tags: ['Indian Constitution', 'Ambedkar', 'Constituent Assembly', 'Democracy', 'Law'],
    speaker: 'Reflection Panel & Constitutional Jurists',
    description: 'We read directly from the original Constituent Assembly Debates (CAD) transcripts from 1946 to 1949. Understanding why Dr. B.R. Ambedkar clashed with fellow draftsmen on federalism, fundamental rights, and uniform civil code.',
    claimBreakdown: [
      {
        type: 'fact',
        claim: 'The Assembly spent 165 days across 11 sessions, drafting 395 articles in both English and calligraphy Hindi.',
        source: 'Lok Sabha Secretariat: Constituent Assembly Debates (Vol. I - XII).',
        badge: 'Parliamentary Archive'
      },
      {
        type: 'analysis',
        claim: 'The Government of India Act 1935 supplied roughly 60% of structural provisions for administrative machinery.',
        source: 'Constitutional Law of India (Granville Austin, "The Indian Constitution: Cornerstone of a Nation").',
        badge: 'Primary Reference'
      }
    ]
  },
  {
    id: 'vid-3',
    title: 'The Maritime Empire of the Cholas: India’s Lost Naval Dominance',
    category: 'culture',
    duration: '39:15',
    views: '840K',
    date: '2 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    featured: false,
    trending: true,
    rating: 'Archaeological Survey',
    tags: ['Cholas', 'Naval History', 'Tamil Nadu', 'Southeast Asia', 'Architecture'],
    speaker: 'Maritime Archaeologists',
    description: 'Rajendra Chola I mobilized an expedition that crossed the Bay of Bengal, sacking the Srivijaya capital in Sumatra. How Tamil guilds (Manigramam) dominated Indo-Pacific trade routes for 300 years.',
    claimBreakdown: [
      {
        type: 'fact',
        claim: 'The Thanjavur Inscriptions (Brihadisvara Temple) explicitly record overseas naval conquests of Kadaram (Kedah) and Srivijaya in 1025 CE.',
        source: 'Epigraphia Indica, Volume IX, Archaeological Survey of India (ASI).',
        badge: 'Epigraphical Record'
      }
    ]
  },
  {
    id: 'vid-4',
    title: 'Telangana: The 60-Year Struggle, Identity & Modern Renaissance',
    category: 'interviews',
    duration: '1:12:04',
    views: '1.2M',
    date: '3 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1600100397608-f010e42e5f80?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    featured: false,
    trending: false,
    rating: 'Socio-Political Study',
    tags: ['Telangana', 'Hyderabad', 'History', 'Statehood', 'Culture'],
    speaker: 'Veteran Activists & Amogh',
    description: 'From the Mulki rules of Hyderabad State and the 1969 agitation to the million-march in 2011. A deep cultural exploration of the Deccan plateau, Kakatiya water reservoirs, and its booming tech capital.',
    claimBreakdown: [
      {
        type: 'fact',
        claim: 'The Gentlemen’s Agreement was signed in February 1956 guaranteeing safeguards for Telangana before linguistic reorganisation.',
        source: 'Ministry of Home Affairs, Govt of India Report (1956).',
        badge: 'Govt Whitepaper'
      }
    ]
  },
  {
    id: 'vid-5',
    title: 'The Real Economics of Indian Youth: Jobs, AI, and Capital Formation',
    category: 'youth',
    duration: '42:18',
    views: '670K',
    date: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    featured: false,
    trending: true,
    rating: 'Data Backed',
    tags: ['Youth', 'Economy', 'AI', 'Startups', 'Employment'],
    speaker: 'Venture Capitalists & Labor Economists',
    description: 'Is India’s demographic dividend an unmatched asset or an impending employment challenge? We look at PLFS employment surveys, manufacturing CAPEX, and how generative AI is rewriting engineering careers.',
    claimBreakdown: [
      {
        type: 'fact',
        claim: 'India’s median age is 28.2 years compared to 39 in the US and 48 in Japan.',
        source: 'United Nations Population Fund (UNFPA) State of World Population Report 2024.',
        badge: 'UN Demographics'
      }
    ]
  },
  {
    id: 'vid-6',
    title: 'Shivaji Maharaj’s Guerrilla Strategy: The Forts That Defied the Empire',
    category: 'history',
    duration: '45:30',
    views: '2.1M',
    date: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    featured: false,
    trending: true,
    rating: 'Military History',
    tags: ['Shivaji Maharaj', 'Maratha Empire', 'Maharashtra', 'Forts', 'Strategy'],
    speaker: 'Historians & Defense Analysts',
    description: 'How Raigad, Rajgad, and Sindhudurg formed an impenetrable web of hill and naval fortresses that neutralized Mughal heavy artillery through Ganimi Kava (guerrilla tactics).',
    claimBreakdown: [
      {
        type: 'fact',
        claim: 'Shivaji Maharaj commanded over 300 hill, coastal, and land forts across the Western Ghats at the time of his coronation in 1674.',
        source: 'Sabhasad Bakhar (1697 contemporary chronicle); Maharashtra State Archives.',
        badge: 'Historical Chronicle'
      }
    ]
  },
  {
    id: 'vid-7',
    title: 'The Philosophy of the Upanishads: Scientific Parallels in Vedic Thought',
    category: 'culture',
    duration: '51:04',
    views: '890K',
    date: '2 months ago',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    featured: false,
    trending: false,
    rating: 'Philosophical Discourse',
    tags: ['Upanishads', 'Vedas', 'Philosophy', 'Consciousness', 'Quantum Physics'],
    speaker: 'Sanskrit Scholars & Physicists',
    description: 'Why Erwin Schrödinger and Niels Bohr turned to Advaita Vedanta when wrestling with quantum superposition. An unfiltered look at what the Upanishads actually say about non-dual consciousness.',
    claimBreakdown: [
      {
        type: 'fact',
        claim: 'Erwin Schrödinger named his personal home in Dublin after an Upanishadic phrase and cited the Chandogya Upanishad in "What Is Life?".',
        source: 'What is Life? (Cambridge University Press, 1944).',
        badge: 'Academic Source'
      }
    ]
  }
];

export const SHORTS = [
  {
    id: 'short-1',
    title: 'The secret behind Hyderabad’s Golconda acoustic dome 🏛️',
    author: 'Amogh',
    views: '4.2M',
    likes: 312000,
    comments: 4890,
    tags: ['Hyderabad', 'Acoustics', 'Architecture'],
    videoPoster: 'https://images.unsplash.com/photo-1600100397608-f010e42e5f80?auto=format&fit=crop&w=600&q=80',
    fullVideoId: 'vid-4'
  },
  {
    id: 'short-2',
    title: 'Why Sardar Patel called the Civil Service India’s "Steel Frame" 🇮🇳',
    author: 'Reflection Archive',
    views: '2.8M',
    likes: 245000,
    comments: 1980,
    tags: ['Sardar Patel', 'Civil Service', 'Constitution'],
    videoPoster: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    fullVideoId: 'vid-2'
  },
  {
    id: 'short-3',
    title: 'Radcliffe drew India’s border using 30-year-old maps 📜',
    author: 'Amogh',
    views: '5.1M',
    likes: 480000,
    comments: 6320,
    tags: ['Partition', 'History', 'Radcliffe'],
    videoPoster: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80',
    fullVideoId: 'vid-1'
  },
  {
    id: 'short-4',
    title: 'Did you know the Chola Navy had female admirals? ⚓',
    author: 'Reflection Culture',
    views: '1.9M',
    likes: 189000,
    comments: 1120,
    tags: ['Cholas', 'Naval', 'Heritage'],
    videoPoster: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    fullVideoId: 'vid-3'
  }
];

export const PODCASTS = [
  {
    id: 'pod-1',
    episodeNumber: 'Ep. 48',
    title: 'De-dollarization, The Global South & India’s Century',
    guest: 'Dr. Subramanian Swamy & Global Macro Economists',
    duration: '1 hr 18 min',
    date: 'Sep 24, 2026',
    category: 'Geopolitics & Economy',
    cover: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    topics: ['BRICS Currency', 'Sanctions Risk', 'Indian Rupee Settlement', 'Reserve Bank Policy'],
    transcriptSnippet: '“The moment sovereign foreign exchange reserves can be seized arbitrarily by Western clearing houses, the post-Bretton Woods system has signed its own structural death warrant...”'
  },
  {
    id: 'pod-2',
    episodeNumber: 'Ep. 47',
    title: 'Sanskrit Grammar, Pāṇini’s Algorithm & Natural Language Processing',
    guest: 'Dr. Rishi Rajpopat (Cambridge Sanskrit Scholar)',
    duration: '59 min',
    date: 'Sep 12, 2026',
    category: 'Linguistics & Technology',
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    topics: ['Ashtadhyayi', '2,500-Year Puzzle', 'Turing Completeness', 'Morphology'],
    transcriptSnippet: '“Pāṇini wasn’t just composing grammar rules; he built a generative algorithm with built-in conflict resolution rules that functioned remarkably like a modern compiler...”'
  },
  {
    id: 'pod-3',
    episodeNumber: 'Ep. 46',
    title: 'The Untold Stories of 1971: RAW, Mukti Bahini & Naval Blockades',
    guest: 'Former Special Secretary, Cabinet Secretariat',
    duration: '1 hr 35 min',
    date: 'Aug 28, 2026',
    category: 'National Security',
    cover: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    topics: ['Operation Trident', 'RN Kao', 'Air Dominance', 'Instrument of Surrender'],
    transcriptSnippet: '“When the Karachi harbor was set ablaze on December 4, 1971, by Indian missile boats, naval warfare in Asia was permanently redefined...”'
  }
];

export const ARTICLES = [
  {
    id: 'art-1',
    title: 'The Myth of the Lazy Native: How Colonial Censuses Distorted Indian Social Structure',
    readTime: '9 min read',
    category: 'History & Sociology',
    date: 'Sep 20, 2026',
    author: 'Reflection Research Desk',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1000&q=80',
    summary: 'Herbert Risley’s 1901 imperial anthropometric census froze fluid professional jati systems into rigid, hierarchical caste blocks to ease colonial tax extraction and divide-and-rule governance.',
    content: `Before the 19th-century colonial ethnographers arrived with their measuring calipers and classification grids, Indian social structures were dynamic, geographically contextual, and deeply fluid. The Imperial Census of 1901, spearheaded by Sir Herbert Risley, sought to apply pseudoscientific racial theories (specifically anthropometry) onto the Indian subcontinent.

By forcibly codifying and ranking hundreds of thousands of fluid social groups into four rigid hierarchical brackets for taxation and administrative surveillance, the British colonial apparatus cemented divisions that had previously been negotiated, regional, and evolving.

Primary Archival Evidence:
- Census of India 1901, Vol. I: Ethnographic Appendices.
- Nicholas Dirks, "Castes of Mind: Colonialism and the Making of Modern India" (Princeton University Press, 2001).
- Proceedings of the Indian Council of Historical Research (1984).`,
    verifiedSourcesCount: 14
  },
  {
    id: 'art-2',
    title: 'The Great Temple Engineering: How Thanjavur Withstood Seismic Earthquakes Without Mortar',
    readTime: '7 min read',
    category: 'Architecture & Science',
    date: 'Sep 15, 2026',
    author: 'Heritage & Science Wing',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42e5f80?auto=format&fit=crop&w=1000&q=80',
    summary: 'The 216-foot granite vimana of Brihadisvara was erected in 1010 CE using interlocking tongue-and-groove joints that dissipate ground vibration like modern base isolators.',
    content: `Rising over the fertile plains of the Cauvery delta, the Brihadisvara Temple (completed in 1010 CE by Emperor Rajaraja Chola I) contains zero binding mortar. The massive 80-ton single granite capstone atop the tower required a 6-kilometer earthen ramp to elevate into place.

Modern structural simulations reveal that the dry-stone interlocking masonry acts as an ancient seismic dampener: during earth tremors, the granite blocks shift minutely, dissipating kinetic energy through frictional friction rather than fracturing brittle mortar.`,
    verifiedSourcesCount: 9
  },
  {
    id: 'art-3',
    title: 'Semiconductors in the Deccan: Can Hyderabad and Bengaluru Win the Chip Race?',
    readTime: '11 min read',
    category: 'Geopolitics & Tech',
    date: 'Sep 08, 2026',
    author: 'Tech Policy Desk',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    summary: 'A deep economic dive into India’s Semiconductor Mission (ISM), fab infrastructure in Dholera & Sanand, design hubs in Telangana, and raw chemical supply chains.',
    content: `While Taiwan commands leading-edge 3nm and 2nm silicon through TSMC, over 20% of the world’s top chip designers already work out of engineering centers in Hyderabad, Bengaluru, and Noida. India’s immediate battle is not chasing sub-2nm mobile chips, but securing legacy 28nm and 65nm nodes that power automobiles, power grids, defense satellites, and medical hardware.`,
    verifiedSourcesCount: 22
  }
];

export const TIMELINE_ERAS = [
  {
    id: 'ancient',
    era: 'Ancient India',
    period: '3300 BCE – 600 CE',
    highlights: 'Indus Valley Harappa, Vedic Philosophy, Mauryan Empire, Ashoka Edicts, Gupta Golden Age of Mathematics & Astronomy.',
    keyEvents: [
      { year: '2600 BCE', event: 'Harappan Urban Planning (Standardized bricks, sanitation, maritime port at Lothal).' },
      { year: '321 BCE', event: 'Chandragupta Maurya unifies the subcontinent under Chanakya’s Arthashastra doctrine.' },
      { year: '499 CE', event: 'Aryabhata writes Aryabhatiya, calculating π to 4 decimal places and Earth’s axial rotation.' }
    ]
  },
  {
    id: 'medieval',
    era: 'Medieval Empires',
    period: '600 CE – 1757 CE',
    highlights: 'Chola Naval Expeditions, Vijayanagara Prosperity at Hampi, Delhi Sultanates, Maratha Guerrilla Ascendancy under Shivaji Maharaj.',
    keyEvents: [
      { year: '1025 CE', event: 'Rajendra Chola’s trans-oceanic expedition captures Srivijaya maritime gateways in Sumatra.' },
      { year: '1509 CE', event: 'Krishnadevaraya rules Vijayanagara; Hampi becomes one of the wealthiest global trading metropolises.' },
      { year: '1674 CE', event: 'Coronation of Chhatrapati Shivaji Maharaj; formalization of Hindavi Swarajya and naval fleet.' }
    ]
  },
  {
    id: 'colonial',
    era: 'Colonial & Resistance',
    period: '1757 – 1947',
    highlights: 'Battle of Plassey, The 1857 First War of Independence, Drain of Wealth theory, Subhas Chandra Bose’s INA, Quit India.',
    keyEvents: [
      { year: '1757', event: 'Battle of Plassey: British East India Company takes fiscal control of Bengal treasury.' },
      { year: '1857', event: 'Great Rebellion across Meerut, Delhi, Awadh, and Jhansi; formal transfer of power to the British Crown.' },
      { year: '1942', event: 'Subhas Chandra Bose forms the Indian National Army (Azad Hind Fauj) with headquarters in Rangoon & Singapore.' }
    ]
  },
  {
    id: 'independence',
    era: 'Independence & Partition',
    period: '1947 – 1950',
    highlights: 'Mountbatten Partition Plan, Tragedy of 14M displaced, Integration of 565 Princely States by Sardar Patel, Drafting the Constitution.',
    keyEvents: [
      { year: 'August 15, 1947', event: 'India awakens to freedom; tragic Partition of Punjab and Bengal triggers the largest human migration in history.' },
      { year: '1948', event: 'Operation Polo: Hyderabad State merged into the Indian Union by Sardar Patel.' },
      { year: 'January 26, 1950', event: 'Constitution of India takes effect, establishing a sovereign democratic republic.' }
    ]
  },
  {
    id: 'modern',
    era: 'Modern India',
    period: '1950 – Present',
    highlights: 'Green Revolution, 1971 Liberation of Bangladesh, 1991 Economic Reforms, Chandrayaan Moon Landing, Digital Public Infrastructure (UPI).',
    keyEvents: [
      { year: '1971', event: 'Indo-Pak War: Decisive victory liberating Bangladesh; 93,000 troops surrender.' },
      { year: '1991', event: 'Economic Liberalization opens Indian markets to global trade and enterprise.' },
      { year: '2023', event: 'ISRO’s Chandrayaan-3 achieves historic first soft landing near the lunar south pole.' }
    ]
  }
];

export const INDIA_REGIONS = [
  {
    id: 'telangana',
    stateCode: 'INTG',
    name: 'Telangana',
    capital: 'Hyderabad',
    tagline: 'Heart of the Deccan & Renaissance of the Kakatiyas',
    bannerImage: 'https://images.unsplash.com/photo-1600100397608-f010e42e5f80?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 410, y: 642 },
    focalPoints: ['Golconda Acoustics', 'Kakatiya Dynasty', 'Hyderabad Tech Hub', 'Telangana Agitation'],
    description: 'The heart of the Deccan plateau. Famed for Kakatiya stepwells, Nizam heritage, the 1969 statehood agitation, and its emergence as a global IT and vaccine powerhouse.',
    relatedVideos: ['vid-4', 'vid-1'],
    stats: { videos: 18, articles: 7, sources: 42 }
  },
  {
    id: 'up',
    stateCode: 'INUP',
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    tagline: 'Cradle of the Gangetic Civilization & Vedic Philosophy',
    bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 447, y: 366 },
    focalPoints: ['Ayodhya & Ram Janmabhoomi', 'Varanasi Ghats', 'Mughal Architecture', 'First War of 1857'],
    description: 'Cradle of Gangetic civilization. Home to the world’s oldest continuously inhabited spiritual city (Varanasi), Sarnath where Buddha preached, and landmark historic struggles.',
    relatedVideos: ['vid-1', 'vid-2'],
    stats: { videos: 29, articles: 14, sources: 88 }
  },
  {
    id: 'maharashtra',
    stateCode: 'INMH',
    name: 'Maharashtra',
    capital: 'Mumbai',
    tagline: 'Sahyadri Fortresses & Swarajya of Shivaji Maharaj',
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 335, y: 614 },
    focalPoints: ['Maratha Forts of Shivaji Maharaj', 'Ajanta & Ellora Caves', 'Mumbai Financial Engine', 'B.R. Ambedkar'],
    description: 'Rugged Sahyadri mountain fortresses, the pioneering social reforms of Phule and Ambedkar, and India’s financial and entertainment capital.',
    relatedVideos: ['vid-6', 'vid-2'],
    stats: { videos: 32, articles: 12, sources: 94 }
  },
  {
    id: 'tamilnadu',
    stateCode: 'INTN',
    name: 'Tamil Nadu',
    capital: 'Chennai',
    tagline: 'Classical Sangam Legacy & Chola Trans-Oceanic Navy',
    bannerImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 376, y: 842 },
    focalPoints: ['Chola Maritime Empire', 'Brihadisvara Temple', 'Sangam Classical Literature', 'Dravidian Architecture'],
    description: 'Living testament to uninterrupted millennia-old classical Tamil traditions, trans-oceanic naval conquests of Southeast Asia, and temple engineering wonders.',
    relatedVideos: ['vid-3', 'vid-7'],
    stats: { videos: 22, articles: 9, sources: 65 }
  },
  {
    id: 'delhi',
    stateCode: 'INDL',
    name: 'Delhi (NCT)',
    capital: 'New Delhi',
    tagline: 'The Seven Cities of Empires & Sovereign Constitutional Core',
    bannerImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 344, y: 321 },
    focalPoints: ['Constituent Assembly Debates', 'Seven Historic Cities of Delhi', 'Central Vista', '1857 Siege'],
    description: 'The seat of empires and the constitutional nerve center of modern Indian democracy. Where the fate of South Asia has been debated and codified across centuries.',
    relatedVideos: ['vid-2', 'vid-1'],
    stats: { videos: 45, articles: 21, sources: 110 }
  },
  {
    id: 'punjab',
    stateCode: 'INPB',
    name: 'Punjab',
    capital: 'Chandigarh',
    tagline: 'Land of Five Rivers, 1947 Partition & the Green Revolution',
    bannerImage: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 297, y: 245 },
    focalPoints: ['1947 Partition Border', 'Golden Temple Amritsar', 'Green Revolution', 'Bhakra Nangal Dam'],
    description: 'The land of five rivers, heroic resistance, the tragic dividing line of Radcliffe, and the agrarian crucible that fed modern India through the Green Revolution.',
    relatedVideos: ['vid-1', 'vid-5'],
    stats: { videos: 19, articles: 8, sources: 51 }
  },
  {
    id: 'bengal',
    stateCode: 'INWB',
    name: 'West Bengal',
    capital: 'Kolkata',
    tagline: 'Cradle of the Bengal Renaissance & Revolutionary Ideology',
    bannerImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 638, y: 450 },
    focalPoints: ['Bengal Renaissance', 'Rabindranath Tagore & Vivekananda', 'Subhas Chandra Bose', '1943 Famine'],
    description: 'The intellectual vanguard of the Indian freedom struggle. Where modern literature, science, and anti-colonial revolutionary ideology were born.',
    relatedVideos: ['vid-1', 'vid-7'],
    stats: { videos: 24, articles: 11, sources: 72 }
  },
  {
    id: 'gujarat',
    stateCode: 'INGJ',
    name: 'Gujarat',
    capital: 'Gandhinagar',
    tagline: 'Harappan Port of Lothal, Dholavira & Father of the Nation',
    bannerImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 186, y: 509 },
    focalPoints: ['Dholavira Water Engineering', 'Lothal Tidal Dock', 'Sardar Patel Integration', 'Sabarmati Satyagraha'],
    description: 'Five thousand years of maritime trade with Mesopotamia. From ancient Harappan dockyards to the non-violent crucible of Mahatma Gandhi and the iron resolve of Sardar Patel.',
    relatedVideos: ['vid-1', 'vid-6'],
    stats: { videos: 26, articles: 10, sources: 78 }
  },
  {
    id: 'rajasthan',
    stateCode: 'INRJ',
    name: 'Rajasthan',
    capital: 'Jaipur',
    tagline: 'Hill Forts of Mewar, Desert Ecology & Chivalric Resistance',
    bannerImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 256, y: 381 },
    focalPoints: ['Chittorgarh & Kumbhalgarh', 'Thar Desert Water Harvesting', 'Maharana Pratap', 'Marwar Caravans'],
    description: 'A land forged by desert resilience, impregnable hilltop fortifications, ingenious stepwells, and unyielding defense of self-governance across millennia.',
    relatedVideos: ['vid-5', 'vid-2'],
    stats: { videos: 28, articles: 12, sources: 82 }
  },
  {
    id: 'karnataka',
    stateCode: 'INKA',
    name: 'Karnataka',
    capital: 'Bengaluru',
    tagline: 'Imperial Glory of Hampi & India’s Deep-Tech Capital',
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 323, y: 723 },
    focalPoints: ['Vijayanagara Capital Hampi', 'Badami Cave Architecture', 'Silicon Plateau of Bengaluru', 'Mysore Kingdom'],
    description: 'The golden age of the Vijayanagara Empire that defended Southern civilizational heritage, seamlessly transitioning into the digital and aerospace powerhouse of modern India.',
    relatedVideos: ['vid-3', 'vid-4'],
    stats: { videos: 31, articles: 13, sources: 89 }
  },
  {
    id: 'kerala',
    stateCode: 'INKL',
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    tagline: 'Muziris Global Spice Port, Chera Kingdom & Human Development',
    bannerImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 317, y: 849 },
    focalPoints: ['Ancient Muziris Trade', 'Kalaripayattu Martial Art', 'Kerala School of Astronomy', 'High Social Indices'],
    description: 'Gateway to the ancient Indian Ocean spice trade connecting Rome, Arabia, and China. Pioneer in the Kerala School of Mathematics and model for universal human development.',
    relatedVideos: ['vid-7', 'vid-3'],
    stats: { videos: 21, articles: 8, sources: 63 }
  },
  {
    id: 'odisha',
    stateCode: 'INOR',
    name: 'Odisha',
    capital: 'Bhubaneswar',
    tagline: 'Maritime Voyages of Kalinga & Sun Temple Astronomy',
    bannerImage: 'https://images.unsplash.com/photo-1600100397608-f010e42e5f80?auto=format&fit=crop&w=1200&q=80',
    mapCoords: { x: 545, y: 575 },
    focalPoints: ['Kalinga War of Ashoka', 'Konark Sun Temple Dial', 'Sadhabas Maritime Trade', 'Puri Jagannath'],
    description: 'The cradle that transformed Emperor Ashoka from conqueror to patron of Dhamma. Celebrated for trans-oceanic voyages to Bali and Java and staggering astronomical architecture.',
    relatedVideos: ['vid-3', 'vid-1'],
    stats: { videos: 19, articles: 7, sources: 54 }
  }
];

export const DAILY_QUIZ = {
  question: 'Which historical document explicitly settled the accession of 565 Princely States into the Dominion of India in 1947?',
  options: [
    'Instrument of Accession (under Govt of India Act 1935)',
    'Simla Agreement of 1945',
    'Radcliffe Boundary Award',
    'Cabinet Mission Memorandum'
  ],
  correctIndex: 0,
  explanation: 'Sardar Vallabhbhai Patel and V.P. Menon drafted the standardized "Instrument of Accession", under which rulers ceded Defence, External Affairs, and Communications to India while retaining internal sovereignty until constitutional unification.',
  sourceLink: 'National Archives of India: File No. 12/Pr/47 (Secret).'
};

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ['partition', '1947', 'radcliffe', 'border', 'punjab', 'bengal'],
    answer: 'The Partition of 1947 was executed under the Mountbatten Plan (3 June Plan). Sir Cyril Radcliffe was appointed Chairman of the Punjab and Bengal Boundary Commissions on July 8, 1947, and submitted boundary awards with only 5 weeks of preparation without visiting the frontier regions.',
    citationVideo: 'vid-1',
    badge: 'Archival Fact Checked',
    reliability: '99% Grounded in Official Cabinet Papers',
    sources: ['HMSO Transfer of Power Vol. XII', 'Radcliffe Commission Reports 1947']
  },
  {
    keywords: ['constitution', 'ambedkar', 'cad', 'debates', 'rights', '395'],
    answer: 'The Indian Constitution was drafted by the Constituent Assembly between December 9, 1946, and November 26, 1949. Dr. B.R. Ambedkar led the 7-member Drafting Committee. It took 2 years, 11 months, and 18 days with 165 plenary sessions.',
    citationVideo: 'vid-2',
    badge: 'Parliamentary Archive',
    reliability: '100% Grounded in Lok Sabha CAD Vol. I-XII',
    sources: ['Constituent Assembly Debates (Official Records)', 'Granville Austin, "The Indian Constitution"']
  },
  {
    keywords: ['chola', 'navy', 'maritime', 'rajendra', 'thanjavur'],
    answer: 'Under Rajaraja Chola I and Rajendra Chola I (985–1044 CE), the Chola Navy utilized state-of-the-art catamaran and flat-keeled vessels to launch overseas expeditions across the Malacca Straits, sacking the Srivijaya maritime empire in Sumatra and Kedah in 1025 CE.',
    citationVideo: 'vid-3',
    badge: 'Epigraphical Record',
    reliability: '98% Grounded in ASI Inscriptions',
    sources: ['Brihadisvara Temple Epigraphs', 'South Indian Inscriptions (ASI, Vol II)']
  },
  {
    keywords: ['telangana', 'hyderabad', 'nizam', '1969', 'kakatiya'],
    answer: 'Telangana’s identity spans the historic Kakatiya kingdom of Warangal (12th–14th century), followed by the Qutb Shahi and Asaf Jahi (Nizam) dynasties. Following Operation Polo in September 1948, Hyderabad State was integrated into India, culminating in the 2014 Andhra Pradesh Reorganisation Act.',
    citationVideo: 'vid-4',
    badge: 'Govt Whitepaper Grounded',
    reliability: '99% Grounded in Home Ministry Gazettes',
    sources: ['Srikrishna Committee Report 2010', 'Gentlemen’s Agreement 1956']
  },
  {
    keywords: ['shivaji', 'maratha', 'forts', 'guerrilla', 'raigad'],
    answer: 'Chhatrapati Shivaji Maharaj pioneered "Ganimi Kava" (strategic guerrilla warfare), leveraging the rugged geography of the Sahyadri mountains. He constructed and refurbished over 300 forts including Rajgad, Raigad, and maritime fortress Sindhudurg, neutralizing Mughal artillery advantages.',
    citationVideo: 'vid-6',
    badge: 'Military Archive',
    reliability: '97% Grounded in Contemporary Bakhars',
    sources: ['Sabhasad Bakhar (1697)', 'State Archives of Maharashtra']
  }
];

export const COMMUNITY_CHANNELS = [
  {
    id: 'general',
    name: 'general-discourse',
    topic: 'Civilizational town hall for open inquiry, breaking analyses & daily perspectives',
    icon: 'MessageSquare',
    memberCount: '4,820 online'
  },
  {
    id: 'history',
    name: 'archival-history',
    topic: 'Declassified files, 1947 Partition boundary papers, ancient empires & primary citations',
    icon: 'BookOpen',
    memberCount: '2,340 online'
  },
  {
    id: 'constitution',
    name: 'constitutional-ideas',
    topic: 'Dr. Ambedkar, Constituent Assembly Debates (1946–49), fundamental rights & federalism',
    icon: 'Scale',
    memberCount: '1,910 online'
  },
  {
    id: 'heritage',
    name: 'regional-canvas',
    topic: 'State cartography, Kakatiya stepwells, Chola maritime navy, temple engineering & living roots',
    icon: 'MapPin',
    memberCount: '1,650 online'
  }
];

export const COMMUNITY_INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    channelId: 'general',
    author: 'Aarav Deshmukh',
    handle: '@aarav_history',
    role: 'Historian Contributor',
    roleColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timestamp: '12m ago',
    text: 'Watching the new documentary on the 1947 Partition files. The fact that Radcliffe had never set foot east of Paris before being given five weeks to draw borders through Punjab & Bengal is staggering.',
    reactions: { '🔥': 24, '💡': 18, '🇮🇳': 31 }
  },
  {
    id: 'msg-2',
    channelId: 'general',
    author: 'Dr. Meera Sen',
    handle: '@meerasen_archivist',
    role: 'Verified Scholar',
    roleColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    timestamp: '9m ago',
    text: 'Yes! And remember the declassified Transfer of Power documents (Vol. XII) explicitly confirm that Mountbatten deliberately delayed releasing the boundary award until August 17th to avoid British administrative liability.',
    reactions: { '💡': 35, '📜': 22, '👏': 16 }
  },
  {
    id: 'msg-3',
    channelId: 'general',
    author: 'Karthik Raja',
    handle: '@karthik_sangam',
    role: 'Citizen Thinker',
    roleColor: 'text-stone-300 border-white/10 bg-white/5',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    timestamp: '4m ago',
    text: 'The 3D interactive India map in the section above is incredible. You can literally click any state and see its primary declassified sources. That’s what digital platforms should look like.',
    reactions: { '🔥': 42, '🇮🇳': 28 }
  },
  {
    id: 'msg-4',
    channelId: 'history',
    author: 'Vikramjit Roy',
    handle: '@vikram_archives',
    role: 'Verified Scholar',
    roleColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    timestamp: '25m ago',
    text: 'Can anyone recommend primary sources on Herbert Risley’s 1901 anthropometric census? Looking into how pre-colonial professional guild mobility was codified into rigid blocks.',
    reactions: { '💡': 14, '📜': 19 }
  },
  {
    id: 'msg-5',
    channelId: 'history',
    author: 'Reflection Research Desk',
    handle: '@reflection_desk',
    role: 'Editorial Core',
    roleColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    timestamp: '18m ago',
    text: 'Check Nicholas Dirks, "Castes of Mind: Colonialism and the Making of Modern India" (Princeton, 2001) and Census of India 1901 Vol. I Ethnographic Appendices. We covered this in the verified source breakdown!',
    reactions: { '🔥': 29, '👏': 21 }
  },
  {
    id: 'msg-6',
    channelId: 'constitution',
    author: 'Adv. Prerna Kulkarni',
    handle: '@prerna_law',
    role: 'Constitutional Jurist',
    roleColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    timestamp: '32m ago',
    text: 'Re-reading CAD Vol. VII today. Dr. Ambedkar’s address on November 4, 1948, defending the draft constitution remains unmatched: "Constitutional morality is not a natural sentiment. It has to be cultivated."',
    reactions: { '💡': 54, '🇮🇳': 48, '👏': 30 }
  },
  {
    id: 'msg-7',
    channelId: 'heritage',
    author: 'Siddharth Varma',
    handle: '@siddharth_kakatiya',
    role: 'Archival Contributor',
    roleColor: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    timestamp: '40m ago',
    text: 'Visited the Ramappa Temple stepwells in Telangana yesterday. The floating bricks technology (density less than water) from 1213 CE still boggles modern civil engineers.',
    reactions: { '🔥': 38, '💡': 26, '🇮🇳': 45 }
  }
];

