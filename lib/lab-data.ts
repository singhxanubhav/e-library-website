export interface ConceptTerm {
  slug: string;
  title: string;
  category: "Economics" | "Architecture" | "Growth" | "Model Strategy";
  summary: string;
  explanation: string;
  example: string;
  svgType: "flywheel" | "drift" | "rag" | "speculative" | "margin" | "cac" | "moat" | "context" | "agent";
}

export const CONCEPT_TERMS: ConceptTerm[] = [
  {
    slug: "data-flywheel",
    title: "The AI Data Flywheel",
    category: "Architecture",
    summary: "A compounding feedback loop where product usage generates proprietary telemetry data to continually improve model accuracy.",
    explanation:
      "When users interact with an AI product (such as developers accepting Cursor code completions or lawyers redlining Harvey contracts), the system captures implicit human feedback. This proprietary telemetry is sanitized and used for reinforcement learning from human feedback (RLHF), creating a continuously widening performance gap against vanilla foundation models.",
    example: "Cursor captures multi-file diff acceptance and rejection keystrokes to fine-tune its speculative completion agents.",
    svgType: "flywheel",
  },
  {
    slug: "fine-tuning-vs-rag",
    title: "Fine-Tuning vs. RAG",
    category: "Architecture",
    summary: "Choosing between embedding domain knowledge into static model weights versus retrieving dynamic context at runtime.",
    explanation:
      "Fine-tuning alters the internal weights of a neural network to teach it specialized syntax, vernacular grammar, or tone. Retrieval-Augmented Generation (RAG) fetches fresh, authoritative external documents from a vector database at query time. High-stakes verticals typically blend both: fine-tuning for domain jargon and RAG for verifiable citations.",
    example: "Harvey fine-tunes base models on legal statutes while using RAG to verify exact SEC filing citations.",
    svgType: "rag",
  },
  {
    slug: "model-drift",
    title: "Model Drift & Degradation",
    category: "Model Strategy",
    summary: "The silent decay of an AI model's accuracy caused by shifts in real-world distribution data over time.",
    explanation:
      "Models trained on historical data inevitably suffer performance degradation as user vocabulary, market conditions, or software dependencies evolve. Without continuous regression evaluation and retraining pipelines, models begin outputting outdated syntax or hallucinated guidance.",
    example: "Observe.ai continually retrains speech acoustic models to prevent transcription accuracy drift as regional slang and telephony codecs shift.",
    svgType: "drift",
  },
  {
    slug: "speculative-decoding",
    title: "Speculative Decoding",
    category: "Architecture",
    summary: "Using a small, fast draft model to speculate multiple tokens ahead, which are then verified in a single parallel pass by the primary LLM.",
    explanation:
      "Generating tokens one by one (autoregression) is memory-bandwidth bound. Speculative decoding pairs a lightweight model (e.g. 1B-3B parameters) to draft 4-8 candidate tokens, while a heavy frontier model checks all candidates simultaneously in one forward pass. If accepted, generation speed jumps 2-3x with identical output quality.",
    example: "Modern developer IDEs use speculative decoding to suggest entire function blocks at typing speed (<100ms).",
    svgType: "speculative",
  },
  {
    slug: "inference-token-margin",
    title: "Inference Token Gross Margin",
    category: "Economics",
    summary: "The vulnerability of software gross margins when user subscription fees are depleted by frontier API compute costs.",
    explanation:
      "Traditional SaaS enjoys 75-85% gross margins because server compute per query is negligible. AI applications consuming frontier models (e.g. Claude 3.5 Sonnet or o1) incur non-trivial marginal token costs per user prompt. Power users can easily consume more compute than their fixed $20/month subscription, compressing gross margins to 35-50% unless cached or quantized.",
    example: "AI coding assistants transition routine code completions to compact internal models to preserve profitability on heavy users.",
    svgType: "margin",
  },
  {
    slug: "cac-ltv-ratio",
    title: "AI CAC vs. LTV Dynamics",
    category: "Growth",
    summary: "Managing customer acquisition costs against accelerated churn in an ecosystem with rapid frontier model commoditization.",
    explanation:
      "Because switching costs between LLM wrappers can be low, AI startups must recover their acquisition cost (CAC) within 3-6 months. Long-term customer lifetime value (LTV) is only secured when the application embeds deeply into core operational workflows, CRM systems, or developer habits.",
    example: "Yellow.ai locks in LTV through bidirectional read-write integrations into SAP, Oracle, and Salesforce.",
    svgType: "cac",
  },
  {
    slug: "defensibility-moats",
    title: "Defensibility & Structural Moats",
    category: "Model Strategy",
    summary: "The sustainable advantages that prevent a product from being obsoleted by the next frontier lab foundation model release.",
    explanation:
      "When a base model provider releases an update that is 10x faster or cheaper, superficial wrapper startups disappear. Sustainable moats include proprietary workflow control, high-friction data pipelines, enterprise compliance certifications, and unique distribution scale.",
    example: "Sarvam AI leverages sovereign on-premise government banking certifications that foreign hyperscalers cannot satisfy.",
    svgType: "moat",
  },
  {
    slug: "context-window-saturation",
    title: "Context Window Saturation",
    category: "Architecture",
    summary: "The 'lost-in-the-middle' phenomenon where models degrade in reasoning accuracy as millions of tokens are crammed into the prompt.",
    explanation:
      "Even though frontier models support 1M+ token context windows, attention mechanisms suffer from attention dispersion. High-value data buried in the middle of a massive context window has a significantly lower probability of accurate retrieval compared to precise, targeted vector embeddings.",
    example: "Cursor uses AST symbol graph extraction to feed only the exact 50 lines of relevant context rather than 10 entire files.",
    svgType: "context",
  },
];
