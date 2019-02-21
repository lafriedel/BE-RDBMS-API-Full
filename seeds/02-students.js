exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Ben Tsao", cohort_id: 1 },
        { name: "Leigh-Ann Friedel", cohort_id: 2 },
        { name: "Joe Pak", cohort_id: 3 }
      ]);
    });
};
