document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".pages-list ul:last-child");
  const pagesList = document.querySelector(".pages-list");

  menuToggle?.addEventListener("click", () => {
    pagesList.classList.toggle("active");
  });

  // Archive entries used a placeholder video ID; point them to the Nurse trailer
  // already listed on the home page instead of displaying YouTube's error screen.
  document.querySelectorAll('iframe[src*="abc123XYZ"]').forEach((iframe) => {
    iframe.src = iframe.src.replace("abc123XYZ", "YE_9gOc9wWk");
  });

  document
    .querySelectorAll(".film-card iframe, .media iframe")
    .forEach((iframe) => {
      const videoId = new URL(iframe.src).pathname
        .split("/")
        .filter(Boolean)
        .pop();
      if (
        !videoId ||
        iframe.nextElementSibling?.classList.contains("trailer-fallback")
      )
        return;

      iframe.title ||= "YouTube movie trailer";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      const youtubeLink = document.createElement("a");
      youtubeLink.className = "trailer-fallback";
      youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
      youtubeLink.target = "_blank";
      youtubeLink.rel = "noopener noreferrer";
      youtubeLink.textContent = "Trailer not playing? Open it on YouTube";
      iframe.insertAdjacentElement("afterend", youtubeLink);
    });

  document.querySelectorAll(".movie-screens").forEach((movie) => {
    const trailerButton = movie.querySelector("button.trailer");
    const trailerContainer = movie.querySelector(".iframe-container");
    const iframe = trailerContainer?.querySelector("iframe");

    if (!trailerButton || !trailerContainer || !iframe) return;

    const videoId = new URL(iframe.src).pathname
      .split("/")
      .filter(Boolean)
      .pop();
    const youtubeLink = document.createElement("a");
    youtubeLink.className = "trailer-fallback";
    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    youtubeLink.target = "_blank";
    youtubeLink.rel = "noopener noreferrer";
    youtubeLink.textContent = "Trailer not playing? Open it on YouTube";
    trailerContainer.append(youtubeLink);

    iframe.title = `YouTube trailer for ${movie.querySelector("h3")?.textContent.trim() || "this film"}`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";

    trailerButton.addEventListener("click", () => {
      const isVisible = trailerContainer.classList.toggle("visible");
      trailerButton.textContent = isVisible ? "Hide trailer" : "Watch trailer";
      trailerButton.setAttribute("aria-expanded", String(isVisible));

      if (isVisible && videoId) {
        const url = new URL(iframe.src);
        url.searchParams.set("autoplay", "1");
        iframe.src = url.toString();
      }
    });
  });

  // The featured cards use their YouTube thumbnail IDs as trailer destinations.
  document.querySelectorAll(".film .watch-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const thumbnail = button
        .closest(".film")
        ?.querySelector(".film-card-wrapper img");
      const videoId = thumbnail?.src.match(/youtube\.com\/vi\/([^/]+)/)?.[1];

      if (videoId) {
        window.open(
          `https://www.youtube.com/watch?v=${videoId}`,
          "_blank",
          "noopener,noreferrer",
        );
      }
    });
  });

  const programButton = document.getElementById("btn-programs");
  const ticketButton = document.getElementById("btn-tickets");
  const programPanel = document.getElementById("program-panel");
  const ticketPanel = document.getElementById("ticket-panel");

  programButton?.addEventListener("click", () => {
    programPanel?.classList.remove("visually-hidden");
    ticketPanel?.classList.add("visually-hidden");
    programPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  ticketButton?.addEventListener("click", () => {
    ticketPanel?.classList.remove("visually-hidden");
    programPanel?.classList.add("visually-hidden");
    ticketPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
