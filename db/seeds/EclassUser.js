exports.seed = function(knex, Promise) {
  return knex('class_user').del()
    .then(function () {
      return Promise.all([
        knex('class_user').insert({user_id: 2, class_id: "123456"}),
        knex('class_user').insert({user_id: 3, class_id: "123456"}),
        knex('class_user').insert({user_id: 2, class_id: "098765"})

      ]);
    });
};
