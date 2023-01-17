var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var ejs = require("ejs")
const app = express()
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://0.0.0.0:27017/sample_new')
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connection to database"));
db.once('open', () => console.log("Connected to Database"))
const movieSchema = new mongoose.Schema({
    sid: String,
    s1: String,
    s2: String,
    s3: String,
    s4: String,
    s5: String,
},
    {
        collection: 'record'
    })
const Movie = mongoose.model('Movie', movieSchema);


app.post("/sign_up", (req, res) => {
    var sid= req.body.sid;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;
    // console.log(name);
    var data = {
        "sid":sid,
        "s1": s1,
        "s2": s2,
        "s3": s3,
        "s4": s4,
        "s5": s5,
    }
    db.collection('record').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    //  return res.redirect('input.html')
    Movie.find({}, function (err, movies) {
        console.log(movies);
        res.render('Dashboard', {
            MovieList: movies
        })
    });
})

app.post("/rank", (req, res) => {
    var sid = req.body.sid;
    var r1 = req.body.r1;
    var r2 = req.body.r2;
    var r3 = req.body.r3;
    var r4 = req.body.r4;
    var r5 = req.body.r5;
    var data = {
        "sid": sid,
        "r1": r1,
        "r2": r2,
        "r3": r3,
        "r4": r4,
        "r5": r5,
    }
    db.collection('rank').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
})



app.get('/', (req, res) => {
    Movie.find({}, function (err, movies) {
        console.log(movies);
        res.render('Dashboard', {
            MovieList: movies
        })
    });

})
app.listen(3000, function () {
    console.log("Listening on PORT 3000");
});

