const express = require('express');
const { url } = require('inspector');
const path = require('path');
const port = 8000;


const db=require('./config/mongoose');
const Contact = require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//creating own Middleware
// app.use(function(req, res, next){
//     console.log('middleware 1 called');
//     next();
// });
   
// app.use(function(req, res, next){    
//     console.log('middleware 2 called');
//     next();
// });
   


var contactList=[
    {
        name : 'Prince',
        phone: '9650112704'
    },
    {
        name :'Rohit',
        phone:'8718171873'
    },
    {
        name:'Arun',
        phone:'282828282'
    }
]

app.get('/',function(req, res){
   
    // res.send('<h1> Yup! got the page !!! </h1>')

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from DB');
            return ;
        }

        return res.render('home',{
            title:'My Contact List',
            contact_list:contacts
        });

    });


    
});

// app.get('/practice',function(req,res){
//     return res.render('practice',{
//         title:'Practice Page'
//     });
// });

app.post('/create_contact', function(req,res){

    // console.log(req.body);    --->body of request contains the object of passed data
    // contactList.push(req.body); --->no need to create contact list now , we have mongodb

    Contact.create({
        name : req.body.name,
        phone: req.body.phone

    }, function(err, newContact){
        if(err){
            console.log('Error in creating Contact!');
            return ;
        }
        console.log('*********', newContact);

        return res.redirect('back');


    });


} );

app.get('/delete-contact/', function(req, res){

    // get the id from the query in the url
    let id=req.query.id;

    // find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from the database');
            return ;
        }
        return res.redirect('back');

    });

});

// app.get('/profile',function(req, res){
//     res.send('<h1> YO! you are seeing profile </h1>')
// });


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server : ',err);
    }

    console.log('Server is running successfully on port :',port);

});