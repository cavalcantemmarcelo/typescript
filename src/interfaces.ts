interface Movie {
    id: number;
    title: string;
    description: string;
    platform: string[];
    genre: string[];
    actors: string[];

    getRecommendations: (title: string) => void;
}

const filme1: Movie = {
    id: 1,
    title: "Aviador",
    description: "Filme sobre aviação",
    genre: ["Ação", "Drama"],
    actors: ["Leonardo Di Caprio"],
    platform: ["Netflix", "Amazon"],
    getRecommendations: (title: string) => {
        console.log(`Filme ${title} recomendado para maiores de 18 anos.`)
    }
}

console.log(filme1.genre);
filme1.getRecommendations(filme1.title);

