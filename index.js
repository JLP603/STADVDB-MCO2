
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var db = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b171c289217746",
  password: "878eba92",
  database: "heroku_8a9100e8b8937ad",
});
/*
database:STADVDB MCO2 or heroku_8a9100e8b8937ad
mysql://
username:b171c289217746
:
password:878eba92
hostname:us-cdbr-east-03.cleardb.com
/heroku_8a9100e8b8937ad?reconnect=true
*/

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


const app = express();
const port = process.env.PORT || 9000;
//originally const port= 9000;

app.listen(port, () => console.log(`App listening to port ${port}`));

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultView: "main",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);

app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/scripts"));


app.use(express.static("public"));

/* ------------------------------------ PAGE ROUTES -------------------------------------- */

// [PAGE-01] HOME PAGE
app.get("/", function (req, res) {
  res.render("home", {
    title: "Home",
    scripts: "",
  });
});

// [PAGE-02] ABOUT PAGE
app.get("/about", function (req, res) {
  res.render("aboutpage", {
    title: "About Page",
    scripts: "",
  });
});

/* ---------- ROLL UP ---------- */

// [PAGE-03] QUERY 01: INPUT
app.get("/query1", function (req, res) {
  res.render("query1", {
    title: "Query #1 Input",
    scripts: "js/q1.js",
  });
});

// [PAGE-04] QUERY 01: OUTPUT
app.get("/query1output-:param1", function (req, res) {
  var category = req.params.param1;
  console.time();
  var query1 =
  
    "SELECT b.state, b.city, AVG(b.stars) avgStars FROM business_yelp_clean b INNER JOIN business_categories_yelp_clean c ON b.business_id = c.business_id WHERE c.category = '" +
    category +
    "' AND b.active = 'true' GROUP BY b.state, b.city WITH ROLLUP;";
    /*
    "SELECT SUM(time_" +
    ctime +
    ") / (SELECT MAX(sumtime) FROM (SELECT sum(time_0) sumtime FROM YelpDataset3.Checkins UNION ALL SELECT sum(time_1) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_2) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_3) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_4) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_5) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_6) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_7) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_8) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_9) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_10) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_11) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_12) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_13) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_14) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_15) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_16) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_17) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_18) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_19) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_20) FROM YelpDataset3.Checkins  UNION ALL  SELECT sum(time_21) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_22) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_23) FROM YelpDataset3.Checkins) z)* 100 AS BusyChance FROM YelpDataset3.Checkins;";
  */
    db.query(query1, function (error, result) {
    if (error) throw error;
    console.log(result);
    console.timeEnd();
    res.render("query1output", {
      title: "Query #1 Output",
      scripts: "js/q1output.js",
      result: result,
      category: category,
    });

 
  });
});

/* ---------- DRILL DOWN ---------- */

// [PAGE-05] QUERY 02: INPUT
app.get("/query2", function (req, res) {
  res.render("query2", {
    title: "Query #2 Input",
    scripts: "js/q2.js",
  });
});

// [PAGE-06] QUERY 02: OUTPUT

app.get("/query2output-:param1 -:param3", function (req, res) {
  var state = req.params.param1;
  var category = req.params.param2;
  var day_of_week = req.params.param3;
  console.time();
  var query =
  "SELECT b.city, b.business_name FROM business_yelp_clean b INNER JOIN business_categories_yelp_clean c ON b.business_id = c.business_id INNER JOIN business_hours_yelp_clean h ON b.business_id = h.business_id INNER JOIN business_attributes_yelp_clean a ON b.business_id = a.business_id WHERE b.state = '"+
  state+
  " AND c.category = '"+
  category+ 
  "' AND h.day_of_week = '"+ 
  day_of_week+
  "' AND a.attribute_name = 'Accepts Credit Cards' AND a.attribute_value = 'true' ORDER BY b.city, b.business_name;";
  
  /*
    "SELECT day_of_week, SUM((time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23)) / (SELECT SUM((time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 + time_20 + time_21 + time_22 + time_23)) FROM YelpDataset3.Checkins) * 100 AS Busy_Percentage FROM YelpDataset3.Checkins WHERE day_of_week = '" +
    day_input+
    "' GROUP BY day_of_week;";
  */
  db.query(query, function (error, result) {
    if (error) throw error;

    console.log(result);
    console.timeEnd();
    res.render("query2output", {
      title: "Query #2 Output",
      scripts: "js/q2output.js",
      result: result,
      state_input: state,
      category_input: category,
      day_of_week_input: day_of_week,
    });
  });
});

/* ---------- SLICE ---------- */

// [PAGE-07] QUERY 03: INPUT
app.get("/query3", function (req, res) {
  res.render("query3", {
    title: "Query #3 Input",
    scripts: "js/q3.js",
  });
});

// [PAGE-08] QUERY 03: OUTPUT
app.get("/query3output-:param1", function (req, res) {
  var category = req.params.param1;
  console.time();
  var query =
    "SELECT category, city, AVG(stars) FROM business_yelp_clean b INNER JOIN business_categories_yelp_clean c ON b.business_id = c.business_id WHERE category = '"+
    category+
    "' GROUP BY city, category;";
  /*
    "SELECT business_name, day_of_week, (time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23) checkinsN FROM YelpDataset3.Checkins a, Business b WHERE a.business_id = b.business_id AND business_name = '"
     +business_name+
     "' AND (time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23) = (SELECT MAX((time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23)) AS timemax FROM YelpDataset3.Checkins a, Business b WHERE a.business_id = b.business_id AND business_name = '"
     +business_name+
     "');";
  */
  db.query(query,function (error, result) {
      if (error) throw error;
      console.log(result);
      console.timeEnd();
      res.render("query3output", {
        title: "Query #3 Output",
        scripts: "js/q3output.js",
        result: result,
        category: category,
      });
    }
  );
});

/* ---------- DICE ---------- */

// [PAGE-09] QUERY 04: INPUT
app.get("/query4", function (req, res) {
  res.render("query4", {
    title: "Query #4 Input",
    scripts: "js/q4.js",
  });
});

// [PAGE-10] QUERY 04: OUTPUT
app.get("/query4output-:param1-:param2-:param3-:param4", function (req, res) {
  var city = req.params.param1;
  var category = req.params.param2;
  var day_of_week = req.params.param3;
  var time = req.params.param4;
  console.time();
  var query=
      "SELECT city, SUM(review_count) as total_reviews FROM business_yelp_clean b INNER JOIN business_categories_yelp_clean c INNER JOIN business_hours_yelp_clean h ON b.business_id = c.business_id AND b.business_id = h.business_id WHERE category = '" +
      category+ 
      "' AND city = '" +
      city +
      "' AND day_of_week = '"+
      day_of_week+
      "' AND ((opening_time_hours <= "+
      time+
      " AND closing_time_hours > "+
      time+
      ") OR (opening_time_hours >= "+
      time +
      " AND closing_time_hours > "+
      time +
      " AND opening_time_hours > closing_time_hours) OR (opening_time_hours = closing_time_hours));";

  /*
    "SELECT business_name, r.stars, review_text FROM YelpDataset3.Business b, YelpDataset3.Reviews r WHERE b.business_id = r.business_id AND business_name = '"
    +business_name+
    "';";
    */
  db.query(query,function (error, result) {
      if (error) throw error;
      console.log(result);
      console.timeEnd();
      res.render("query4output", {
        title: "Query #4 Output",
        scripts: "js/q4output.js",
        result: result,
        city: city,
        category: category,
        day_of_week: day_of_week,
        time: time,
      });
    }
  );
});


/* ------------------------------------ END -------------------------------------- */
