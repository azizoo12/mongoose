//defining a schema for your Person model:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
//Create and save a record of a model:

const person = new Person({
    name: 'John',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });
  //Use Model.findById() to search your database by _id:

  person.save(function(err, data) {
    if (err) return console.error(err);
    console.log('Person saved successfully:', data);
  });
//Perform classic updates by running find, edit, then save:

  const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
    { name: 'Bob', age: 40, favoriteFoods: ['Steak', 'Salad'] }
  ];
  
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    console.log('People created successfully:', data);
  });
  Person.find({ name: 'John' }, function(err, people) {
    if (err) return console.error(err);
    console.log('People with name "John":', people);
  });
  Person.findOne({ favoriteFoods: 'Pizza' }, function(err, person) {
    if (err) return console.error(err);
    console.log('Person with favorite food "Pizza":', person);
  });
  //Perform new updates on a document using Model.findOneAndUpdate():

  const personId = 'your_person_id_here';

  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    console.log('Person with id', personId, 'found:', person);
  });
  //Delete one document using Model.findByIdAndRemove():

  const personId = 'your_person_id_here';

  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    
    person.favoriteFoods.push('Hamburger');
    
    person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      console.log('Person updated successfully:', updatedPerson);
    });
  });
  //MongoDB and Mongoose - Delete many documents with Model.remove():

  const personName = 'John';

  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function(err, updatedPerson) {
      if (err) return console.error(err);
      console.log('Updated person:', updatedPerson);
    }
  );
  //Chain search query helpers to narrow search results:

  const personId = 'your_person_id_here';

  Person.findByIdAndRemove(personId, function(err, deletedPerson) {
    if (err) return console.error(err);
    console.log('Deleted person:', deletedPerson);
  });
  Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) return console.error(err);
    console.log('Deleted', result.n, 'people named Mary');
  });
  Person.find({ favoriteFoods: 'Burritos' })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, people) {
    if (err) return console.error(err);
    console.log('People who like burritos:', people);
  });
                  