const express = require("express");
require('dotenv').config();
const connectDB = require("./config/connectDB");
const Person = require("./model/Person");

const app = express();
connectDB();

//Add new person 
//const person = new Person({
    //name: "Eren",
    //age:25,
    //favoriteFoods:["Pizza", "Pasta", "Risotto"]})

//person.save().then(()=>console.log(person)).catch((err)=>console.log(err))
//saved



//Create Many Records with model.create()
//const person = [
   // { name: "John", age: 25, favoriteFoods: ["sushi", "chocolate", "fish"] },
   // { name: "Jane", age: 30, favoriteFoods: ["pizza", "pasta","chiken" ] },
   // { name: "Rob", age: 40, favoriteFoods: ["steak", "potatoes", "hamburger"] }
  //];
  
  //Person.create(person)
  //.then((result) => {
   // console.log(`${result.length} people saved successfully`);
 // })
 // .catch((error) => {
//console.log("Error saving people to database", error);
 // });



//Find all people
const findPerson = async()=>{
    try{
 const result = await Person.find({})
        console.log(result)
    } catch (error) {
      console.log(error)
    }}
findPerson()



// find by name
const findByName = async()=>{
    try{
        let personName = "John"
        const result = await Person.find({ name: personNamez })
        console.log(result)
    } catch (error) {
        console.log(error)
    }}
//findPerson()


//Find just one person
const findOnePerson = async()=>{
   try{
        const result = await Person.findOne(({ favoriteFoods: 'sushi' }))
        console.log(result)
    } catch (error) {
        console.log(error)
    }}
//findOnePerson()

//Find by id
const findPersonById = async()=>{
    try{
        const result = await Person.findById( "645f938253ef9e71caea05d5")
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
//findPersonById()

//update person
//const personId = "645f8e6cfb972a63f860e70a";
const newFood = "hamburger";

async function updatePerson(personId, newFood) {
    try {
      const person = await Person.findById(personId);
      console.log(`Found ${person.name}, adding ${newFood} to favorites`);
      person.favoriteFoods.push(newFood);
      const updatedPerson = await person.save();
      console.log(`Updated ${updatedPerson.name}'s favorite foods`);
      console.log(updatedPerson);
    } catch (error) {
      console.log("Error updating person", error);
    }
  }
  
  //updatePerson(personId, newFood);



  //update person age
  const personName = "John";

async function updatePersonAge(personName) {
  try {
    const updatedPerson = await Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true });
    console.log(`Updated ${updatedPerson.name}'s age to ${updatedPerson.age}`);
    console.log(updatedPerson);
  } catch (error) {
    console.log("Error updating person's age", error);
  }
}

//updatePersonAge(personName);




//Delete one person
const personId = "645f938253ef9e71caea05d7";

async function deletePersonById(personId) {
  try {
    const deletedPerson = await Person.findByIdAndRemove(personId);
    console.log(`Deleted ${deletedPerson.name} from the database`);
  } catch (error) {
    console.log("Error deleting person from the database", error);
  }
}

//deletePersonById(personId);




//Delete all the people whose name is “Mary”
Person.deleteMany({ name: "Mary" })
  .then((result) => {
    console.log(result.deletedCount + " documents deleted");
  })
  .catch((err) => {
    console.error(err);
  });




  //Find people who like burritos
  async function findPeopleWhoLikeBurritos() {
    try {
      const data = await Person.find({ favoriteFoods: "burritos" })
        .sort("name")
        .limit(2)
        .select("-age")
        .exec();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  
  findPeopleWhoLikeBurritos();
  
  

const PORT = process.env.PORT 

app.listen(PORT,(err)=>{
    err? console.log(err) : console.log(`server is running on port ${PORT}`)
})