# UI Bug Evaluation Fixture

A deliberately buggy React/Vite dashboard intended for multimodal UI bug-fix evaluation.

## Starting state

This repository is the shared starting point for both models. The evaluator should use the
same commit, prompt, viewport, screenshot, and interaction evidence for every model.

## Local setup

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Evaluation target

The dashboard contains intentional visual and interaction defects. The benchmark prompt should
identify the requested outcome and provide a screenshot of the starting state. Models should
modify the implementation rather than redesign unrelated UI.

## Intentional defects

The initial implementation includes examples of:
- KPI card vertical misalignment.
- Inconsistent heading sizing.
- Avatar shape inconsistent with the surrounding UI.
- A distorted monthly-sales bar.
- Low-contrast select text.
- Missing visible keyboard focus on the select.
- Mobile navigation/overflow compromises.
- A refresh control that only displays feedback and does not update underlying data.

These are deliberately present in the initial commit. The evaluation prompt should focus on a
specific subset rather than asking the model to fix every defect at once.

## Screenshot

Place the comparable starting-state screenshot in `screenshots/buggy-dashboard.png`.
