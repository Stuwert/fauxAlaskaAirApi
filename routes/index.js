var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var knex = require('../db/knex')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Validates login
router.get('/login', function(req, res){
console.log(req.headers);
  // expected payload contains username, password, and flight #

  var username = req.headers.username;
  var password = req.headers.password;
  var flight_id = req.headers.flightinfo;


  Users().where({username: username}).first().then(function(user){
    if(user){
      bcrypt.compare(password, user.password, function(err, result){
        //result should be a boolean
        if(result){
          Users()
            .from('users')
            .leftJoin('user_flights', 'user_flights.user_id', 'users.id')
            .where('user_id', user.id)
            .where('flight_id', flight_id)
            .first()
            .then(function(information){
              res.status(202).json(information)
            })
        }else{
          res.status(403).json({information: 'Incorrect password'})
        }
      })
    }else{
      res.status(403).json({information: 'Incorrect password'})
    }
  })
})

// Creates new user
router.get('/signup', function(req, res){

  var username = req.body.payload.username;
  var password = req.body.payload.password;
  var flight_id = req.body.payload.flight_id;

Users.where({username : username}).first().then(function(user){
  if(!user){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        Users.insert({
          lifeTimeMiles: 0,
          currentMiles: 0,
          username: username,
          password: hash,
          email: req.body.payload.password,
          authorized: false,
          status: null,
          milesMultiplier: 1
        })
      }).returns('id').then(function(userid){
        User_Flights().insert({
          user_id: userid,
          flight_id: flight_id,
          seatLocation: null,
          seatRow: null,
          milesEarned: req.body.payload.miles,
          status: null
        }).then(function(){
          res.status(201).json({information: 'Succesfully Saved!'})
        })
      })
    })
  }else{
    res.status(409).json({information: "User already exists"})
  }
})



})

// Receives data dump for emails
router.post('/flightCompleted', function(req, res){

})


function Users(){
  return knex('users')
}

function Flights(){
  return knex('flights')
}

function User_Flights(){
  return knex('user_flights')
}





module.exports = router;
