exports.seed = function(knex, Promise) {
  return knex('class').del()
    .then(function () {
      return Promise.all([
        knex('class').insert({  id: "123456",
                                teacher_id: 1,
                                 class_name: 'Moksha Flow 60',
                                 class_description: "Hot yoga at a fast pace",
                                 link: "www.link.com",
                                 start_time: "2017-02-25 20:20",
                                 price: 10.50,
                                 max_number_students: 5,
                                }),
        knex('class').insert({  id: "098765",
                                teacher_id: 1,
                                 class_name: 'Moksha Flow 70',
                                 class_description: "Hot yoga at a slow pace",
                                 link: "www.link2.com",
                                 start_time: "2017-02-26 20:20",
                                 price: 10.50,
                                 max_number_students: 5,
                                }),
        knex('class').insert({  id: "462956",
                                teacher_id: 1,
                                 class_name: 'Moksha Flow 80',
                                 class_description: "Hot yoga at a super fast pace",
                                 link: "www.link3.com",
                                 start_time: "2017-02-27 20:20",
                                 price: 10.50,
                                 max_number_students: 5,
                                })
      ]);
    });
};
