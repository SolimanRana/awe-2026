import { useState } from "react";
import type { FormEvent } from "react";
import type { Evidence, Person } from "../../js/types";
import { loadHypothesis, saveHypothesis } from "../storage";
import type { HypothesisDraft } from "../storage";

type HypothesisFormProps = {
  people: Person[];
  evidence: Evidence[];
};

// DEMO 2: the whole hypothesis form is controlled.
function HypothesisForm({ people, evidence }: HypothesisFormProps) {
  // DEMO 2: ONE state object for the whole form instead of one useState per
  // field. The fields belong together: they are loaded together, saved
  // together and form one draft. The saved draft is the start value.
  const [draft, setDraft] = useState<HypothesisDraft>(loadHypothesis);
  const [showSaved, setShowSaved] = useState(false);

  // changes ONE field and keeps all others (new object, no mutation)
  function update(field: keyof HypothesisDraft, value: string | string[]) {
    setDraft({ ...draft, [field]: value });
  }

  // DEMO 1 + DEMO 2: onSubmit instead of onclick="saveHypothesis()".
  // It reads the values from the state, not from the DOM.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // no page reload
    saveHypothesis(draft);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  }

  return (
    <div className="hypothesis-card">
      <h3>Hypothesis Draft</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="hypSuspect">Suspected responsible person</label>
          <select
            id="hypSuspect"
            value={draft.suspectId}
            onChange={(e) => update("suspectId", e.target.value)}
          >
            <option value="">Select a person…</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypNature">Accidental or deliberate incident</label>
          <select
            id="hypNature"
            value={draft.nature}
            onChange={(e) => update("nature", e.target.value)}
          >
            <option value="">Select…</option>
            <option value="accidental">Accidental</option>
            <option value="deliberate">Deliberate</option>
            <option value="unclear">Unclear</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypEvidence">Selected supporting evidence</label>
          {/* multi-select: the value is an ARRAY of the selected ids */}
          <select
            id="hypEvidence"
            multiple
            size={6}
            value={draft.evidenceIds}
            onChange={(e) =>
              update(
                "evidenceIds",
                Array.from(e.target.selectedOptions, (option) => option.value),
              )
            }
          >
            {evidence.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.id} - {ev.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypConfidence">Confidence (0–100)</label>
          <input
            type="range"
            id="hypConfidence"
            min="0"
            max="100"
            value={draft.confidence}
            onChange={(e) => update("confidence", e.target.value)}
          />
          {/* the number is simply the state, no textContent needed */}
          <output>{draft.confidence}</output>
        </div>

        <div className="form-row">
          <label htmlFor="hypExplanation">Written explanation</label>
          <textarea
            id="hypExplanation"
            rows={4}
            placeholder="Explain your reasoning…"
            value={draft.explanation}
            onChange={(e) => update("explanation", e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="hypAlternative">Alternative explanation</label>
          <textarea
            id="hypAlternative"
            rows={3}
            placeholder="What else could explain the evidence?"
            value={draft.alternative}
            onChange={(e) => update("alternative", e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save hypothesis draft
          </button>
          {showSaved && <span className="saved-msg">Saved</span>}
        </div>
      </form>
    </div>
  );
}

export default HypothesisForm;
