exports.seed = function(knex, Promise) {
  return knex('cashback').del()
    .then(function () {
      return knex('cashback').insert([
        { id: 1, diasemana: 'domingo', genero: 'pop', cash: '25'},
        { id: 2, diasemana: 'domingo', genero: 'mpb', cash: '30'},
        { id: 3, diasemana: 'domingo', genero: 'classic', cash: '35'},
        { id: 4, diasemana: 'domingo', genero: 'rock', cash: '40'},
        
        { id: 5, diasemana: 'segunda', genero: 'pop', cash: '7'},
        { id: 6, diasemana: 'segunda', genero: 'mpb', cash: '5'},
        { id: 7, diasemana: 'segunda', genero: 'classic', cash: '3'},
        { id: 8, diasemana: 'segunda', genero: 'rock', cash: '10'},
     
        { id: 9, diasemana: 'terca', genero: 'pop', cash: '265'},
        { id: 10, diasemana: 'terca', genero: 'mpb', cash: '10'},
        { id: 11, diasemana: 'terca', genero: 'classic', cash: '5'},
        { id: 12, diasemana: 'terca', genero: 'rock', cash: '15'},
     
        { id: 13, diasemana: 'quarta', genero: 'pop', cash: '2'},
        { id: 14, diasemana: 'quarta', genero: 'mpb', cash: '15'},
        { id: 15, diasemana: 'quarta', genero: 'classic', cash: '8'},
        { id: 16, diasemana: 'quarta', genero: 'rock', cash: '15'},
     
        { id: 17, diasemana: 'quinta', genero: 'pop', cash: '10'},
        { id: 18, diasemana: 'quinta', genero: 'mpb', cash: '20'},
        { id: 19, diasemana: 'quinta', genero: 'classic', cash: '13'},
        { id: 20, diasemana: 'quinta', genero: 'rock', cash: '15'},
     
        { id: 21, diasemana: 'sexta', genero: 'pop', cash: '15'},
        { id: 22, diasemana: 'sexta', genero: 'mpb', cash: '25'},
        { id: 23, diasemana: 'sexta', genero: 'classic', cash: '18'},
        { id: 24, diasemana: 'sexta', genero: 'rock', cash: '20'},
     
        { id: 25, diasemana: 'sabado', genero: 'pop', cash: '20'},
        { id: 26, diasemana: 'sabado', genero: 'mpb', cash: '30'},
        { id: 27, diasemana: 'sabado', genero: 'classic', cash: '25'},
        { id: 28, diasemana: 'sabado', genero: 'rock', cash: '40'},
     
      ]);
    });
};