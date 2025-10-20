// AÇÃO E ANIMAÇÃO PARA APARECER MENU
document.addEventListener("DOMContentLoaded", () => {
  const botaoMenu = document.querySelector("div.menu-mobile > i");
  const nav = document.querySelector("header nav");

  botaoMenu.addEventListener("click", (e) => {
    e.stopPropagation(); // impede que o clique no botão feche imediatamente
    nav.classList.toggle("ativo");
    botaoMenu.classList.toggle("menu-ativo");
  });

  // Fecha o menu se clicar fora dele
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("ativo") && !nav.contains(e.target) && !botaoMenu.contains(e.target)) {
      nav.classList.remove("ativo");
      botaoMenu.classList.remove("menu-ativo");
    }
  });
});
// ======================================================================


// Animação para o scroll personalizado galeria
document.querySelectorAll('.group-pictures').forEach(container => {
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
    const walk = (x - startX) * 0.8; // fator de velocidade
    container.scrollLeft = scrollLeft - walk;
  });
});

document.querySelectorAll('div.background').forEach(background => {
  const group = background.querySelector('.group-pictures');
  const bar = background.querySelector('.progresso-bar');
  const thumb = background.querySelector('.progresso-thumb');
  if (!group || !bar || !thumb) return;

  function updateThumb() {
    const maxScroll = group.scrollWidth - group.clientWidth;
    if (maxScroll <= 0) {
      bar.classList.remove('visible');
      thumb.style.transform = 'translate(0, -50%)';
      return;
    } else {
      bar.classList.add('visible');
    }

    const scrollPercent = group.scrollLeft / maxScroll;
    const barUsable = bar.clientWidth - thumb.clientWidth;
    const tx = scrollPercent * barUsable;
    thumb.style.transform = `translate(${tx}px, -50%)`;
  }

  // inicializar
  updateThumb();

  // eventos
  group.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('resize', updateThumb);
  window.addEventListener('load', updateThumb);
});

// ===========================================================================


// rolagem pausada automática dos clientes
const container = document.querySelector('.clientes');
    const images = document.querySelectorAll('.clientes img');
    
    let currentIndex = 1;
    let autoScrollInterval;
    let isTransitioning = false; // Variável para evitar múltiplos cliques/transições

    // --- FUNÇÃO DE ROLAGEM SUAVE COM DURAÇÃO FIXA ---
    const customSmoothScrollTo = (targetPosition, duration, onComplete = null) => {
        isTransitioning = true;
        const startPosition = container.scrollLeft;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animationStep = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const ease = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // Easing in-out-cubic
            const progress = Math.min(timeElapsed / duration, 1);
            
            container.scrollLeft = startPosition + distance * ease(progress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animationStep);
            } else {
                isTransitioning = false;
                if (onComplete) {
                    onComplete(); // Chama a função de callback ao terminar
                }
            }
        };

        requestAnimationFrame(animationStep);
    };

    // Função que calcula a posição e chama a rolagem
    const scrollToImage = (index, duration = 800) => {
        if (isTransitioning) return; // Se já estiver em animação, não faz nada

        const targetImage = images[index];
        if (!targetImage) return;

        const scrollPosition = targetImage.offsetLeft + (targetImage.offsetWidth / 2) - (container.offsetWidth / 2);
        
        // Sempre usa a função customizada, mas a duração pode ser diferente
        customSmoothScrollTo(scrollPosition, duration);
    };

    // Lógica principal do carrossel
    const runCarousel = () => {
        // Se o próximo índice for passar do limite (penúltima imagem)
        if (currentIndex > images.length - 2) {
            currentIndex = 1;
            // Rola de volta para o início suavemente
            // Usamos a mesma função, garantindo a mesma consistência de velocidade
            scrollToImage(currentIndex, 800); // <-- ESTA É A LINHA ALTERADA
        } else {
            // Rola para a próxima imagem suavemente
            scrollToImage(currentIndex, 800);
        }
        
        currentIndex++;
    };

    // --- FUNÇÕES DE CONTROLE E INICIALIZAÇÃO ---
    const startAutoScroll = () => {
        clearInterval(autoScrollInterval); 
        autoScrollInterval = setInterval(runCarousel, 3000);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);

    // Posiciona na imagem inicial de forma instantânea
    const setInitialPosition = () => {
         const initialImage = images[1];
         if(!initialImage) return;
         const scrollPosition = initialImage.offsetLeft + (initialImage.offsetWidth / 2) - (container.offsetWidth / 2);
         container.scrollTo({ left: scrollPosition, behavior: 'instant' });
    }
    
    setInitialPosition();
    startAutoScroll();

// ===========================================================================


// Script para os cards dos depoimentos
    const boxDepoimentos = document.querySelector('.box-depoimentos');
    const setaEsquerda = document.querySelectorAll('.seta')[0];
    const setaDireita = document.querySelectorAll('.seta')[1];
    const depoimentos = document.querySelectorAll('.box-depoimento');
    const total = depoimentos.length;
    let index = 0;

    // --- Função que calcula a posição exata do depoimento dentro do container ---
    function scrollParaIndex(i) {
        const target = depoimentos[i];
        const offset = target.offsetLeft - boxDepoimentos.offsetLeft;
        boxDepoimentos.scrollTo({
            left: offset,
            behavior: 'smooth'
        });
    }

    // --- Atualiza index e move o scroll ---
    function mostrarDepoimento(i) {
        index = (i + total) % total;
        scrollParaIndex(index);
    }

    // --- Eventos das setas ---
    setaEsquerda.addEventListener('click', () => {
        mostrarDepoimento(index - 1);
    });

    setaDireita.addEventListener('click', () => {
        mostrarDepoimento(index + 1);
    });

    // --- Corrige o alinhamento ao redimensionar ---
    window.addEventListener('resize', () => {
        scrollParaIndex(index);
    });

    // --- Inicializa ---
    scrollParaIndex(index);
/* ==================================================================== */