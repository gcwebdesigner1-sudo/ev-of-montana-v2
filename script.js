// Change Anthony's number here; every call/text button on the page uses it.
const PHONE_DISPLAY = "(406) 677-8967";
const PHONE_E164 = "+14066778967";
const EMAIL = "evofmt@gmail.com";

document.querySelectorAll(".js-tel").forEach((a) => (a.href = `tel:${PHONE_E164}`));
document.querySelectorAll(".js-sms").forEach((a) => (a.href = `sms:${PHONE_E164}`));
document.querySelectorAll(".js-phone").forEach((el) => (el.textContent = PHONE_DISPLAY));
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Meta Pixel events. These do nothing until the Pixel is added to the <head>.
const track = (event) => { if (typeof window.fbq === "function") window.fbq("track", event); };
document.querySelectorAll('a[href^="tel:"], a[href^="sms:"]').forEach((a) => a.addEventListener("click", () => track("Contact")));

// Hero room picker: highlights the chip and pre-selects the same room in the form.
const chips = document.querySelectorAll(".chip");
chips.forEach((chip) => {
  chip.setAttribute("aria-pressed", "false");
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    const radio = document.querySelector(`input[name="interest"][value="${chip.dataset.pick}"]`);
    if (radio) radio.checked = true;
    document.getElementById("book").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 700);
  });
});

// The form builds a text (phones) or an email (computers) instead of posting to a server.
const isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
document.getElementById("demo-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  track("Lead");
  const f = new FormData(e.target);
  const body =
    `Hi Anthony, this is ${f.get("name")} in ${f.get("town")} (${f.get("phone")}). ` +
    `I'd like: ${f.get("interest")}. I ${f.get("own") === "Rent" ? "rent" : "own"} my home.` +
    (f.get("when") ? ` Best days/times: ${f.get("when")}.` : "") +
    (f.get("other") ? ` Also: ${f.get("other")}.` : "");
  window.location.href = isPhone
    ? `sms:${PHONE_E164}?&body=${encodeURIComponent(body)}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent("Free room cleaning request")}&body=${encodeURIComponent(body)}`;
});

// Scroll-linked motion, slow and reversible: hero photo drifts, step bar fills with the scroll.
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const heroImg = document.querySelector(".hero-img");
const bar = document.getElementById("progress-bar");
const steps = document.getElementById("steps");
function onScroll() {
  if (reduce.matches) { if (bar) bar.style.transform = "scaleX(1)"; return; }
  const y = window.scrollY;
  if (heroImg && y < 1200) heroImg.style.translate = `0 ${Math.round(y * 0.08)}px`;
  if (bar && steps) {
    const r = steps.getBoundingClientRect();
    const vh = window.innerHeight;
    const t = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
    bar.style.transform = `scaleX(${t.toFixed(3)})`;
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

// Video modal with YouTube's privacy-enhanced embed.
const modal = document.getElementById("video-modal");
if (modal) {
  const frame = modal.querySelector(".vframe");
  document.querySelectorAll(".video").forEach((btn) => {
    btn.addEventListener("click", () => {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${btn.dataset.id}?autoplay=1&rel=0" title="EV International video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      modal.showModal();
    });
  });
  modal.querySelector(".close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener("close", () => { frame.innerHTML = ""; });
}
