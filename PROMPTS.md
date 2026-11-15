- Name and roll number: **Girish Chougule**, MT2026028
- AI tool and plan: Claude (Free plan)

---

## Prompt 1 — generate

**Sent:**

```text
The whole of CONTRACT.md, pasted as one message: the prompt 1 block AND §4
(the shape the tests check). Not "prompt 1, unchanged": I included §4 by mistake.
It was sent in an existing chat, not a new one. Follow-up message: "Do it for me."
```

**What came back:**

Four files in `src/courses/`: `useCourses.js` (hook: three useState, one useEffect with [] and an ignore-flag cleanup, addCourse), `CoursesView.jsx` (no hooks, only renders), `AddCourseForm.jsx` (three useState: form object, submitting, error), `CoursesPage.jsx` (calls useCourses, renders the heading, the View and the form).

Hooks used: only useState and useEffect. Nothing from the "not yet" list.

Not asked for by the contract: a FIELDS array that builds five of the inputs with .map, and a small seatsText() helper in the View.

**Did it run?**

`npm run dev`: list loads (20 courses, in code order); valid add appears in order and the form clears: **Yes**; 409 message shown: **Yes**; fieldErrors shown under the inputs: **Yes**. `npm test`: 62 passed / 0 failed.

**What I did with it:**

Replaced the four placeholders in `src/courses/` with these files, ran the tests and the browser checks, committed it unchanged, then audited it in `AUDIT.md`.

---

## Afterwards

- **How many prompts did the whole feature take?** One generate prompt; no fix prompt was needed because the first version already matched §4.
- **Which of your prompts would you write differently now, and how?** I should have followed the instructions more carefully by copying only the Prompt 1 block into a new chat. I accidentally included §4 and used an existing chat, so the AI already knew the expected final structure. This meant I did not get a genuine first draft to audit.
- **One thing the rules in Prompt 1 prevented (or failed to prevent):** The restriction to `useState` and `useEffect` prevented the AI from using unnecessary hooks such as `useMemo`, `useCallback`, and `useRef`. However, it did not prevent the AI from introducing extra abstractions, such as the `FIELDS` array and `seatsText()` helper, which I still needed to evaluate during the audit.