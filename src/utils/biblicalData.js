const versiculosPorTema = {
    amor: [
        { texto: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.", referencia: "1 Coríntios 13:4" },
        { texto: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna.", referencia: "João 3:16" },
        { texto: "Amados, amemos uns aos outros, pois o amor procede de Deus.", referencia: "1 João 4:7" }
    ],
    esperanca: [
        { texto: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.", referencia: "Jeremias 29:11" },
        { texto: "Mas os que esperam no Senhor renovarão as suas forças. Voarão como águias; correrão e não se cansarão, andarão e não se fatigarão.", referencia: "Isaías 40:31" },
        { texto: "Que o Deus da esperança os encha de toda alegria e paz, por sua confiança nele.", referencia: "Romanos 15:13" }
    ],
    paz: [
        { texto: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.", referencia: "João 14:27" },
        { texto: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.", referencia: "Filipenses 4:7" }
    ],
    perda: [
        { texto: "O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.", referencia: "Salmos 34:18" },
        { texto: "Bem-aventurados os que choram, porque eles serão consolados.", referencia: "Mateus 5:4" }
    ],
    forca: [
        { texto: "Tudo posso naquele que me fortalece.", referencia: "Filipenses 4:13" },
        { texto: "Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.", referencia: "Josué 1:9" }
    ]
};

const oracoesPorNecessidade = {
    protecao: {
        titulo: "Oração por Proteção",
        texto: "Senhor Deus, peço sua proteção divina. Cubra-me com suas asas e guarde-me de todo mal. Em nome de Jesus, amém.",
        versiculo: "Salmos 91:1-2"
    },
    saude: {
        titulo: "Oração por Cura e Saúde",
        texto: "Pai Celestial, peço pela restauração da saúde. Que seu poder curador flua através de mim. Em nome de Jesus, amém.",
        versiculo: "Jeremias 33:6"
    },
    sabedoria: {
        titulo: "Oração por Sabedoria",
        texto: "Deus de toda sabedoria, conduza meus pensamentos e decisões. Ilumine meu caminho com sua verdade. Em nome de Jesus, amém.",
        versiculo: "Tiago 1:5"
    },
    familia: {
        titulo: "Oração pela Família",
        texto: "Senhor, abençoe e proteja minha família. Una-nos em seu amor e propósito. Em nome de Jesus, amém.",
        versiculo: "Josué 24:15"
    }
};

const calendarioLiturgico = {
    eventos: [
        {
            nome: "Pentecostes",
            inicio: "2025-05-25",
            fim: "2025-05-25",
            descricao: "Celebração da vinda do Espírito Santo",
            leituras: ["Atos 2:1-13", "João 20:19-23"],
            cor: "#FF0000"
        },
        {
            nome: "Corpus Christi",
            inicio: "2025-06-19",
            fim: "2025-06-19",
            descricao: "Celebração do Santíssimo Sacramento",
            leituras: ["João 6:51-58", "1 Coríntios 11:23-26"],
            cor: "#FFFFFF"
        },
        {
            nome: "Tempo Comum",
            inicio: "2025-06-20",
            fim: "2025-11-30",
            descricao: "Período de crescimento e maturação espiritual",
            leituras: ["Mateus 5:1-12", "Marcos 4:1-20"],
            cor: "#008000"
        },
        {
            nome: "Advento",
            inicio: "2025-12-01",
            fim: "2025-12-24",
            descricao: "Período de preparação para o Natal",
            leituras: ["Isaías 9:6-7", "Lucas 1:26-38"],
            cor: "#800080"
        },
        {
            nome: "Natal",
            inicio: "2025-12-25",
            fim: "2026-01-06",
            descricao: "Celebração do nascimento de Jesus e Epifania",
            leituras: ["Lucas 2:1-20", "Mateus 2:1-12"],
            cor: "#FFFFFF"
        }
    ],
    temposLiturgicos: {
        advento: {
            cor: "#800080",
            significado: "Tempo de espera e preparação"
        },
        natal: {
            cor: "#FFFFFF",
            significado: "Celebração da encarnação do Verbo"
        },
        quaresma: {
            cor: "#800080",
            significado: "Tempo de penitência e conversão"
        },
        pascoa: {
            cor: "#FFFFFF",
            significado: "Tempo de alegria e renovação"
        },
        comum: {
            cor: "#008000",
            significado: "Tempo de crescimento na fé"
        }
    }
};

module.exports = {
    versiculosPorTema,
    oracoesPorNecessidade,
    calendarioLiturgico
};
