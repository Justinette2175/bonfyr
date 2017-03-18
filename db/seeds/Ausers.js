exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({first_name: 'Alice', last_name: 'Wonderland', username: 'alice911', email: 'alice911@gmail.com', password: 'cuterabbit'}),
        knex('users').insert({first_name: 'Bob', last_name: 'Builder', username: 'bobthebuilder', email: 'bobbuilds@gmail.com', password: 'icanbuild'}),
        knex('users').insert({first_name: 'Charlie', last_name: 'Chocolate', username: 'charlieloveschocolate', email: 'chocolate4life@gmail.com', password: 'ihatechocolate'})
      ]);
    });
};
