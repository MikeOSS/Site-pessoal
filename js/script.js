// Dados dos projetos
const projects = [
  {
    title: "RouteX",
    description:
      "Sistema de gestão otimizada de rotas desenvolvido puramente em Python. Organiza rotas da rotina comercial de modo otimizado visando economizar combustível por erros de cálculo de rotas. Auxilia comerciais a diminuir erros e gastos que decorrem do erro, função que não existe no Google Maps ou Waze.",
    images: [
      "assets/routeCapa.png",
      "assets/route1.png",
      "assets/route2.png",
      "assets/route3.png",
    ],
  },
  {
    title: "Safe Vision",
    description:
      "Sistema de segurança rodoviária que envolve visão computacional para identificar no motorista sinais de distração, fadiga, furtos entre outros, conectando os dados aos gestores dessas frotas. Envolve conhecimentos em Python e desenvolvimento web para a plataforma de gestão (HTML, CSS, JavaScript).",
    images: [
      "assets/safeCapa.jpg",
      "assets/safeEquipe.jpg",
      "assets/safe1.png",
      "assets/safe2.png",
      "assets/safe3.png",
    ],
  },
];

// Variáveis globais
let currentProject = 0;
let currentImageIndex = 0;
let isModalOpen = false;

// Elementos do DOM
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.querySelector(".modal-close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  initializeAnimations();
});

// Event Listeners
function initializeEventListeners() {
  // Cards de projetos
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.addEventListener("click", () => openProjectModal(index));
  });

  // Modal controls
  modalClose.addEventListener("click", closeProjectModal);
  prevBtn.addEventListener("click", () => navigateImage(-1));
  nextBtn.addEventListener("click", () => navigateImage(1));

  // Fechar modal clicando no overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-overlay")) {
      closeProjectModal();
    }
  });

  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (!isModalOpen) return;

    switch (e.key) {
      case "Escape":
        closeProjectModal();
        break;
      case "ArrowLeft":
        navigateImage(-1);
        break;
      case "ArrowRight":
        navigateImage(1);
        break;
    }
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Animações de entrada
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar seções
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });

  // Observar cards
  document
    .querySelectorAll(".project-card, .education-card, .cert-card")
    .forEach((card) => {
      observer.observe(card);
    });
}

// Abrir modal do projeto
function openProjectModal(projectIndex) {
  currentProject = projectIndex;
  currentImageIndex = 0;
  isModalOpen = true;

  const project = projects[projectIndex];

  // Atualizar conteúdo do modal
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalImage.src = project.images[0];

  // Mostrar modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Animar entrada
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

// Fechar modal
function closeProjectModal() {
  isModalOpen = false;
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Navegar entre imagens
function navigateImage(direction) {
  const project = projects[currentProject];
  currentImageIndex += direction;

  // Loop das imagens
  if (currentImageIndex < 0) {
    currentImageIndex = project.images.length - 1;
  } else if (currentImageIndex >= project.images.length) {
    currentImageIndex = 0;
  }

  // Atualizar imagem com animação
  modalImage.style.opacity = "0";
  setTimeout(() => {
    modalImage.src = project.images[currentImageIndex];
    modalImage.style.opacity = "1";
  }, 150);
}

// Efeitos de hover para cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Efeito de parallax removido para manter sidebar fixa

// Animação de digitação para o nome
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Aplicar efeito de digitação ao carregar
window.addEventListener("load", () => {
  const nameElement = document.querySelector(".name");
  if (nameElement) {
    const originalText = nameElement.textContent;
    typeWriter(nameElement, originalText, 150);
  }
});

// Efeito de partículas no fundo
function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "particles";
  particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

  document.body.appendChild(particleContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.4;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;

    particleContainer.appendChild(particle);
  }
}

// CSS para animação de partículas
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar partículas
createParticles();

// Performance: Debounce para scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar debounce ao scroll
window.addEventListener(
  "scroll",
  debounce(() => {
    // Lógica de scroll otimizada aqui
  }, 10)
);
