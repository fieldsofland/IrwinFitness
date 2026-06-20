# Handoff — Dena Rongakos Resume for Air (Senior Writer role)

**Last updated:** 2026-06-20
**Repo:** `fieldsofland/irwin-fitness-invoice`  ·  **Branch:** `claude/dina-airhq-resume-7q6tik`
**All deliverables live in:** `resume/`

> Purpose of this doc: let another agent (or person) pick up the resume project
> with full context. Read top to bottom; the "Open items" section is what's left.

---

## 1. The ask (what the human wants)
Build a clean, professional resume for the human's friend **Dena Rongakos**
(the human sometimes spells it "Dina" — needs confirming; documents say "Dena").
She is applying for a **social media / writing role at Air ("AirHQ")**. The
human asked to start the work in a repo (we're using the existing repo on a
dedicated branch, since GitHub access is scoped to this one repo).

### Design requirements (latest, supersede earlier versions)
- **Single US Letter page (8.5 × 11in)** — fixed page, what-you-see-is-what-prints. Not a long scrolling web doc.
- **Minimal, black-and-white.** No accent colors, nothing flashy.
- Must fit everything on one page.

---

## 2. The target role (IMPORTANT — it's a writing job)
**Air — Senior Writer (AI + Culture)** · New York, hybrid 3 days/week · $80K–$150K + equity.
Full posting saved at `resume/reference/job-posting.md`.

Key points:
- Owns Air's voice across **LinkedIn and Twitter/X** for both the **brand and the CEO** (ghostwriting).
- Wants **3–5 years writing for tech companies / founders / products / media brands**, deep **SaaS/startup culture** fluency, "extremely online," internet humor/timing.
- Company values: **Act like a driver · Work in public · Play to win · Say the hard thing · Disagree and commit.**
- CEO: Shane Hegde — LinkedIn `https://www.linkedin.com/in/shanehegde` ; Air on X `https://x.com/airHQ` (both login-walled; not auto-fetchable).

### Honest fit assessment (carry this forward)
Dena's background is **brand / social / short-form video in fashion & music**, NOT
tech writing. The core transferable skill — *can build an audience and win
attention from scratch* — is strong and proven by her numbers. The gaps are: the
**written-word/tech-Twitter medium**, the **SaaS/tech domain**, and **ghostwriting
a founder**. The resume is honest about this; it does NOT fabricate tech-writing
experience. **The human has a direct referral that bypasses the interview
process**, which largely neutralizes the recruiter-screen risk.

### Decision on writing samples (settled)
We discussed drafting sample posts in Air's voice, then **decided against it.**
Rationale (the human's, and it's sound): real voice work requires immersion in the
company/product/person; pre-writing posts from the outside can read as someone who
treats voice as a costume. Dena's stance going into the conversation: *"I can
absolutely do this, but I'd learn the company and your voice first."* That honest
posture + the resume + the referral is the plan. **Do not produce fake voice
samples unless the human changes course.**

---

## 3. Dena's background (source material)
Came from photos of an existing resume + a self-reported accomplishments list.

- **Location:** Brooklyn, New York
- **Education:** Fashion Institute of Design & Merchandising (FIDM), B.A. Professional Studies, ~2018–2021 *(dates inferred from low-res image — confirm)*
- **Roles:**
  - **Brand & Content Lead, Casa Cugine (2020–Present)** — the centerpiece. Ran social, but also owned brand direction (website, in-store graphics, packaging, store environment), worked 1:1 weekly with the founder, operated autonomously.
  - **Director / Creative Producer, Freelance (2021–Present)** — music videos, treatments, direction.
  - **Production Designer, Freelance (2020–2024)** — editorial/branded shoots.
  - **Sales Coordinator, GANNI (2024–2025)** — contemporary fashion retail.

### Casa Cugine Instagram metrics (the strongest asset)
From insights screenshots, all credited to Dena (window: Dec 22 – Jun 19, ~6 mo):
- **+76.6% follower growth** → ~46K net new → **106,898 followers**
- **19.8M views**, **4.5M+ accounts reached (+82.8%)**, **~89% of reach from non-followers**
- **1.17M+ interactions**, **77% from non-followers**
- Reels = 93% of views; a recent reel beat her prior 5 by +208%
Raw numbers + framing: `resume/reference/casa-cugine-social-metrics.md`

### Full accomplishments list + curation strategy
`resume/reference/casa-cugine-full-accomplishments.md` holds her complete
self-reported list (scheduling systems, recipe book, DoorDash management, FOH
training, etc.) with **relevance tiers**. The resume intentionally features only
Tier-1 items (brand direction, founder collaboration, content/social, autonomy)
and **omits the operational/retail items** — they make her read as a small-business
generalist rather than a writer, which weakens the pitch for THIS role. If she
ever targets a brand-manager / creative-ops / GM role, that file is the raw
material for a different version.

---

## 4. What's been built (current state)
All in `resume/`:
| File | Description |
|------|-------------|
| `index.html` | The resume. Fixed 8.5×11 page, minimal B&W. Open in a browser; print/Save-as-PDF gives a clean one-pager. **Source of truth for design.** |
| `Dena_Rongakos_Resume.pdf` | Generated PDF (US Letter, B&W). The file to actually send to Air. |
| `Dena_Rongakos_Resume.md` | Plain-text / ATS-friendly version, kept in sync with the HTML. |
| `Cover_Letter_AirHQ.md` | Cover letter tailored to Air (honest about the gap, leads with proof). |
| `README.md` | Export instructions + fields to verify. |
| `reference/job-posting.md` | Full Air job posting + CEO/X links. |
| `reference/casa-cugine-social-metrics.md` | IG stats, raw + interpreted. |
| `reference/casa-cugine-full-accomplishments.md` | Full accomplishments + relevance tiers. |
| `reference/casa-cugine-role-notes.md` | Earlier notes on her expanded role. |

### How the PDF is generated (no browser available in this env)
There is **no headless browser / poppler** in the environment. The PDF is built
with **`@react-pdf/renderer`** from a standalone script at **`/tmp/pdfgen/build.mjs`**
(installed in an isolated `/tmp/pdfgen` npm project so the repo's Next.js/Prisma
deps aren't touched). To regenerate after edits: `cd /tmp/pdfgen && node build.mjs`
(it writes to `resume/Dena_Rongakos_Resume.pdf`). **Note:** the HTML and the PDF
script are two separate sources — **edit both** to keep them in sync. `/tmp` is
ephemeral; a new agent may need to recreate the project: `npm init -y && npm i
@react-pdf/renderer react`, then copy `build.mjs` content from the repo history /
this doc's notes.

### Important environment notes
- GitHub access is **scoped to `fieldsofland/irwin-fitness-invoice` only** — can't
  create a brand-new standalone repo from here. Work lives in the `resume/` subfolder.
- The repo is otherwise an unrelated **Next.js "irwin-fitness-invoice" app** (needs
  Prisma + a Neon DB to build). **Do NOT deploy it to host the resume** — it would
  publish the wrong app. To host the resume, do a *separate* static deploy of just
  `resume/index.html`.

---

## 5. Open items / TODO (what's left)
1. **Real contact info** — `index.html`, the PDF script (`build.mjs`), `Dena_Rongakos_Resume.md`, and `Cover_Letter_AirHQ.md` all use placeholders: `your.email@example.com`, `(000) 000-0000`, `linkedin.com/in/your-handle`. Replace all four, then regenerate the PDF.
2. **Name: "Dena" vs "Dina"** — confirm spelling; currently "Dena" everywhere.
3. **Verify low-res-sourced details** — FIDM dates/degree wording; any music-video/project names if re-added.
4. **One-page fit check** — sized to fit one Letter page but could NOT be visually verified (no PDF→image renderer here). Open the PDF/HTML and confirm nothing spills to page 2; nudge spacing in both `index.html` and `build.mjs` if needed.
5. **Optional:** a private "conversation talking points" doc (how she'd ramp into Air's voice) — discussed, not yet built. Not part of the application.
6. **Possible future:** a separate brand-manager/ops resume version using the full accomplishments list.

---

## 6. Tone / working agreement with the human
- The human wants **honesty over flattery** — including straight talk about role fit. Keep that.
- Keep the resume **minimal and one page**. Resist re-adding color or cramming in the operational accomplishments.
- Deliverables are usually wanted as **downloadable files** (HTML + PDF) and **committed/pushed** to the branch.
