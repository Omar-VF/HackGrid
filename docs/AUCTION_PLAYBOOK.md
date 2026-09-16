# HackGrid: Auction Strategy & Bidding Playbook

A tactical guide and decision framework for the **HackGrid** live auction.

---

## 1. Executive Summary & The Golden Laws

1. **Total Bankroll**: 10,000 credits across 4 sequential rounds.
2. **Every Team Receives Exactly 1 Resource Per Round**: If you don't win early in a round, you will get an assigned or remaining resource at base price. **Never panic-bid.**
3. **The 1,800 Credit Round 1 Law**: Never spend more than 1,800 cr in Round 1. The core value of your technical demo and judging score is won in **Round 2 (AI Rights)** and **Round 3 (AI Capability)**.
4. **Reserve Schedule**:
   - **Round 1 (Track)**: 3,000 cr locked (Max spendable = 7,000 cr).
   - **Round 2 (AI Rights)**: 2,000 cr locked (Max spendable = Balance − 2,000 cr).
   - **Round 3 (AI Capability)**: 1,000 cr locked (Max spendable = Balance − 1,000 cr).
   - **Round 4 (Customer Segment)**: 0 cr locked (Max spendable = All remaining credits).

---

## 2. Auction Timer & Bidding Tactics

- **13-Second Reset Clock**: Resets after every valid bid.
- **5-Minute Hard Cap**: Resource closes immediately to current high bidder.
- **Zero-Bid Rule**: If 0 bids after 5 minutes, randomly assigned at base price.
- **The Sniping Window**: Never bid in seconds 0–5 of a new countdown. Wait until second **8 or 9**. This denies opponents thinking time and prevents runaway bidding escalation.
- **The "Penultimate Resource" Advantage**: In a pod of $N$ teams, when $N-1$ teams have won, the last remaining team gets the final resource at the starting bid. Never overpay on resource $N-1$ if the remaining resource is acceptable.

---

## 3. Round 1: Sequential Elimination Strategy (Confirmed Order)

The auction proceeds in exact sequential order:
1. **Developer Tools** (1,000 cr | 150 cr inc)
2. **Finance** (800 cr | 125 cr inc)
3. **Healthcare** (600 cr | 100 cr inc) — 🎯 **OUR PRIMARY STRIKE**
4. **Education** (400 cr | 75 cr inc) — 🛡️ **DEFENSIVE SAFETY NET**
5. **Agriculture** (250 cr | — ) — 💰 **BUDGET ARBITRAGE SAFETY NET**

### Sequential Elimination Dynamics
Every time an item is won, that team is **permanently eliminated from bidding for the rest of Round 1**. This creates a massive structural advantage:

- **Resource 1 (Dev Tools)**: **DO NOT BID.** Let rival developer teams exhaust 1,500–2,200 cr. Winner is eliminated.
- **Resource 2 (Finance)**: **DO NOT BID.** Let remaining aggressive teams battle. Winner is eliminated.
- **Resource 3 (Healthcare)**: **STRIKE ZONE.** Top two biggest spenders are already gone!
  - Open at **600 cr**.
  - If countered, bid at second 8/9 of countdown to **800 cr / 1,000 cr**.
  - **Hard Ceiling: 1,200 cr.** (Walk away if someone bids 1,300 cr).
- **Resources 4 & 5 (Education / Agriculture)**:
  - If we folded Healthcare at 1,200 cr, only 1-2 teams remain.
  - Snag Education at 400 cr or Agriculture at 250 cr.
  - Walk into Round 2 with **9,600–9,750 credits** to dominate GenAI and Multi-Agent.

---

## 4. Round 1 Track Bidding Ceilings Summary

| Track | Order | Base Bid | Increment | Priority | Max Ceiling | Tactical Rule |
|---|---|---|---|---|---|---|
| **Developer Tools**| 1st | `1,000 cr` | `150 cr` | Avoid War | `1,300 cr` | Pass. Let rivals exhaust budgets. |
| **Finance** | 2nd | `800 cr` | `125 cr` | Pass | `1,425 cr` | Pass. Eliminates second rival. |
| **Healthcare** | 3rd | `600 cr` | `100 cr` | **#1 Target** | **`1,200 cr`** | **STRIKE.** Bid 600, counter up to 1,200. |
| **Education** | 4th | `400 cr` | `75 cr` | Fallback | **`850 cr`** | Safe fallback if Healthcare folds. |
| **Agriculture** | 5th | `250 cr` | `—` | Arbitrage | **`650 cr`** | Ultimate bankroll builder (9,750 cr left). |

---

## 4. Round 2: AI Rights Strategy

*Reserve Locked: 2,000 cr*

| Resource | Base Bid | Increment | Priority | Max Bid | Strategy |
|---|---|---|---|---|---|
| **Generative AI** | `1,000 cr` | `150 cr` | **#1** | **`3,000 cr`** | Most versatile for fast prototyping, clinical documentation, and natural language interfaces. |
| **Predictive & Analytical AI** | `800 cr` | `125 cr` | **#2** | **`2,200 cr`** | High enterprise credibility. Perfect for Healthcare (sepsis/readmission risk) or Agriculture (crop yield/soil moisture). |
| **Computer Vision** | `600 cr` | `100 cr` | **#3** | **`1,600 cr`** | Strong visual demo (dermatology triage / crop lesion scanning). |
| **Speech & Audio AI** | `400 cr` | `—` | **#4 (Floor)** | **`1,000 cr`** | Ambient doctor-patient consultation scribe. Low-cost fallback. |

---

## 5. Round 3: AI Capability Strategy

*Reserve Locked: 1,000 cr*

> [!IMPORTANT]
> **Strict Integrity Rule**: You must NOT exceed the won capability tier. Single Agent cannot use multi-agent swarms. Single Prompt cannot use tool calling or iterative agent loops.

| Resource | Base Bid | Increment | Priority | Max Bid | Strategy |
|---|---|---|---|---|---|
| **Autonomous Workflow** | `1,000 cr` | `150 cr` | **#1** | **`3,200 cr`** | Full end-to-end autonomous background loop (e.g. intake $\to$ triage $\to$ insurance prior-auth generation). |
| **Multi-Agent (LangGraph)** | `800 cr` | `125 cr` | **#2** | **`2,600 cr`** | Coordinated specialist agents (Triage Agent + Diagnosis Agent + Pharmacist Agent). |
| **Single Agent** | `600 cr` | `100 cr` | **#3** | **`1,800 cr`** | ReAct agent with clinical tools (drug interaction checker, PubMed search). |
| **Single Prompt** | `400 cr` | `—` | **#4 (Floor)** | **`900 cr`** | Zero-agent deterministic completion. Clean, fast, zero integrity risk. |

---

## 6. Round 4: Customer Segment Strategy

*Reserve Locked: 0 cr (Spend all remaining credits)*

| Resource | Base Bid | Increment | Priority | Value Proposition |
|---|---|---|---|---|
| **Organizations** | `1,000 cr` | `150 cr` | **#1** | Hospital networks, enterprise ACOs. Highest contract value ($50k–$250k/yr). |
| **Small Businesses** | `800 cr` | `125 cr` | **#2** | Private clinics, outpatient specialty practices ($500–$2,500/mo). Easiest PMF. |
| **Professionals** | `600 cr` | `100 cr` | **#3** | Solo physicians, freelance radiologists ($99–$299/mo). Clean self-serve SaaS. |
| **Individuals** | `400 cr` | `—` | **#4** | Patients / caregivers ($15–$30/mo consumer subscription). |

---

## 7. Live Auction Tracking Sheet

Keep this table open during the auction to track opponent balances and remaining funds:

| Round | Our Budget Before Round | Won Resource | Price Paid | Remaining Balance | Reserve Locked Next Round | Available Next Bid |
|---|---|---|---|---|---|---|
| **Round 1** | `10,000 cr` | **Agriculture** | **`250 cr`** | `9,750 cr` | `2,000 cr` | `7,750 cr` |
| **Round 2** | `9,750 cr` | **Computer Vision** | **`5,500 cr`** | `4,250 cr` | `1,000 cr` | `3,250 cr` |
| **Round 3** | `4,250 cr` | **Autonomous Workflow**| **`1,000 cr`** | `3,250 cr` | `0 cr` | `3,250 cr` |
| **Round 4** | `3,250 cr` | **Small Businesses** | **`1,550 cr`** | **`1,700 cr`** | `0 cr` | **`COMPLETED`** |

### 🏆 Final Tournament Summary
- **Total Initial Purse**: 10,000 credits
- **Total Credits Spent**: **8,300 credits**
- **Surplus Remaining**: **`1,700 credits`**
- **Official Constraints**: `Agriculture` + `Computer Vision` + `Autonomous Workflow` + `Small Businesses`
