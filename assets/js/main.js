/* Configure this with the real WhatsApp number before publishing. */
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace placeholder; digits only, with country code.

document.addEventListener("DOMContentLoaded", () => {
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    if ((link.getAttribute("href") || "").toLowerCase() === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const galleryItems = document.querySelectorAll("[data-category]");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    galleryItems.forEach(item => {
      const visible = category === "all" || item.dataset.category === category;
      item.classList.toggle("d-none", !visible);
      item.setAttribute("aria-hidden", String(!visible));
    });
  }));

  document.querySelectorAll(".whatsapp-enquiry-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      if (!form.checkValidity()) return;

      if (WHATSAPP_NUMBER.includes("X")) {
        const alertBox = form.querySelector(".setup-alert");
        if (alertBox) {
          alertBox.classList.remove("d-none");
          alertBox.textContent = "Setup required: add the real WhatsApp number in assets/js/main.js.";
        } else {
          alert("Please set WHATSAPP_NUMBER in assets/js/main.js before using the form.");
        }
        return;
      }

      const data = new FormData(form);
      const message = [
        "Hello Shree Tiles Contractor, I would like to enquire about tiles fitting.",
        "",
        `Name: ${data.get("name") || ""}`,
        `Mobile: ${data.get("phone") || ""}`,
        `Project location: ${data.get("location") || ""}`,
        `Service required: ${data.get("service") || ""}`,
        `Approximate area: ${data.get("area") || "Not specified"}`,
        `Project details: ${data.get("message") || ""}`
      ].join("\\n");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    });
  });

  document.querySelectorAll("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());
});
