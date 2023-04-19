const express = require('express');
require("dotenv").config();
const renderView = require('../models/database_function.js');
const {render_database2} = require('../models/database_function.js');
const {User_db} = require('../models/users_db.js');
const {Title_web} = require('../models/users_db.js');
//controller render pages 
// bộ điều khiển kết xuất trang
class homeController {
    //render home page ...
    // kết xuất trang home và các trang khác ...
    index = async (req, res, next)=>{
    
        renderView.render_database(User_db ,req, res , next, 'index.cl7');
    }
    news = async (req,res, next)=>{
       
        User_db.findOne({})
        .then(data => { 
            res.render('news.cl7', {data : render_database2(data)});
        }).catch(err =>{
        next(err);
        });
    }
    contact = async (req,res, next)=>{
       
        renderView.render_database(User_db ,req, res , next, 'contact.cl7');
    }
    postcontact = async (req,res, next)=>{
       
        console.log(req.body);
        renderView.render_database(User_db ,req, res , next, 'contact.cl7');
    }
    message = async (req,res, next)=>{
       
        renderView.render_database(User_db ,req, res , next, 'message.cl7');
    }
    postmessage = async (req,res, next)=>{
       
        console.log(req.body);
        renderView.render_database(User_db ,req, res , next, 'message.cl7');
    }
    show = async (req,res, next)=>{
       
        //console.log(req.params.slug);
        //renderView.render_database(User_db ,req, res , next, 'index.cl7');
        // res.send(`Home detail ${req.params.slug}`);
        User_db.findOne({slug: req.params.slug})
            .then(data => { 
                res.render('show/show.cl7', {data : render_database2(data)});
            }).catch(err =>{
            next(err);
        });
    }
}

module.exports = {
    homePage : new homeController,
}