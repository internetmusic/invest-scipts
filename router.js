var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');

const fs = require("fs");
const path = require("path");
var BigNumber = require('big-number');
var Contract = require('web3-eth-contract');


const cors = require('cors');
var BigNumber = require('big-number');
const Tx = require('ethereumjs-tx').Transaction;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const provider = require('./libs/provider');
var web3 = new Web3(new Web3.providers.HttpProvider(provider));


var contractAbi = require('./libs/electionAbi');
const contractAddress = require('./libs/electionContract');
const contractTOGet = new  web3.eth.Contract(contractAbi,contractAddress);


function getCurrentLead() {
    return new Promise((resolve, reject) => {
        contractTOGet.methods.CurrentResult().call().then(function (end) {
        return resolve(end);
      })
    })
  }
  
  
  app.get('/CurrentLead', async (req, res) => {
    try
    {
      var CurrentLead = await getCurrentLead();
      res.send(output);
    } catch(err) {
      console.log('err' + err.message);
      res.status(500).send({
        error: 1,
        error_message: err.message
      });
    }
    finally{
      var getEnd = new Date(Date.now()).toUTCString();
      console.log("router.js [getCurrentLead] Executed at UTC Time :" + getEnd);
    }
  });








  function getFinalResult() {
    return new Promise((resolve, reject) => {
        contractTOGet.methods.FinalResult().call().then(function (end) {
        return resolve(end);
      })
    })
  }
  
  
  app.get('/FinalResult', async (req, res) => {
    try
    {
      var result = await getFinalResult();
      res.send({
        error: 0,
        won: result
      });
    } catch(err) {
      console.log('err' + err.message);
      res.status(500).send({
        error: 1,
        error_message: err.message
      });
    }
    finally{
      var getEnd = new Date(Date.now()).toUTCString();
      console.log("router.js [final result] Executed at UTC Time :" + getEnd);
    }
  });


  
  
  
  function getBidenVotes() {
    return new Promise((resolve, reject) => {
        contractTOGet.methods.fVoterCount().call().then(function (end) {
        return resolve(end);
      })
    })
  }

  function getTrumpVotes() {
    return new Promise((resolve, reject) => {
        contractTOGet.methods.tVoterCount().call().then(function (end) {
        return resolve(end);
      })
    })
  }
  
  
  app.get('/BidenVotes', async (req, res) => {
    try
    {
      var bVotes = await getBidenVotes();
      res.send({
        error: 0,
        bidenvotes: bVotes
      });
    } catch(err) {
      console.log('err' + err.message);
      res.status(500).send({
        error: 1,
        error_message: err.message
      });
    }
    finally{
      var getEnd = new Date(Date.now()).toUTCString();
      console.log("router.js [BidenVotes] Executed at UTC Time :" + getEnd);
    }
  });


  app.get('/TrumpVotes', async (req, res) => {
    try
    {
      var tVotes = await getTrumpVotes();
      res.send({
        error: 0,
        trumpvotes: tVotes
      });
    } catch(err) {
      console.log('err' + err.message);
      res.status(500).send({
        error: 1,
        error_message: err.message
      });
    }
    finally{
      var getEnd = new Date(Date.now()).toUTCString();
      console.log("router.js [TrumpVotes] Executed at UTC Time :" + getEnd);
    }
  });

  function getBidenVoters() {
    return new Promise((resolve, reject) => {
        contractTOGet.methods.fVoters().call().then(function (end) {
        return resolve(end);
      })
    })
  }


  function getTrumpVoters() {
    return new Promise((resolve, reject) => {
        contractTOGet.methods.tVoters().call().then(function (end) {
        return resolve(end);
      })
    })
  }
  
  
  app.get('/BidenVoters', async (req, res) => {
    try
    {
      var bVoters = await getBidenVoters();
      res.send({
        error: 0,
        bidenvoters: bVoters
      });
    } catch(err) {
      console.log('err' + err.message);
      res.status(500).send({
        error: 1,
        error_message: err.message
      });
    }
    finally{
      var getEnd = new Date(Date.now()).toUTCString();
      console.log("router.js [BidenVoters] Executed at UTC Time :" + getEnd);
    }
  });

  
  app.get('/TrumpVoters', async (req, res) => {
    try
    {
      var tVoters = await getTrumpVoters();
      res.send({
        error: 0,
        Trumpvoters: tVoters
      });
    } catch(err) {
      console.log('err' + err.message);
      res.status(500).send({
        error: 1,
        error_message: err.message
      });
    }
    finally{
      var getEnd = new Date(Date.now()).toUTCString();
      console.log("router.js [TrumpVoters] Executed at UTC Time :" + getEnd);
    }
  });

  


app.listen(8008, function(err){
    if (!err) {
      console.log("Server is Running on port 8008");
    }
  });
