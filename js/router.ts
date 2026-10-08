// NAVIGATION / HASH ROUTING

import { getViewRendered, setCurrentPage } from "./state.js";
import renderDashboard from "./views/dashboard.js";
import { renderEvidenceList } from "./views/evidence.js";
import { renderPeople, renderLocations } from "./views/people.js";
import { renderTimeline } from "./views/timeline.js";
import renderWorkspace from "./views/workspace.js";

export function navigateTo(viewName: string): void {
  window.location.hash = viewName;
  // handleHashChange() will pick this up via the hashchange listener
}

export function handleHashChange(): void {
  let hash = window.location.hash.replace("#", "");
  const validViews = [
    "dashboard",
    "evidence",
    "people",
    "timeline",
    "workspace",
  ];
  if (validViews.indexOf(hash) === -1) {
    hash = "dashboard";
  }
  setCurrentPage(hash);

  const sections = document.querySelectorAll(".view");
  for (const section of sections) {
    section.classList.remove("active");
  }
  // DEMO 7: getElementById returns `HTMLElement | null`. `hash` is always
  // one of the five known view names by this point (checked above), so the
  // matching #view-<hash> element genuinely always exists in index.html -
  // the `!` here is a deliberate, justified assertion, not a shortcut
  // around thinking about it (see the Demo 7 writeup for a spot where a
  // real type error was NOT this kind of straightforward "trust me").
  document.getElementById("view-" + hash)!.classList.add("active");

  const navButtons = document.querySelectorAll(".nav-btn");
  for (const btn of navButtons) {
    btn.classList.remove("active");
    if (btn.getAttribute("data-view") === hash) {
      btn.classList.add("active");
    }
  }

  const viewRendered = getViewRendered();

  if (hash === "dashboard" && !viewRendered.dashboard) {
    renderDashboard();
    viewRendered.dashboard = true;
  } else if (hash === "evidence" && !viewRendered.evidence) {
    renderEvidenceList();
    viewRendered.evidence = true;
  } else if (hash === "people" && !viewRendered.people) {
    renderPeople();
    renderLocations();
    viewRendered.people = true;
  } else if (hash === "timeline" && !viewRendered.timeline) {
    renderTimeline();
    viewRendered.timeline = true;
  } else if (hash === "workspace") {
    // workspace is cheap enough that it always re-renders
    renderWorkspace();
  }
}

declare global {
  interface Window {
    navigateTo: typeof navigateTo;
  }
}
window.navigateTo = navigateTo;
