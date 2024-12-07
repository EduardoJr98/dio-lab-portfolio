document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const menuContainer = document.getElementById("dynamic-menu");
      data.menu.forEach((item) => {
        const menuItem = document.createElement("li");
        menuItem.classList.add("menu__item");
        menuItem.innerHTML = `
          <a class="menu__link" href="${item.link}">
            <span class="menu__text">${item.name}</span>
          </a>
        `;
        menuContainer.appendChild(menuItem);
      });

      const socialLinksContainer = document.getElementById("dynamic-social-links");
      data.socialLinks.forEach((link) => {
        const socialItem = document.createElement("li");
        socialItem.innerHTML = `
          <a class="menu__link" href="${link.url}" target="_blank">
            <i class="menu__icon ${link.icon}"></i>
          </a>
        `;
        socialLinksContainer.appendChild(socialItem);
      });
    })
    .catch((error) => console.error("Erro ao carregar o JSON:", error));
});

const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

function changeTheme() {
  const currentTheme = rootHtml.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";
  rootHtml.setAttribute("data-theme", newTheme);

  toggleTheme.classList.toggle("bi-sun");
  toggleTheme.classList.toggle("bi-moon-stars");

  localStorage.setItem("theme", newTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"; // Tema padrão: "light"
  rootHtml.setAttribute("data-theme", savedTheme);

  if (savedTheme === "dark") {
    toggleTheme.classList.add("bi-moon-stars");
    toggleTheme.classList.remove("bi-sun");
  } else {
    toggleTheme.classList.add("bi-sun");
    toggleTheme.classList.remove("bi-moon-stars");
  }
}

toggleTheme.addEventListener("click", changeTheme);

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");

    accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
  });
});

menuLinks.forEach(item => {
  item.addEventListener("click", () => {
    menuLinks.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

loadTheme();
