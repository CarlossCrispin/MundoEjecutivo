var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
//const panels = document.querySelectorAll('.panel');
module.exports = {

    getSignUp : function(req,res,next){
        return res.render('users/signup');
    },
    postSignUp: function(req,res,net){
        console.log(req.body);
       
        //creando variable de encriptacion
        var salt = bcrypt.genSaltSync(10)
        var password = bcrypt.hashSync(req.body.password, salt);
        var user = {
            email : req.body.email,
            nombre : req.body.nombre,
            password : password,
            password1 : req.body.password

        };
         //pasamos la configuracion de la base de datos
         var config = require('.././database/config');
         //creamos la coneccion a la base de datos 
         var url = config.url;
         console.log(`> BD: ${url}`);
         //insertamos los datos 
         mongo.connect(url, function (err, db) {
             if (err) throw err
             var collection = db.collection('Users')
             collection.insert(user, function (err, data) {
                 if (err) throw err
                 console.log(JSON.stringify(user))
                 db.close()
             });
         });
         //cuando se registre muestra mesj flash
        req.flash('info','Se ha registrado correctamente, ya puede iniciar sesión ');
         return res.redirect('/auth/signin');
    },
    getSignIn: function(req, res , next){
        return res.render('users/signin',{ message: req.flash('info'), authmessage : req.flash('authmessage')});
    },
    logout : function(req, res, next){
        req.logout();
        res.redirect('/auth/signin');
    },
    getUserPanel : function(req,res,next){
        res.render('users/panel',{
            isAuthenticated: req.isAuthenticated(),
            user : req.user
        });
    },
    getShowUser1 : function(req, res, next){
        res.render('users/showUser',{
            isAuthenticated: req.isAuthenticated(),
            user : req.user
        });
    },
    getShowUser: function (req, res, next) {
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
        mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.find().toArray(function (err, documents, fields) {
                if (err) throw err;
                //se imprimen los documentos encontrados 
                console.log(`------- datos${documents}`);
                console.log(JSON.stringify(documents));
                //se cierra la conexion a la base de datos

                console.log('lo que envia de items');
                //) console.log (`${items}`);
                db.close();
                res.render('users/showUser', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: documents
                });
            });
        });
    }
};
