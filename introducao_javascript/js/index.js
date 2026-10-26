
const cofre1 = document.getElementById('cofre1');
const cofre2 = document.getElementById('cofre2');
const cofre3 = document.getElementById('cofre3');

const cofres = [cofre1, cofre2, cofre3];

const arena = document.getElementById('arena');
const elMensagem = document.getElementById('mensagem');
const elTentativas = document.getElementById('tentativas');
const elVitorias = document.getElementById('vitorias');

const btnReiniciar = document.getElementById('btnReiniciar');
const btnZerar = document.getElementById('btnZerar');

let cofrePremiado = 0;
let totalTentativas = 0;
let totalVitorias = 0;
let cofreFujao = 0;
let rodadaEncerrada = false;

function sortearCofres() {
    cofrePremiado = Math.floor(Math.random() * 3) + 1;

    cofreFujao = Math.floor(Math.random() * 3) + 1;

    cofres.forEach((cofre, indice) => {
        cofre.classList.remove('premiado', 'vazio', 'fujindo');

        cofre.disabled = false;
        cofre.textContent = `Cofre ${indice + 1} 🔒`;

        cofre.style.position = '';
        cofre.style.left = '';
        cofre.style.top = '';
        cofre.style.transform = '';
    });

    rodadaEncerrada = false;

    elMensagem.textContent = 'Boa sorte! Encontre o prêmio!';
    elMensagem.style.color = '#F5F7FA';
}

function fugir(cofre, numero) {
    if (rodadaEncerrada || numero !== cofreFujao) {
        return;
    }

    const larguraArena = arena.clientWidth;
    const alturaArena = arena.clientHeight;

    const larguraCofre = cofre.offsetWidth;
    const alturaCofre = cofre.offsetHeight;

    const maxX = Math.max(0, larguraArena - larguraCofre);
    const maxY = Math.max(0, alturaArena - alturaCofre);

    const novaPosicaoX = Math.floor(Math.random() * (maxX + 1));
    const novaPosicaoY = Math.floor(Math.random() * (maxY + 1));

    cofre.classList.add('fujindo');

    cofre.style.left = `${novaPosicaoX}px`;
    cofre.style.top = `${novaPosicaoY}px`;
}

function escolherCofre(numeroEscolha) {
    if (rodadaEncerrada) {
        return;
    }

    rodadaEncerrada = true;

    totalTentativas++;
    elTentativas.textContent = totalTentativas;

    cofres.forEach((cofre, indice) => {
        const numero = indice + 1;

        cofre.disabled = true;
        cofre.classList.remove('fujindo');

        cofre.style.position = '';
        cofre.style.left = '';
        cofre.style.top = '';

        if (numero === cofrePremiado) {
            cofre.classList.add('premiado');
            cofre.textContent = `Cofre ${numero} 🏆`;
        } else {
            cofre.classList.add('vazio');
            cofre.textContent = `Cofre ${numero} ❌`;
        }
    });

    if (numeroEscolha === cofrePremiado) {
        totalVitorias++;
        elVitorias.textContent = totalVitorias;

        elMensagem.textContent =
            `🎉Aeeeee, finalmente. Você encontrou o prêmio no cofre ${numeroEscolha}!`;

        elMensagem.style.color = '#65F08A';
    } else {
        elMensagem.textContent =
            `Ficou sem nada kkkkkkk O prêmio estava no cofre ${cofrePremiado}.`;

        elMensagem.style.color = '#FF737B';
    }
}

cofres.forEach((cofre, indice) => {
    const numero = indice + 1;

    cofre.addEventListener('pointerenter', () => {
        fugir(cofre, numero);
    });

    cofre.addEventListener('click', () => {
        escolherCofre(numero);
    });
});

btnReiniciar.addEventListener('click', () => {
    sortearCofres();
});

btnZerar.addEventListener('click', () => {
    totalTentativas = 0;
    totalVitorias = 0;

    elTentativas.textContent = '0';
    elVitorias.textContent = '0';

    elMensagem.textContent = '🔄 Contadores zerados!';
    elMensagem.style.color = '#E5C16B';
});

sortearCofres();
