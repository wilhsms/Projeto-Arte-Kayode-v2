const photos = [
  ["assets/gallery-11.jpeg", "Espetáculo de fim de ano — elenco completo no palco", "2010"],
  ["assets/gallery-15.jpeg", "Professora e alunos — apresentação no teatro", "2011"],
  ["assets/gallery-14.jpeg", "Bailarinas em tutus — coreografia clássica", "2010"],
  ["assets/gallery-06.jpeg", "Apresentação infantil — borboletas e fadas", "2009"],
  ["assets/gallery-12.jpeg", "Corpo de baile com penas coloridas — palco", "2011"],
  ["assets/gallery-10.jpeg", "Solo no palco — asas de borboleta", "2008"],
  ["assets/gallery-13.jpeg", "Ensaio de teatro — cena em fila", "2010"],
  ["assets/gallery-09.jpeg", "Grande espetáculo — plateia lotada", "2012"],
  ["assets/gallery-07.jpeg", "Coreografia contemporânea em amarelo", "2011"],
  ["assets/gallery-04.jpeg", "Dupla em arabesque — ensaio no espaço comunitário", "2009"],
  ["assets/gallery-08.jpeg", "Turma na barra — exercícios clássicos", "2008"],
  ["assets/gallery-01.jpeg", "Aula de iniciantes — crianças no estúdio", "2007"],
  ["assets/gallery-03.jpeg", "Sapatilhas de ponta — detalhe do treino", "2009"],
  ["assets/gallery-05.jpeg", "Pernas na barra — turma avançada", "2010"],
  ["assets/gallery-02.jpeg", "Apresentação histórica — registro do projeto original", "2006"],
];

const posts = [
  {
    title: "O Projeto Arte Kayode está de volta: inscrições abertas para 2026",
    summary: "Após mais de uma década, o projeto de balé do Ile Ashe Akin Iyasaba retoma suas atividades com o mesmo coração e ainda mais força.",
    date: "15 de junho de 2025",
    tag: "Notícias",
    img: "assets/sobre.jpeg",
  },
  {
    title: "27 anos de comunidade: a história do Ile Ashe Akin Iyasaba",
    summary: "Fundado em 1997 por Ângela Maria Neppel, o Ile é um polo de cultura, arte e transformação social.",
    date: "02 de junho de 2025",
    tag: "História",
    img: "assets/gallery-14.jpeg",
  },
  {
    title: "Balé como inclusão: o que o projeto de 2006 nos ensinou",
    summary: "Entre 2006 e 2012, o Ile promoveu seis anos consecutivos de apresentações em teatro.",
    date: "20 de maio de 2025",
    tag: "Reflexão",
    img: "assets/gallery-06.jpeg",
  },
  {
    title: "Como você pode apoiar o Projeto Arte Kayode",
    summary: "Doação, voluntariado ou parceria: existem muitas formas de fazer parte dessa história.",
    date: "10 de maio de 2025",
    tag: "Apoio",
    img: "assets/gallery-15.jpeg",
  },
  {
    title: "A identidade afro-brasileira no centro da dança",
    summary: "O projeto conecta cada aluno às suas raízes culturais, tornando o balé instrumento de orgulho.",
    date: "28 de abril de 2025",
    tag: "Cultura",
    img: "assets/gallery-01.jpeg",
  },
];

const testimonials = [
  {
    text: "Minha filha entrou no projeto tímida. Depois de um ano de aulas no Ile, ela subiu ao palco de um teatro e iluminou o espaço.",
    name: "Rosângela Pereira",
    role: "Mãe de aluna, bairro Vista Linda",
  },
  {
    text: "O projeto foi o primeiro lugar onde vi crianças do nosso bairro se apresentando num palco de verdade. Isso não tem preço.",
    name: "Carlos Eduardo Santos",
    role: "Morador e apoiador da comunidade",
  },
  {
    text: "Aprendi que minha raiz é bonita. O balé aqui não apaga quem eu sou, ele me ensina a me mover com orgulho.",
    name: "Isabela Nunes",
    role: "Aluna do projeto original",
  },
  {
    text: "O Ile Ashe é um polo de transformação. O retorno do projeto de balé é uma notícia que toda a comunidade esperava.",
    name: "Professora Dalva Correia",
    role: "Educadora, Vista Linda",
  },
];

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
let selectedPhoto = 0;

function renderGallery() {
  galleryGrid.innerHTML = photos.map((photo, index) => `
    <button class="gallery-item" type="button" data-index="${index}">
      <img src="${photo[0]}" alt="${photo[1]}" loading="lazy">
      <span>${photo[1]}</span>
    </button>
  `).join("");
}

function openLightbox(index) {
  selectedPhoto = index;
  const [src, caption, year] = photos[selectedPhoto];
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = `${caption} — ${year}`;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function moveLightbox(direction) {
  openLightbox((selectedPhoto + direction + photos.length) % photos.length);
}

galleryGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".gallery-item");
  if (button) openLightbox(Number(button.dataset.index));
});

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

function renderPosts() {
  document.getElementById("posts-grid").innerHTML = posts.map((post) => `
    <article class="post-card">
      <img src="${post.img}" alt="${post.title}" loading="lazy">
      <div class="post-body">
        <span class="tag">${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <small>${post.date}</small>
      </div>
    </article>
  `).join("");
}

let testimonialIndex = 0;
const testimonialText = document.getElementById("testimonial-text");
const testimonialName = document.getElementById("testimonial-name");
const testimonialRole = document.getElementById("testimonial-role");
const testimonialDots = document.getElementById("testimonial-dots");

function renderTestimonial(index) {
  testimonialIndex = index;
  const testimonial = testimonials[index];
  testimonialText.textContent = `“${testimonial.text}”`;
  testimonialName.textContent = testimonial.name;
  testimonialRole.textContent = testimonial.role;
  testimonialDots.innerHTML = testimonials.map((_, dotIndex) => `
    <button type="button" class="${dotIndex === index ? "active" : ""}" aria-label="Ver depoimento ${dotIndex + 1}" data-index="${dotIndex}"></button>
  `).join("");
}

testimonialDots.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) renderTestimonial(Number(button.dataset.index));
});

setInterval(() => {
  renderTestimonial((testimonialIndex + 1) % testimonials.length);
}, 5000);

document.getElementById("contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const formMessage = document.getElementById("form-message");
  const originalButtonText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  formMessage.hidden = true;
  formMessage.classList.remove("error");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Não foi possível enviar a mensagem.");
    }

    form.reset();
    formMessage.textContent = "Mensagem enviada. Nossa equipe entrará em contato em até 48 horas.";
  } catch (error) {
    formMessage.textContent = error.message || "Não foi possível enviar. Tente novamente mais tarde.";
    formMessage.classList.add("error");
  } finally {
    formMessage.hidden = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});

document.getElementById("copy-pix").addEventListener("click", async () => {
  const pixCode = document.getElementById("pix-code");
  const pixMessage = document.getElementById("pix-message");

  try {
    await navigator.clipboard.writeText(pixCode.value);
  } catch {
    pixCode.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }

  pixMessage.textContent = "Código Pix copiado. Agora é só colar no aplicativo do seu banco.";
  pixMessage.hidden = false;
});

renderGallery();
renderPosts();
renderTestimonial(0);
