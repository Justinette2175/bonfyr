exports.seed = function(knex, Promise) {
  return knex('teachers').del()
    .then(function () {
      return Promise.all([
        knex('teachers').insert({user_id: 1, description: 'I am the most wonderful teacher in the world'})
      ]);
    });
};
