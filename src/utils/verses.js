const fetch = require('node-fetch');

const VERSES = [
    "Então Jesus tornou a falar-lhes, dizendo: Eu sou a luz do mundo; quem me segue de modo algum andará em trevas, mas terá a luz da vida. - João 8:12",
    "Ó minha alma, espera silenciosa somente em Deus, porque dele vem a minha esperança. - Salmos 62:5",
    "Ora, o Deus de esperança vos encha de todo o gozo e paz na vossa fé, para que abundeis na esperança pelo poder do Espírito Santo. - Romanos 15:13",
    "Que por ele credes em Deus, que o ressuscitou dentre os mortos e lhe deu glória, de modo que a vossa fé e esperança estivessem em Deus. - I Pedro 1:21",
    "Vinde a mim, todos os que estai cansados e oprimidos, e eu vos aliviarei. - Mateus 11:28",
    "Eu sou o Alfa e o Ômega, o princípio e o fim, diz o Senhor. - Apocalipse 1:8",
    "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito. - João 3:16",
    "O Senhor é o meu pastor, nada me faltará. - Salmos 23:1",
    "Tudo posso naquele que me fortalece. - Filipenses 4:13",
    "A paz vos deixo, a minha paz vos dou. - João 14:27",
    "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. - João 1:1",
    "Eu sou o caminho, a verdade e a vida. - João 14:6",
    "Buscai primeiro o reino de Deus e a sua justiça. - Mateus 6:33",
    "O amor é paciente, o amor é bondoso. - 1 Coríntios 13:4",
    "Amarás o Senhor teu Deus de todo o teu coração. - Mateus 22:37",
    "1° Mandamento - Amar a Deus sobre todas as coisas.",
    "2° Mandamento - Não tomar seu santo nome em vão.",
    "3° Mandamento - Guardar domingos e festas.",
    "4° Mandamento - Honrar pai e mãe.",
    "5° Mandamento - Não matarás.",
    "6° Mandamento - Não pecar contra a castidade.",
    "7° Mandamento - Não furtar.",
    "8° Mandamento - Não levantar falso testemunho.",
    "9° Mandamento - Não desejar a mulher do próximo.",
    "10° Mandamento - Não cobiçar as coisas alheias."
];

function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * VERSES.length);
    return VERSES[randomIndex];
}

module.exports = { getRandomVerse };
