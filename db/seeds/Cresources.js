exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({teacher_id: 1, content:"Hoodie g venmo. Waistcoat twee lyft, whatever poutine swag quinoa synth normcore. Ennui asymmetrical lo-fi, keytar vegan man braid etsy chia. Activated charcoal YOLO ugh, gochujang salvia cray dreamcatcher tousled scenester put a bird on it mumblecore vape banh mi letterpress."})
      ]);
    });
};
