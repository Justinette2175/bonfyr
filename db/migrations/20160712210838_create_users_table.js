exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.integer('id');
      table.primary('id');
      table.string('first_name');
      table.string('last_name');
      table.string('username');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('teachers', function (table) {
      table.integer('id');
      table.primary('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.string('description');
      table.string('avatar');
    }),
    knex.schema.createTable('resources', function (table) {
      table.increments('id');
      table.integer('teacher_id');
      table.foreign('teacher_id').references('teachers.id');
      table.text('content');
    }),
    knex.schema.createTable('class', function (table) {
      table.string('id');
      table.primary('id');
      table.integer('teacher_id');
      table.foreign('teacher_id').references('teachers.id');
      table.string('class_name');
      table.string('class_description');
      table.string('link')
      table.dateTime('start_time');
      table.float('price', [2]);
      table.integer('max_number_students');
    }),
    knex.schema.createTable('payment', function (table) {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.string('class_id');
      table.foreign('class_id').references('class.id');
      table.float('price', [2]);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('class_user', function (table) {
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.string('class_id');
      table.foreign('class_id').references('class.id');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all ([
    knex.schema.dropTable('payment'),
    knex.schema.dropTable('class_user'),
    knex.schema.dropTable('resources'),
    knex.schema.dropTable('class'),
    knex.schema.dropTable('teachers'),
    knex.schema.dropTable('users')
  ])
};
