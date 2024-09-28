document.addEventListener('DOMContentLoaded', function() {
    const botaoNao = document.getElementById('botao-nao');
    const botaoSim = document.getElementById('botao-sim');
    const conteudoAdicional = document.getElementById('conteudo-adicional');
    let conteudoExibido = false;

    function obterPosicaoAleatoria(elemento) {
        const x = Math.floor(Math.random() * (window.innerWidth - elemento.offsetWidth));
        const y = Math.floor(Math.random() * (window.innerHeight - elemento.offsetHeight - 200)) + 200;
        return { x, y };
    }

    botaoNao.addEventListener('mouseover', function() {
        const posicao = obterPosicaoAleatoria(botaoNao);
        botaoNao.style.position = 'absolute';
        botaoNao.style.left = posicao.x + 'px';
        botaoNao.style.top = posicao.y + 'px';
    });

    botaoSim.addEventListener('click', function() {
        if (!conteudoExibido) {
            const conteudos = [
                {
                    tipo: 'gif',
                    src: 'teQueroSoPraMim.gif',
                    alt: 'GIF 1',
                },
                {
                    tipo: 'texto',
                    texto: 'Então vem ser minha. Estou te esperando, quero você em meus braços.',
                    classe: 'subtitulo',
                },
                {
                    tipo: 'video',
                    src: 'nossaDancaHunger.mp4',
                    alt: 'Vídeo 1',
                },
                {
                    tipo: 'texto',
                    texto: 'Vamos juntos unir nossa chama de mil sóis, porque é você quem eu desejo.',
                    classe: 'subtitulo-escuro',
                },
                {
                    tipo: 'video',
                    src: 'obrigadoPorEstarAqui.mp4',
                    alt: 'Vídeo 2',
                },
                {
                    tipo: 'botao',
                    id: 'botao-surpresa',
                    texto: 'Surpresinha',
                },
            ];

            conteudos.forEach(conteudo => {
                let elemento;

                if (conteudo.tipo === 'gif') {
                    elemento = document.createElement('img');
                    elemento.src = conteudo.src;
                    elemento.alt = conteudo.alt;
                    elemento.classList.add('midia', 'oculto');

                    elemento.addEventListener('click', function() {
                        elemento.classList.toggle('expanded');
                    });
                } else if (conteudo.tipo === 'video') {
                    elemento = document.createElement('video');
                    elemento.src = conteudo.src;
                    elemento.setAttribute('controls', 'controls');
                    elemento.classList.add('midia', 'oculto');

                    elemento.addEventListener('click', function() {
                        elemento.classList.toggle('expanded');
                    });
                } else if (conteudo.tipo === 'texto') {
                    elemento = document.createElement('h2');
                    elemento.innerText = conteudo.texto;
                    elemento.classList.add(conteudo.classe, 'oculto');
                } else if (conteudo.tipo === 'botao') {
                    elemento = document.createElement('button');
                    elemento.id = conteudo.id;
                    elemento.innerText = conteudo.texto;
                    elemento.classList.add('oculto');

                    elemento.addEventListener('click', function() {
                        const imagemSurpresa = document.createElement('img');
                        imagemSurpresa.src = 'surprise.png';
                        imagemSurpresa.alt = 'Surpresa';
                        imagemSurpresa.classList.add('midia', 'oculto');
                        conteudoAdicional.appendChild(imagemSurpresa);

                        imagemSurpresa.addEventListener('click', function() {
                            imagemSurpresa.classList.toggle('expanded');
                        });

                        observador.observe(imagemSurpresa);

                        elemento.disabled = true;
                    });
                }

                conteudoAdicional.appendChild(elemento);
            });

            const elementosOcultos = document.querySelectorAll('.oculto');

            const observador = new IntersectionObserver((entradas) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('visivel');
                        observador.unobserve(entrada.target);
                    }
                });
            }, { threshold: 0.1 });

            elementosOcultos.forEach(el => {
                observador.observe(el);
            });

            conteudoExibido = true;
        }
    });
});