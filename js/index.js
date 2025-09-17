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