//use BookStore
db.createCollection("Autor");
db.createCollection("GeneroLibro");
db.createCollection("Libro");
db.createCollection("Pedido");
db.createCollection("Reseña");
db.createCollection("Usuario");

let generos = [
    { nombre: 'Ficción' },
    { nombre: 'Literatura Infantil' },
    { nombre: 'Fantasía' },
    { nombre: 'Ciencia Ficción' },
    { nombre: 'Misterio' },
    { nombre: 'Romance' },
    { nombre: 'Aventura' },
    { nombre: 'Biografía' },
    { nombre: 'Historia' },
    { nombre: 'Política' },
    { nombre: 'Arte' },
    { nombre: 'Música' },
    { nombre: 'Cine' },
    { nombre: 'Teatro' },
    { nombre: 'Poesía' },
    { nombre: 'Filosofía' },
    { nombre: 'Religión' },
    { nombre: 'Autoayuda' },
    { nombre: 'Negocios' },
    { nombre: 'Economía' },
    { nombre: 'Viajes' },
    { nombre: 'Cocina' },
    { nombre: 'Deportes' },
    { nombre: 'Humor' },
    { nombre: 'Ensayo' },
    { nombre: 'Educación' },
    { nombre: 'Cómics' },
    { nombre: 'Manga' },
    { nombre: 'Novela Gráfica' },
    { nombre: 'Fotografía' },
    { nombre: 'Moda' },
    { nombre: 'Ciencia' }
];

db.GeneroLibro.insertMany(generos);