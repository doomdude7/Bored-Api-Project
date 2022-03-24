const activity = document.querySelector(".activity");
const button = document.querySelector(".generate-btn");

async function getActivity() {
  const dataFetch = await fetch("http://www.boredapi.com/api/activity/", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const data = await dataFetch.json();
  console.log(data);
  const activityContainer = document.createElement("div");
  activityContainer.innerHTML = `<h3 class="activity-msg">${data.activity}</h3>`;
  activityContainer.setAttribute("id", "activity-container");
  activity.appendChild(activityContainer);
  //   if (data.link !== "") {
  //     const activityLink = document.createElement("h3");
  //     activityLink.classList.add("link");
  //     activityLink.setAttribute("id", "activity-container");
  //     activityLink.innerHTML = `{${data.link}}`;
  //     activity.appendChild(activityLink);
  //   }
  if (data.link !== "") {
    const activityLink = document.createElement("div");
    activityLink.setAttribute("id", "activity-container");
    activityLink.innerHTML = `<h3 class="link"><a href="${data.link}" target="_blank">${data.link}</a></h3>`;
    activity.appendChild(activityLink);
  }
  const activityMsg = document.querySelector(".activity-msg");
  gsap.fromTo(
    activityMsg,
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      ease: "elastic.out(1, 0.3)",
      duration: 1,
    }
  );
}
function clear() {
  const lastActivity = document.querySelectorAll("#activity-container");
  if (lastActivity !== null) {
    lastActivity.forEach((e) => e.remove());
  }
}
button.addEventListener("click", () => {
  getActivity();
  clear();
  animation();
});

// animations
const tl = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
const tl2 = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
function animation() {
  tl.fromTo(
    button,
    { opacity: 1, scale: 1 },
    {
      opacity: 0.7,
      yoyo: true,
      repeat: 1,
      scale: 2,
      duration: 0.4,
    }
  );
}
button.addEventListener("mouseenter", () => {
  tl2.fromTo(
    button,
    { opacity: 1, scale: 1 },
    { opacity: 0.8, scale: 0.9, yoyo: true, repeat: -1 }
  );
});
