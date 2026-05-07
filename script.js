const soundButtons = document.querySelectorAll(".sound-button");
const blendWord = document.querySelector("#blendWord");
const blendHint = document.querySelector("#blendHint");

soundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    soundButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    blendWord.textContent = button.dataset.word;
    blendHint.textContent = button.dataset.hint;
  });
});

const styleTabs = document.querySelectorAll(".style-tab");
const momentTitle = document.querySelector("#momentTitle");
const momentBody = document.querySelector("#momentBody");
const momentOutcome = document.querySelector("#momentOutcome");
const momentChips = document.querySelector("#momentChips");

styleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    styleTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    momentTitle.textContent = tab.dataset.title;
    momentBody.textContent = tab.dataset.body;
    momentOutcome.textContent = tab.dataset.outcome;
    momentChips.replaceChildren(
      ...tab.dataset.chips.split(",").map((chip) => {
        const item = document.createElement("span");
        item.textContent = chip;
        return item;
      }),
    );
  });
});

const reviewTrack = document.querySelector(".review-track");
const reviewCards = document.querySelectorAll(".review-card");
const previousReview = document.querySelector(".review-arrow.prev");
const nextReview = document.querySelector(".review-arrow.next");
let reviewIndex = 0;

function visibleReviewCount() {
  return window.matchMedia("(max-width: 980px)").matches ? 1 : 3;
}

function updateReviews() {
  if (!reviewTrack || reviewCards.length === 0) return;

  const cardWidth = reviewCards[0].getBoundingClientRect().width;
  const gap = Number.parseFloat(getComputedStyle(reviewTrack).gap) || 0;
  const maxIndex = Math.max(0, reviewCards.length - visibleReviewCount());

  reviewIndex = Math.min(reviewIndex, maxIndex);
  reviewTrack.style.transform = `translateX(${-reviewIndex * (cardWidth + gap)}px)`;
}

previousReview?.addEventListener("click", () => {
  const maxIndex = Math.max(0, reviewCards.length - visibleReviewCount());
  reviewIndex = reviewIndex === 0 ? maxIndex : reviewIndex - 1;
  updateReviews();
});

nextReview?.addEventListener("click", () => {
  const maxIndex = Math.max(0, reviewCards.length - visibleReviewCount());
  reviewIndex = reviewIndex >= maxIndex ? 0 : reviewIndex + 1;
  updateReviews();
});

window.addEventListener("resize", updateReviews);
updateReviews();

const inquiryForm = document.querySelector("#inquiryForm");

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(inquiryForm);
  const message = [
    "Hi, I would like to inquire about SeedToSkill.in.",
    `Parent name: ${formData.get("parentName")}`,
    `Phone number: ${formData.get("phone")}`,
    `Child's age: ${formData.get("childAge") || "Not shared"}`,
    `Interested in: ${formData.get("interest")}`,
    `Message: ${formData.get("message") || "Not shared"}`,
  ].join("\n");

  window.open(`https://wa.me/918805231013?text=${encodeURIComponent(message)}`, "_blank");
});
