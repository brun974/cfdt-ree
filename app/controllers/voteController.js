const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const Vote = require('../models/vote');

class voteController {

    loggedIn(req, res , next){

        if(req.session.user){next(); }
		else { res.redirect('/login'); }
    }

    add(req, res){
        res.render('admin/createVote.ejs');
    };

    list(req, res){
        Vote.find({}, function(err, votes){
            res.render('admin/listVotes', {votes: votes});
        })
    }

    post(req, res){
        let myData = new Vote(req.body);
        myData.save()
        .then(item => {
            res.redirect("/liste-votes"); 
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });  
    }
}

module.exports = new voteController();