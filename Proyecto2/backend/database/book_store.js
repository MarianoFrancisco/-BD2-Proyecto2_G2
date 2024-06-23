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
    { nombre: 'Política' }
];

db.GeneroLibro.insertMany(generos);