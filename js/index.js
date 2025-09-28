// AÇÃO E ANIMAÇÃO PARA APARECER MENU
// ======================================================================
document.addEventListener("DOMContentLoaded", () => {
  const botaoMenu = document.querySelector(".botao-menu");
  const nav = document.querySelector("header nav");

  botaoMenu.addEventListener("click", (e) => {
    e.stopPropagation(); // impede que o clique no botão feche imediatamente
    nav.classList.toggle("ativo");
  });

  // Fecha o menu se clicar fora dele
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("ativo") && !nav.contains(e.target) && !botaoMenu.contains(e.target)) {
      nav.classList.remove("ativo");
    }
  });
});
// ======================================================================



document.querySelectorAll('.background').forEach(container => {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 0.9; // fator de velocidade
    container.scrollLeft = scrollLeft - walk;
  });
});



