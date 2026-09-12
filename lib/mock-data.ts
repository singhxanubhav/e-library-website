import { CompanyData, TagItem, TagType } from "@/types";

export const SEEDED_TAGS: Array<{ type: TagType; value: string }> = [
  // Industry
  { type: "industry", value: "EdTech" },
  { type: "industry", value: "FinTech" },
  { type: "industry", value: "HealthTech" },
  { type: "industry", value: "E-commerce" },
  { type: "industry", value: "Enterprise SaaS" },
  { type: "industry", value: "Consumer AI" },
  { type: "industry", value: "ClimateTech" },
  { type: "industry", value: "Logistics" },
  { type: "industry", value: "Agritech" },

  // Technique
  { type: "technique", value: "NLP" },
  { type: "technique", value: "computer vision" },
  { type: "technique", value: "recommendation systems" },
  { type: "technique", value: "predictive analytics" },
  { type: "technique", value: "generative AI" },
  { type: "technique", value: "speech AI" },
  { type: "technique", value: "fraud detection" },
  { type: "technique", value: "optimization" },

  // BusinessModel
  { type: "business_model", value: "SaaS" },
  { type: "business_model", value: "marketplace" },
  { type: "business_model", value: "freemium" },
  { type: "business_model", value: "usage-based" },
  { type: "business_model", value: "enterprise licensing" },
  { type: "business_model", value: "API-based" },
  { type: "business_model", value: "commission-based" },

  // Geography
  { type: "geography", value: "India" },
  { type: "geography", value: "US" },
  { type: "geography", value: "Europe" },
  { type: "geography", value: "Asia" },
  { type: "geography", value: "Global" },

  // Stage
  { type: "stage", value: "Seed" },
  { type: "stage", value: "Series A-B" },
  { type: "stage", value: "Growth" },
  { type: "stage", value: "Scale-up" },
];

export const SEEDED_COMPANIES: CompanyData[] = [
  {
    id: "comp-1-sarvam",
    slug: "sarvam-ai",
    name: "Sarvam AI",
    logoPermission: false,
    founders: "Vivek Raghavan, Pratyush Kumar",
    foundingYear: 2023,
    hqCity: "Bengaluru",
    hqCountry: "India",
    sector: "Sovereign AI & Foundation Models",
    valueProposition: "Foundational AI models and generative voice stacks purpose-built for India's 22 official languages and diverse socioeconomic contexts.",
    fundingStage: "Series A ($41M)",
    notableInvestors: "Lightspeed Venture Partners, Khosla Ventures, Peak XV Partners",
    problemDescription:
      "Global large language models suffer severe economic and cognitive degradation in non-English vernacular markets. Standard Latin-centric tokenizers fragment Indic scripts like Devanagari, Tamil, and Telugu into 4–8x more tokens per word than English, quadrupling API compute costs and inference latency. Furthermore, Western voice models fail to parse spontaneous multilingual code-switching ('Hinglish' or 'Tanglish') and perform poorly on noisy, inexpensive mobile hardware prevalent across Bharat.",
    aiSolutionDescription:
      "Sarvam engineers custom Indic foundation models (including Sarvam-2B and OpenHathi) built from scratch on curated Indic corpora with custom byte-pair tokenizers achieving token efficiency near parity with English. Their generative voice architecture couples phonetic speech recognition (Shuka) with expressive text-to-speech (Bulbul) and on-device quantized acoustic models, enabling conversational voice agents with sub-200ms latency.",
    businessModelDescription:
      "Dual-engine monetization: 1) Usage-based developer API billed per audio-minute and per 1,000 processed Indic tokens. 2) Sovereign enterprise licensing for public sector banks (SBI, Bank of Baroda), state governments, and telecommunication carriers requiring on-premise air-gapped deployments, custom vernacular fine-tuning, and strict compliance with Indian Digital Personal Data Protection (DPDP) mandates.",
    tractionMetrics: {
      arr: "$4.8M",
      users: "180+ Enterprise Clients",
      queries: "48M+ Audio Mins / Mo",
      growth: "+310% YoY",
      stats: [
        { label: "Supported Languages", value: "22 Official + 10 Dialects" },
        { label: "Token Cost Advantage", value: "68% Cheaper Inference" },
        { label: "Median Audio Latency", value: "185 ms" },
        { label: "Public Sector Reach", value: "12 State Initiatives" },
      ],
    },
    keyInsights: [
      "Tokenization is the hidden economic barrier in vernacular AI: custom vocabularies reduce inference compute expenses by 70%.",
      "In emerging economies, voice-first interfaces surpass text-based bots because they bypass keyboard constraints and multi-script literacy divides.",
      "Sovereign data residency acts as an enterprise moat: domestic defense, healthcare, and banking regulations mandate local model weights.",
      "Hybrid public-private partnerships accelerate corpus curation for low-resource languages that web scrapers fail to harvest.",
    ],
    funFact:
      "Co-founder Vivek Raghavan previously served as chief technology architect for Aadhaar—India's biometric identity system covering 1.4 billion citizens—bringing population-scale reliability to modern AI foundation models.",
    readingTimeMin: 7,
    isFeatured: true,
    tags: {
      industry: ["Enterprise SaaS", "Consumer AI"],
      technique: ["NLP", "generative AI", "speech AI"],
      business_model: ["API-based", "enterprise licensing"],
      geography: ["India"],
      stage: ["Series A-B"],
    },
    interaction: {
      id: "inter-sarvam-1",
      type: "poll",
      promptText: "What represents Sarvam AI's most defensible competitive moat against frontier global foundation labs like OpenAI and Google?",
      options: [
        { id: "opt-1", text: "Custom Indic tokenizers & phonetic speech models", percentage: 41 },
        { id: "opt-2", text: "Sovereign data residency & domestic government contracts", percentage: 34 },
        { id: "opt-3", text: "Proprietary vernacular corpora & synthetic code-switching datasets", percentage: 16 },
        { id: "opt-4", text: "Deep distribution lock-in across Indian public sector banking", percentage: 9 },
      ],
      totalVotes: 1420,
    },
  },
  {
    id: "comp-2-krutrim",
    slug: "krutrim",
    name: "Krutrim",
    logoPermission: false,
    founders: "Bhavish Aggarwal",
    foundingYear: 2023,
    hqCity: "Bengaluru",
    hqCountry: "India",
    sector: "Full-Stack AI Cloud & Silicon",
    valueProposition: "India's first AI unicorn building a vertically integrated AI stack from multilingual LLMs to dedicated AI compute cloud and custom silicon.",
    fundingStage: "Growth ($50M Unicorn)",
    notableInvestors: "Matrix Partners India, SFV, Bapna Holdings",
    problemDescription:
      "India generates over 20% of the world's digital data footprint but historically hosted less than 3% of global high-performance AI compute infrastructure. Reliance on foreign hyperscalers (AWS, Azure, GCP) creates currency depreciation exposure, high bandwidth egress charges, and geopolitical vulnerability for Indian technology firms and national data sovereignty.",
    aiSolutionDescription:
      "Krutrim delivers a vertically integrated AI ecosystem: 1) Krutrim-1 & Krutrim-2 foundation models trained on 2+ trillion tokens across 22 Indian languages; 2) Krutrim Cloud offering GPU-as-a-Service, managed endpoints, and model inference pipelines; 3) Long-term custom silicon architecture (Bodhi processors) co-designed for matrix multiplication and high-throughput transformer inference.",
    businessModelDescription:
      "Compute infrastructure and developer platform monetization: 1) Hourly and reserved GPU cloud compute billing (NVIDIA H100s/H200s and upcoming proprietary chips); 2) Token-metered API endpoints for foundation model access; 3) Enterprise bundled software licenses integrating with Ola Cabs and Ola Electric consumer ecosystem.",
    tractionMetrics: {
      arr: "$9.2M",
      users: "50,000+ Registered Devs",
      queries: "120M+ Weekly Inference Tokens",
      growth: "+450% YoY",
      stats: [
        { label: "Token Corpus", value: "2.0 Trillion Tokens" },
        { label: "Unicorn Valuation", value: "$1.0 Billion" },
        { label: "Cloud GPU Clusters", value: "4 Data Centers in India" },
        { label: "Native Languages", value: "22 Scheduled Languages" },
      ],
    },
    keyInsights: [
      "Vertical integration across silicon, cloud, and models builds resistance against compute supply chain shocks.",
      "Anchor consumer workloads (Ola rides, EV navigation) provide zero-acquisition-cost training data and continuous stress-testing.",
      "National cloud sovereignty creates strong procurement tailwinds from domestic defense and infrastructure sectors.",
      "Long-term margin expansion requires transitioning from renting foreign GPUs to manufacturing proprietary inference chips.",
    ],
    funFact:
      "Krutrim achieved unicorn status ($1B valuation) within just 90 days of unveiling its first model, making it India's fastest startup to achieve unicorn valuation in history.",
    readingTimeMin: 8,
    isFeatured: true,
    tags: {
      industry: ["Enterprise SaaS", "Consumer AI"],
      technique: ["generative AI", "NLP", "optimization"],
      business_model: ["usage-based", "SaaS"],
      geography: ["India"],
      stage: ["Growth"],
    },
    interaction: {
      id: "inter-krutrim-1",
      type: "tradeoff",
      promptText: "If you were chief revenue officer at Krutrim Cloud, what would be your primary monetization priority over the next 18 months?",
      options: [
        { id: "opt-1", text: "Aggressive GPU compute pricing to lure Indian developers away from AWS/GCP", percentage: 48 },
        { id: "opt-2", text: "Specialized sovereign enterprise contracts with public sector and state ministries", percentage: 32 },
        { id: "opt-3", text: "Consumer AI assistant monetization bundled with Ola mobility subscriptions", percentage: 20 },
      ],
      totalVotes: 980,
    },
  },
  {
    id: "comp-3-yellow-ai",
    slug: "yellow-ai",
    name: "Yellow.ai",
    logoPermission: false,
    founders: "Raghu Ravinutala, Rashid Khan, Jaya Kishore Reddy",
    foundingYear: 2016,
    hqCity: "San Mateo & Bengaluru",
    hqCountry: "India",
    sector: "Enterprise Conversational AI",
    valueProposition: "Autonomous multi-agent customer experience platform handling omnichannel enterprise support across voice and text in 135+ languages.",
    fundingStage: "Scale-up ($102M)",
    notableInvestors: "Sapphire Ventures, Lightspeed Venture Partners, WestBridge Capital",
    problemDescription:
      "Global enterprises spend billions annually on human contact center labor, yet suffer customer wait times exceeding 15 minutes, high agent burnout (exceeding 40% annual turnover), and inconsistent resolution quality. Legacy rule-based decision trees failed at subtle intent recognition, customer sentiment shifts, and multi-turn complex troubleshooting.",
    aiSolutionDescription:
      "Yellow.ai pioneered DynamicNLP combined with generative AI orchestrator agents. Their platform connects with enterprise CRM, ERP, and inventory backends (Salesforce, SAP, Zendesk) to autonomously resolve customer queries without human intervention across 35+ channels (WhatsApp, voice telephony, web chat, mobile apps), maintaining 90%+ first-contact resolution with automatic guardrails and human handoff.",
    businessModelDescription:
      "Enterprise SaaS + consumption-based pricing: Tiered annual subscription licenses based on core agent capabilities, plus volume billing based on Autonomous Interactions (resolved conversations without human agent intervention). Add-on fees for specialized voice bots, sentiment analysis, and dedicated enterprise compliance security clusters.",
    tractionMetrics: {
      arr: "$38.0M",
      users: "1,100+ Global Enterprises",
      queries: "2.4B+ Interactions / Yr",
      growth: "+85% YoY",
      stats: [
        { label: "Deflection Rate", value: "92% Autonomous Resolution" },
        { label: "Supported Languages", value: "135+ Dialects" },
        { label: "Average First Response", value: "<1.2 Seconds" },
        { label: "Net Revenue Retention", value: "128%" },
      ],
    },
    keyInsights: [
      "Outcome-based pricing (charging per resolved conversation rather than per seat) aligns vendor revenue with client cost savings.",
      "True enterprise customer loyalty requires deep bi-directional CRM/ERP read-write integrations, creating insurmountable switching costs.",
      "Multi-agent fallback architecture prevents hallucination risk by executing programmatic deterministic business rules at the execution edge.",
      "Omnichannel parity (handling phone calls with the exact same brain as WhatsApp messages) is mandatory for modern enterprise satisfaction.",
    ],
    funFact:
      "Yellow.ai's dynamic bots manage customer service for over 15% of all WhatsApp business interactions in Southeast Asia, handling major airlines, banks, and telecom utilities.",
    readingTimeMin: 8,
    isFeatured: false,
    tags: {
      industry: ["Enterprise SaaS", "FinTech", "E-commerce"],
      technique: ["NLP", "speech AI", "generative AI"],
      business_model: ["SaaS", "usage-based"],
      geography: ["India", "Global"],
      stage: ["Scale-up"],
    },
    interaction: {
      id: "inter-yellow-1",
      type: "challenge",
      promptText: "An enterprise banking client's customer inquiry triggers an AI confidence score of 62% (below the 70% threshold). What should the orchestrator do?",
      options: [
        { id: "opt-1", text: "Instantly route to a live human banker with real-time intent summary and suggested responses", percentage: 58 },
        { id: "opt-2", text: "Ask the customer a single clarifying multi-choice question to boost confidence above 75%", percentage: 29 },
        { id: "opt-3", text: "Execute an automated fallback knowledge-base article and offer a callback schedule", percentage: 13 },
      ],
      totalVotes: 1120,
    },
  },
  {
    id: "comp-4-observe-ai",
    slug: "observe-ai",
    name: "Observe.ai",
    logoPermission: false,
    founders: "Swapnil Jain, Akash Singh, Sharath Keshava Narayana",
    foundingYear: 2017,
    hqCity: "San Francisco & Bengaluru",
    hqCountry: "US",
    sector: "Speech Intelligence & Agent Performance",
    valueProposition: "Real-time speech-to-text intelligence and generative coaching for enterprise contact centers to drive revenue and compliance.",
    fundingStage: "Series C ($213M)",
    notableInvestors: "SoftBank Vision Fund 2, Menlo Ventures, Scale Venture Partners",
    problemDescription:
      "In traditional contact centers, Quality Assurance (QA) teams manually listen to less than 2% of customer service phone calls. This leaves 98% of customer interactions unmonitored, leading to massive undetected compliance violations, lost upsell opportunities, and customer churn with zero actionable analytics.",
    aiSolutionDescription:
      "Observe.ai deploys deep speech-to-text acoustic neural networks and domain-trained generative LLMs to transcribe and analyze 100% of customer interactions in real time. The platform surfaces live compliance alerts, customer sentiment trajectory, competitive mentions, and provides agents with in-the-moment coaching nudges to close deals and de-escalate angry callers.",
    businessModelDescription:
      "Per-agent SaaS seat pricing + audio-hour consumption tiers: Enterprise contracts billed annually based on active contact center agent seats ($80–$160/agent/month) and metered call volume recording and speech transcription processing.",
    tractionMetrics: {
      arr: "$52.0M",
      users: "450+ Enterprise Call Centers",
      queries: "1.2B+ Minutes Transcribed",
      growth: "+95% YoY",
      stats: [
        { label: "Call Coverage", value: "100% (vs 2% manual)" },
        { label: "Compliance Risk Reduction", value: "44%" },
        { label: "Agent Productivity Boost", value: "+23% Sales Conversion" },
        { label: "Real-Time Latency", value: "<600ms Streamed Text" },
      ],
    },
    keyInsights: [
      "Real-time guidance is 5x more valuable than post-call analytics because it changes the outcome of the live conversation before the caller hangs up.",
      "Speech-to-text accuracy in real-world telephony requires handling low-bandwidth 8kHz audio, heavy background noise, and overlapping speech.",
      "Enterprise ROI is proven through compliance violation prevention: dodging a single regulatory fine can justify the entire software contract.",
    ],
    funFact:
      "Observe.ai began inside the Alchemist Accelerator in Silicon Valley by three Indian engineers who originally tried building a consumer voice assistant before pivoting to call center analytics.",
    readingTimeMin: 6,
    isFeatured: false,
    tags: {
      industry: ["Enterprise SaaS", "FinTech"],
      technique: ["speech AI", "NLP", "predictive analytics"],
      business_model: ["SaaS", "usage-based"],
      geography: ["US", "India"],
      stage: ["Series A-B"],
    },
    interaction: {
      id: "inter-observe-1",
      type: "peer_insight",
      promptText: "What is the single biggest bottleneck contact centers face when implementing real-time generative AI agent coaching?",
      options: [
        { id: "opt-1", text: "Audio streaming latency over legacy telephony infrastructure (SIP/PBX)", percentage: 38 },
        { id: "opt-2", text: "Agent distraction from too many UI alerts while trying to speak with customers", percentage: 35 },
        { id: "opt-3", text: "Enterprise security concerns around recording sensitive PII / credit card numbers", percentage: 27 },
      ],
      totalVotes: 740,
    },
  },
  {
    id: "comp-5-cursor",
    slug: "cursor",
    name: "Cursor (Anysphere)",
    logoPermission: false,
    founders: "Michael Truell, Sualeh Asif, Arvid Lunnemark, Aman Sanger",
    foundingYear: 2022,
    hqCity: "San Francisco",
    hqCountry: "US",
    sector: "AI Developer Tools & Agentic IDEs",
    valueProposition: "An AI-first code editor forked from VS Code that deeply indexes entire codebases for instant context retrieval and multi-file code editing.",
    fundingStage: "Series A ($60M+)",
    notableInvestors: "OpenAI Startup Fund, Andreessen Horowitz, Patrick Collison, Nat Friedman",
    problemDescription:
      "Software developers spend upwards of 65% of their working hours reading legacy code, debugging unfamiliar syntax, and writing repetitive glue logic rather than designing novel architectures. First-generation AI autocomplete extensions (like early Copilot) lacked repository-level contextual memory, hallucinated invalid imports, and could only edit a single file one line at a time.",
    aiSolutionDescription:
      "Cursor forked Microsoft's open-source VS Code to control the entire editor interface. They implemented custom Merkle-tree codebase embeddings for sub-second semantic retrieval across tens of thousands of files, shadow workspace execution for validating compiler errors, and custom diffusion/transformer speculative decoders that draft and apply multi-file edits in seconds.",
    businessModelDescription:
      "Freemium developer subscription with usage-based expansion: Free tier with limited GPT-4o / Claude 3.5 Sonnet queries. Pro tier ($20/month) for individual engineers with fast frontier model access and unlimited completions. Business/Enterprise tier ($40/seat/month) offering privacy-guaranteed zero-data retention, centralized billing, and custom local embedding indexing.",
    tractionMetrics: {
      arr: "$65.0M",
      users: "1.2M+ Active Developers",
      queries: "850M+ Code Edits Accepted / Mo",
      growth: "+900% YoY",
      stats: [
        { label: "Acceptance Rate", value: "37% of Suggested Lines" },
        { label: "Daily Active Retention", value: "68% at Day 90" },
        { label: "Repo Indexing Speed", value: "50,000 files in <40s" },
        { label: "Team Velocity Impact", value: "+32% PR Throughput" },
      ],
    },
    keyInsights: [
      "Controlling the editor frame (forking VS Code) rather than building a plugin enabled UI affordances (inline diffs, terminal execution) that plugins cannot achieve.",
      "Code retrieval accuracy matters far more than parameter count: feeding precise AST context to a 70B model beats feeding raw files to a 1T model.",
      "Developer bottom-up adoption with zero-sales-rep product-led growth (PLG) created enterprise sales velocity faster than traditional enterprise outbound.",
      "Multi-file predictive diffs ('Composer') transformed AI from a typing aid into an autonomous software engineer collaborator.",
    ],
    funFact:
      "The four founders met as undergrads at MIT studying computer science and mathematics, building Cursor out of their shared frustration with debugging long compiler errors in distributed systems courses.",
    readingTimeMin: 9,
    isFeatured: true,
    tags: {
      industry: ["Enterprise SaaS"],
      technique: ["NLP", "generative AI", "optimization"],
      business_model: ["freemium", "SaaS", "usage-based"],
      geography: ["US", "Global"],
      stage: ["Series A-B"],
    },
    interaction: {
      id: "inter-cursor-1",
      type: "tradeoff",
      promptText: "Cursor absorbs frontier model API costs (Claude 3.5 Sonnet / OpenAI o1) inside its $20/month Pro tier. As multi-step reasoning models consume 10x more compute, what should Cursor do to preserve unit economics?",
      options: [
        { id: "opt-1", text: "Switch heavy users to a hard token quota with strict pay-as-you-go metered overages", percentage: 46 },
        { id: "opt-2", text: "Train proprietary smaller distilled models (14B-32B) for 80% of routine code generation tasks", percentage: 42 },
        { id: "opt-3", text: "Increase the baseline Pro subscription price from $20 to $35/month", percentage: 12 },
      ],
      totalVotes: 1890,
    },
  },
  {
    id: "comp-6-harvey-ai",
    slug: "harvey-ai",
    name: "Harvey AI",
    logoPermission: false,
    founders: "Gabriel Pereyra, Winston Weinberg",
    foundingYear: 2022,
    hqCity: "San Francisco",
    hqCountry: "US",
    sector: "LegalTech & Enterprise Domain LLMs",
    valueProposition: "Generative AI platform designed specifically for premier law firms and enterprise legal departments for contract analysis, due diligence, and litigation research.",
    fundingStage: "Series C ($100M+)",
    notableInvestors: "Sequoia Capital, Kleiner Perkins, OpenAI Startup Fund, GV",
    problemDescription:
      "In high-stakes corporate mergers, acquisitions, and class-action litigation, lawyers review hundreds of thousands of complex legal agreements, SEC filings, and judicial precedents. Junior associates bill $600–$1,000/hour doing painstaking manual extraction where a single missed clause or citation hallucination can result in multimillion-dollar malpractice liability.",
    aiSolutionDescription:
      "Harvey partners directly with OpenAI to fine-tune specialized foundation models with legal terminology, statutory reasoning, and regulatory precedents. The platform incorporates deterministic retrieval-augmented generation (RAG) with cryptographic citation verification, ensuring every sentence generated links back to an exact paragraph in a verified legal filing with enterprise SOC 2 Type II and HIPAA data isolation.",
    businessModelDescription:
      "High-ACV (Annual Contract Value) enterprise licensing: Minimum six-figure annual enterprise contracts priced per attorney seat ($1,200–$2,500/attorney/year) for top global law firms (Allen & Overy, PwC, Latham & Watkins) and Fortune 500 in-house general counsel teams.",
    tractionMetrics: {
      arr: "$30.0M",
      users: "25,000+ Corporate Attorneys",
      queries: "15M+ Contract Pages Analyzed",
      growth: "+400% YoY",
      stats: [
        { label: "Due Diligence Time Saved", value: "72% Reduction" },
        { label: "Citation Hallucination Rate", value: "<0.01% with Verified RAG" },
        { label: "Top 100 Law Firms", value: "35+ Active Clients" },
        { label: "Average Enterprise Contract", value: "$280,000 / Yr" },
      ],
    },
    keyInsights: [
      "In high-liability verticals like law, accuracy and traceability are 100x more crucial than conversational fluency.",
      "Prestigious brand validation (onboarding Magic Circle firm Allen & Overy early) de-risked the product for the entire conservative legal sector.",
      "Data privacy guarantees (guaranteeing customer data is never used to train shared foundation models) are non-negotiable prerequisites for enterprise sales.",
      "High price points signal enterprise security and regulatory rigor to risk-averse legal buyers.",
    ],
    funFact:
      "Co-founder Winston Weinberg was a practicing litigator at O'Melveny & Myers, while co-founder Gabriel Pereyra was a research scientist at DeepMind and OpenAI—uniting deep legal domain experience with frontier AI science.",
    readingTimeMin: 8,
    isFeatured: true,
    tags: {
      industry: ["Enterprise SaaS"],
      technique: ["NLP", "generative AI", "predictive analytics"],
      business_model: ["enterprise licensing", "SaaS"],
      geography: ["US", "Europe", "Global"],
      stage: ["Series A-B"],
    },
    interaction: {
      id: "inter-harvey-1",
      type: "poll",
      promptText: "What is the primary factor preventing law firms from building their own in-house AI contract analysis pipelines using raw OpenAI / Anthropic APIs?",
      options: [
        { id: "opt-1", text: "Liability & insurance mandates requiring third-party audit verification", percentage: 44 },
        { id: "opt-2", text: "Lack of in-house machine learning and RAG pipeline engineering talent", percentage: 33 },
        { id: "opt-3", text: "Complex document ingestion across scanned PDFs, footnotes, and multi-column legal formats", percentage: 23 },
      ],
      totalVotes: 1310,
    },
  },
  {
    id: "comp-7-perplexity-ai",
    slug: "perplexity-ai",
    name: "Perplexity AI",
    logoPermission: false,
    founders: "Aravind Srinivas, Denis Yarats, Johnny Ho, Andy Konwinski",
    foundingYear: 2022,
    hqCity: "San Francisco",
    hqCountry: "US",
    sector: "Conversational Search & Knowledge Discovery",
    valueProposition: "An answer engine delivering direct synthesized responses with cited web sources, replacing traditional ten-blue-link search engines.",
    fundingStage: "Series B ($165M+)",
    notableInvestors: "IVP, New Enterprise Associates (NEA), Nvidia, Jeff Bezos, Nat Friedman",
    problemDescription:
      "Traditional search engines are clogged with sponsored ads, affiliate marketing link-farms, and SEO manipulation. When researching complex multi-layered questions, knowledge workers must open 10–20 browser tabs, skim through fluff, and synthesize the findings themselves while being bombarded with cookie banners and popups.",
    aiSolutionDescription:
      "Perplexity built an end-to-end real-time search index coupled with a multi-step retrieval-augmented synthesis engine. When a user queries Perplexity, it analyzes intent, performs multi-query search retrieval across live web indexes, scores source credibility, and utilizes frontier LLMs (Claude, GPT-4, proprietary Sonar models) to generate a concise, cited markdown answer with suggested follow-up questions.",
    businessModelDescription:
      "Consumer and Enterprise subscription + publisher revenue sharing: 1) Perplexity Pro subscription ($20/month or $200/year) for power searchers, offering file uploads, model switching, and API access. 2) Perplexity Enterprise Pro ($40/seat/month) with SSO, SOC2 compliance, and internal enterprise document search. 3) Publisher Revenue Share Program sharing ad and subscription margins with news organizations when their articles are cited.",
    tractionMetrics: {
      arr: "$50.0M",
      users: "15M+ Monthly Active Users",
      queries: "350M+ Monthly Queries Processed",
      growth: "+650% YoY",
      stats: [
        { label: "Daily Query Volume", value: "12M+ Queries" },
        { label: "Pro Paid Subscribers", value: "220,000+" },
        { label: "Average Query Latency", value: "1.4 Seconds" },
        { label: "Valuation Benchmark", value: "$3.0+ Billion" },
      ],
    },
    keyInsights: [
      "Knowledge workers value synthesized accuracy and source citations 10x more than page rankings.",
      "Publisher alignment through revenue sharing is essential to survive copyright challenges and protect the open web.",
      "Multi-query decomposition (turning one user question into 4 targeted web search calls) drastically cuts hallucination rates.",
      "Speed is a moat: keeping real-time web retrieval + LLM synthesis under 2 seconds creates high daily habit retention.",
    ],
    funFact:
      "CEO Aravind Srinivas previously conducted AI research at OpenAI and DeepMind, and was a key contributor to pioneering research papers on contrastive visual representation learning and self-attention.",
    readingTimeMin: 7,
    isFeatured: true,
    tags: {
      industry: ["Consumer AI", "Enterprise SaaS"],
      technique: ["NLP", "generative AI", "recommendation systems"],
      business_model: ["freemium", "SaaS", "API-based"],
      geography: ["US", "Global"],
      stage: ["Series A-B"],
    },
    interaction: {
      id: "inter-perplexity-1",
      type: "poll",
      promptText: "Will AI-synthesized answer engines permanently displace Google's 90% search monopoly among knowledge workers by 2028?",
      options: [
        { id: "opt-1", text: "Yes, for research, coding, and factual queries where synthesis saves time", percentage: 54 },
        { id: "opt-2", text: "No, Google's Android/Chrome distribution and AI Overviews will retain most users", percentage: 33 },
        { id: "opt-3", text: "They will co-exist: Perplexity for deep work, Google for local/commercial shopping", percentage: 13 },
      ],
      totalVotes: 2150,
    },
  },
  {
    id: "comp-8-elevenlabs",
    slug: "elevenlabs",
    name: "ElevenLabs",
    logoPermission: false,
    founders: "Piotr Dabkowski, Mati Staniszewski",
    foundingYear: 2022,
    hqCity: "London & New York",
    hqCountry: "Europe",
    sector: "Generative Audio & Synthetic Speech",
    valueProposition: "Industry-leading speech synthesis and voice cloning platform generating ultra-realistic, emotionally expressive speech in 29+ languages.",
    fundingStage: "Series B ($101M+)",
    notableInvestors: "Andreessen Horowitz, Nat Friedman, Daniel Gross, Sequoia Capital",
    problemDescription:
      "Traditional text-to-speech (TTS) engines sound robotic, monotone, and easily recognizable as artificial. Professional voiceover recording for audiobooks, video games, corporate training, and multilingual dubbing costs thousands of dollars per hour, takes weeks of studio time, and fails to preserve an actor's unique vocal identity when translating into foreign languages.",
    aiSolutionDescription:
      "ElevenLabs built proprietary latent diffusion acoustic models capable of one-shot voice cloning from just 60 seconds of audio. The model captures pacing, breath pauses, subtle vocal inflections, and emotional nuance. Their cross-lingual dubbing pipeline translates spoken dialogue into 29+ languages while automatically preserving the original speaker's exact pitch, timber, and cadence.",
    businessModelDescription:
      "Self-serve usage-based subscription + Enterprise API platform: 1) Tiered monthly plans from Free to Pro ($5–$330/month) metered by character generation credits. 2) High-volume API enterprise licensing for gaming studios (Paradox), publishing houses (HarperCollins), and media networks. 3) Voice Actor Marketplace allowing talent to license verified voice clones and earn recurring royalties on every generation.",
    tractionMetrics: {
      arr: "$75.0M",
      users: "2.5M+ Registered Creators",
      queries: "100+ Years of Audio Generated / Mo",
      growth: "+800% YoY",
      stats: [
        { label: "Supported Languages", value: "29+ with Accent Preservation" },
        { label: "Voice Library Clones", value: "10,000+ Verified Voices" },
        { label: "Audiobook Production Speed", value: "10x Faster than Studio" },
        { label: "Valuation Benchmark", value: "$1.1 Billion Unicorn" },
      ],
    },
    keyInsights: [
      "Voice cloning requires solving emotional inflection, cadence, and breath control—not merely clear pronunciation.",
      "The Voice Actor Payout Marketplace flipped voice artists from adversaries of AI into stakeholders earning passive royalties.",
      "Zero-shot multilingual dubbing removes the barrier to international media distribution for independent creators.",
      "Proactive watermarking and voice-authenticity detection tools are essential to counter deepfake and fraud concerns.",
    ],
    funFact:
      "Founders Mati and Piotr grew up in Poland and were inspired to launch ElevenLabs after watching poorly dubbed American films where a single male voice artist monotonously read all character dialogues in Polish.",
    readingTimeMin: 7,
    isFeatured: true,
    tags: {
      industry: ["Consumer AI", "Enterprise SaaS"],
      technique: ["speech AI", "generative AI", "NLP"],
      business_model: ["usage-based", "API-based", "freemium"],
      geography: ["Europe", "US", "Global"],
      stage: ["Series A-B"],
    },
    interaction: {
      id: "inter-elevenlabs-1",
      type: "challenge",
      promptText: "How should generative voice platforms balance open API velocity with the grave risk of automated voice cloning financial scams?",
      options: [
        { id: "opt-1", text: "Mandatory biometric voice verification and government ID before allowing any custom voice cloning", percentage: 52 },
        { id: "opt-2", text: "Cryptographic audio watermarking in all generated audio tracks detectable by telcos and banks", percentage: 36 },
        { id: "opt-3", text: "Restrict realistic cloning APIs exclusively to pre-vetted enterprise corporate accounts", percentage: 12 },
      ],
      totalVotes: 1640,
    },
  },
];

export const SEEDED_THEMES = [
  {
    slug: "sovereign-multilingual-ai",
    name: "Sovereign & Multilingual AI",
    description: "Startups engineering vernacular tokenizers, sovereign data pipelines, and local AI cloud compute for non-English high-growth markets.",
    companySlugs: ["sarvam-ai", "krutrim"],
  },
  {
    slug: "enterprise-automation-agents",
    name: "Enterprise AI Agents & Workflow Automation",
    description: "Companies moving past simple chatbots to autonomous multi-turn agents resolving complex customer operations and high-stakes legal due diligence.",
    companySlugs: ["yellow-ai", "observe-ai", "harvey-ai"],
  },
  {
    slug: "next-gen-developer-consumer-experience",
    name: "Next-Gen Developer & Consumer Intelligence",
    description: "Pioneers transforming how developers write software, how humans search the web, and how creators synthesize emotional voice.",
    companySlugs: ["cursor", "perplexity-ai", "elevenlabs"],
  },
];
