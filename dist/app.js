"use strict";

// These URLs were supplied by Google Maps' Share > Embed a map interface.
// Imagery is loaded from Google; no Street View media is stored by this app.
const stops = [
  {
    name: "Plant approach",
    subtitle: "The first look",
    description: "Look across the landscaped entrance approach towards Toyota’s Burnaston site. Drag the view to explore the surroundings.",
    pano: "UGqwufZJQ7XnHiFrZRE3-Q",
    embed: "https://www.google.com/maps/embed?pb=!4v1790949748370!6m8!1m7!1sUGqwufZJQ7XnHiFrZRE3-Q!2m2!1d52.87152804013931!2d-1.562064882415664!3f290.2635601762255!4f0!5f0.7820865974627469"
  },
  {
    name: "South entrance",
    subtitle: "Along the access road",
    description: "See the traffic lights and barriers at the south car park access. This stop uses publicly viewable exterior imagery; the factory interior is not part of this tour.",
    pano: "uBwq2ZT8xP0h5pZfPlSnXA",
    embed: "https://www.google.com/maps/embed?pb=!4v1790949861616!6m8!1m7!1suBwq2ZT8xP0h5pZfPlSnXA!2m2!1d52.87060901601924!2d-1.56330891929615!3f260.59294734488094!4f0!5f0.7820865974627469"
  },
  {
    name: "North frontage",
    subtitle: "Landscaped surroundings",
    description: "Turn towards the northern car park access and the green frontage beside the plant. Explore the trees, grass and roadside setting around the site.",
    pano: "FK7oWhM36czbdWcXwisy2A",
    embed: "https://www.google.com/maps/embed?pb=!4v1790949934449!6m8!1m7!1sFK7oWhM36czbdWcXwisy2A!2m2!1d52.87209083365457!2d-1.561312918249496!3f269.33652601998887!4f0!5f0.7820865974627469"
  }
];

let currentStop = 0;
const byId = id => document.getElementById(id);
const streetView = byId("streetView");
const helpDialog = byId("helpDialog");

stops.forEach((stop, index) => {
  const button = document.createElement("button");
  button.className = "stop";
  button.dataset.index = index;
  const number = document.createElement("span");
  number.className = "stop-number";
  number.textContent = String(index + 1).padStart(2, "0");
  const text = document.createElement("span");
  text.className = "stop-text";
  const name = document.createElement("span");
  name.className = "stop-name";
  name.textContent = stop.name;
  const subtitle = document.createElement("span");
  subtitle.className = "stop-subtitle";
  subtitle.textContent = stop.subtitle;
  text.append(name, subtitle);
  button.append(number, text);
  button.addEventListener("click", () => showStop(index));
  byId("stopList").append(button);
  byId("progressDots").append(document.createElement("span"));
});
byId("stopCount").textContent = `${stops.length} stops`;

function showStop(index) {
  if (index < 0 || index >= stops.length) return;
  currentStop = index;
  const stop = stops[index];
  streetView.src = stop.embed;
  streetView.title = `Toyota Burnaston — ${stop.name} — Google Street View`;
  byId("viewTitle").textContent = stop.name;
  byId("viewCounter").textContent = `${String(index + 1).padStart(2, "0")} / ${String(stops.length).padStart(2, "0")}`;
  byId("stopDescription").textContent = stop.description;
  byId("mapsLink").href = `https://www.google.com/maps/@?api=1&map_action=pano&pano=${encodeURIComponent(stop.pano)}`;
  byId("previousButton").disabled = index === 0;
  byId("nextButton").disabled = index === stops.length - 1;
  [...byId("stopList").children].forEach((button, i) => {
    if (i === index) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  [...byId("progressDots").children].forEach((dot, i) => dot.classList.toggle("active", i === index));
}

byId("previousButton").addEventListener("click", () => showStop(currentStop - 1));
byId("nextButton").addEventListener("click", () => showStop(currentStop + 1));
byId("resetButton").addEventListener("click", () => showStop(0));
byId("helpButton").addEventListener("click", () => helpDialog.showModal());
byId("closeHelp").addEventListener("click", () => helpDialog.close());
byId("continueButton").addEventListener("click", () => helpDialog.close());
helpDialog.addEventListener("click", event => {
  const box = helpDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) helpDialog.close();
});
byId("fullscreenButton").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch {
    byId("fullscreenLabel").textContent = "Use browser full screen";
  }
});
document.addEventListener("fullscreenchange", () => {
  byId("fullscreenLabel").textContent = document.fullscreenElement ? "Exit full screen" : "Full screen";
});
document.addEventListener("keydown", event => {
  if (helpDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
  if (event.key === "ArrowRight") { event.preventDefault(); showStop(currentStop + 1); }
  if (event.key === "ArrowLeft") { event.preventDefault(); showStop(currentStop - 1); }
});
function updateConnection() { byId("networkNotice").hidden = navigator.onLine; }
window.addEventListener("online", updateConnection);
window.addEventListener("offline", updateConnection);
updateConnection();
showStop(0);
