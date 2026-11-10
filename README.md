# Progress Note Assistant

A clinician-facing prototype that drafts a hospital progress note for a selected patient. The clinician can trace every sentence back to its source record, edit the draft, and copy it.

**Live demo:** https://progress-note-assistant.vercel.app/

> **Demo only.** All patients, records and notes are fictional and the "AI" is simulated. This is a design and front-end prototype, not a medical device, and it provides no medical advice.

<!-- TODO: add a screenshot or a 15-second GIF here, e.g. ![Screenshot](docs/screenshot.png) -->

## What it does

1. Search patients by name or hospital ID, and filter by department.
2. Click a patient. A progress note is generated automatically (simulated, about 1.4 seconds).
3. The note has four sections: admission and diagnosis, treatment course, current status, plan and follow-up.
4. **Click any sentence** to see which source records support it.
5. **Edit** a section (pencil icon or double-click), save, or restore the original AI text. Edited sections are labelled.
6. Copy one section or the whole note as plain text.
7. Light and dark mode toggle.

## The problem and the design thinking

Clinicians spend a lot of time writing notes from information that already exists in the record. An AI draft can save time, but only if the clinician can trust it and stay in control. The design decisions below come from that.

- **The clinician stays responsible.** Every draft carries a persistent "AI-generated draft, clinician review required" banner. Nothing is final until the clinician has read and, if needed, edited it.
- **Traceability.** Clicking a sentence highlights the exact source records it came from. If a sentence has no source, the interface says so instead of hiding it.
- **No silent guessing.** When information is missing from the records, the draft flags it as `[Not documented: ...]` in a highlighted marker rather than inventing it.
- **Edits are visible.** Edited sections are labelled, lose their source link (because the clinician changed the text), and can be restored to the AI version in one click.
- **Complete states.** Empty, loading, error with retry, ready, and edited are all designed. One demo patient fails on the first attempt to show the error state.
- **Hospital context.** The patient list uses a department filter and an internal patient number (MRN style). A national citizen ID is deliberately not shown. A GP-practice version would need different filters, for example follow-up status instead of department.

## Accessibility

Implemented in this prototype:

- Semantic landmarks (`header`, `nav`, `aside`, `main`) and real `<button>` elements for actions
- Visible keyboard focus (`:focus-visible`), and sentences can be reached and activated with the keyboard
- Labels on all form controls, `aria-live` regions for the patient count, copy confirmation and source explanations
- Minimum 48px targets on icon buttons, flags that do not rely on colour alone (symbols and text)
- Respects `prefers-color-scheme` and `prefers-reduced-motion`

<!-- TODO: only list checks you have actually done, e.g. "Tested keyboard-only navigation", "Checked contrast with the browser devtools". -->

## Tech stack

React 19 and Vite, plain CSS with design tokens as CSS variables (Material Design 3 inspired), no UI library. Deployed on Vercel.

## Project structure

```
src/
├─ App.jsx              shared state: filters, selected patient, generated notes, theme
├─ data.js              fictional patients, source records and note text
├─ utils.js             sentence splitting and source lookup
├─ index.css            design tokens and styles
└─ components/
   ├─ SearchCard.jsx    search and department filter
   ├─ PatientList.jsx   filtered patient list
   ├─ PatientDetail.jsx loading, error and ready states, source records
   ├─ SummarySection.jsx one note section: sentences, editing, copy
   └─ Icon.jsx          SVG icons
```

State lives as close as possible to where it is used. Edit mode is local to each section. The selected sentence is held by the detail view. Notes, filters and theme live in `App`.

## Run locally

```bash
git clone https://github.com/itisfanbutnotfan/progress-note-assistant.git
cd progress-note-assistant
npm install
npm run dev
```

## Mock now, real AI later

Generation is simulated with fixed text and a timer. The source links are hand-authored in `data.js`. In a real version:

- A server-side function would call a language model with the patient's records. The API key must stay on the server, never in front-end code.
- The model would be asked to return each sentence together with the IDs of the records it used, which maps directly onto the `sents` structure the interface already uses.
- Sentences the model cannot ground in a record would be returned with an empty source list and shown with the warning style, as they are now.

## How I used AI

<!-- TODO: edit this section so it describes what you actually did. Interviewers value an honest account. -->

I used an AI assistant (Claude) to help build this project: I described the product, the interactions and the design principles; the assistant generated the code; I ran, reviewed and adjusted it, and learned the React concepts used along the way. Product scope, the human-in-the-loop principle, the traceability feature and the interface design decisions are mine. Please see the commit history for how the project evolved.

## What I would do next

- Real model integration through a server-side function, with citation output
- Figma file linked here, so design and implementation can be compared
- Keyboard shortcuts for common actions
- Tests for the sentence-to-source logic
- A GP-practice variant to compare how filters and workflow differ by care setting

## Licence

MIT, see `LICENSE`. All demo data is fictional.
