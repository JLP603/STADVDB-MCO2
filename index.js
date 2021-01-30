
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var db = mysql.createConnection({
  host: "relational.fit.cvut.cz",
  user: "guest",
  password: "relational",
  database: "YelpDataset3",
});

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

/* ---------- 1 TABLE (2 QUERIES) ---------- */

// [PAGE-03] QUERY 01: INPUT
app.get("/table1query1", function (req, res) {
  res.render("table1query1", {
    title: "Query #1 Input (One Table)",
    scripts: "js/t1q1.js",
  });
});

// [PAGE-04] QUERY 01: OUTPUT
app.get("/table1query1output-:param1", function (req, res) {
  var ctime = req.params.param1;
  console.time();
  var query1 =
    "SELECT SUM(time_" +
    ctime +
    ") / (SELECT MAX(sumtime) FROM (SELECT sum(time_0) sumtime FROM YelpDataset3.Checkins UNION ALL SELECT sum(time_1) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_2) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_3) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_4) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_5) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_6) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_7) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_8) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_9) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_10) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_11) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_12) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_13) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_14) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_15) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_16) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_17) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_18) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_19) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_20) FROM YelpDataset3.Checkins  UNION ALL  SELECT sum(time_21) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_22) FROM YelpDataset3.Checkins  UNION ALL SELECT sum(time_23) FROM YelpDataset3.Checkins) z)* 100 AS BusyChance FROM YelpDataset3.Checkins;";
  db.query(query1, function (error, result) {
    if (error) throw error;
    console.log(result);
    console.timeEnd();
    res.render("table1query1output", {
      title: "Query #1 Output (One Table)",
      scripts: "js/t1q1output.js",
      result: result,
      checkintime: ctime,
    });

 
  });
});
// [PAGE-05] QUERY 02: INPUT
app.get("/table1query2", function (req, res) {
  res.render("table1query2", {
    title: "Query #2 Input (One Table)",
    scripts: "js/t1q2.js",
  });
});

// [PAGE-06] QUERY 02: OUTPUT

app.get("/table1query2output-:param1", function (req, res) {
  var day_input = req.params.param1;
  console.time();
  var query =
    "SELECT day_of_week, SUM((time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23)) / (SELECT SUM((time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 + time_20 + time_21 + time_22 + time_23)) FROM YelpDataset3.Checkins) * 100 AS Busy_Percentage FROM YelpDataset3.Checkins WHERE day_of_week = '" +
    day_input+
    "' GROUP BY day_of_week;";
  
  db.query(query, function (error, output) {
    if (error) throw error;

    console.log(output);
    console.timeEnd();
    res.render("table1query2output", {
      title: "Query #2 Output (One Table)",
      scripts: "js/t1q2output.js",
      result: output,
      day_input: day_input,
    });
  });
});

/* ---------- 2 TABLES (2 QUERIES) ---------- */

// [PAGE-07] QUERY 03: INPUT
app.get("/table2query1", function (req, res) {
  res.render("table2query1", {
    title: "Query #3 Input (Two Tables)",
    scripts: "js/t2q1.js",
  });
});

// [PAGE-08] QUERY 03: OUTPUT
app.get("/table2query1output-:param1", function (req, res) {
  var business_name = req.params.param1;
  console.time();
  var query =
    "SELECT business_name, day_of_week, (time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23) checkinsN FROM YelpDataset3.Checkins a, Business b WHERE a.business_id = b.business_id AND business_name = '"
     +business_name+
     "' AND (time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23) = (SELECT MAX((time_0 + time_1 + time_2 + time_3 + time_4 + time_5 + time_6 + time_7 + time_8 + time_9 + time_10 + time_11 + time_12 + time_13 + time_14 + time_15 + time_16 + time_17 + time_18 + time_19 +time_20 + time_21 + time_22 + time_23)) AS timemax FROM YelpDataset3.Checkins a, Business b WHERE a.business_id = b.business_id AND business_name = '"
     +business_name+
     "');";
  
  db.query(query,function (error, result) {
      if (error) throw error;
      console.log(result);
      console.timeEnd();
      res.render("table2query1output", {
        title: "Query #3 Output (Two Tables)",
        scripts: "js/t2q1output.js",
        result: result,
        business_name: business_name,
      });
    }
  );
});

// [PAGE-09] QUERY 04: INPUT
app.get("/table2query2", function (req, res) {
  res.render("table2query2", {
    title: "Query #4 Input (Two Tables)",
    scripts: "js/t2q2.js",
  });
});

// [PAGE-10] QUERY 04: OUTPUT
app.get("/table2query2output-:param1", function (req, res) {
  var business_name = req.params.param1;
  console.time();
  var query=
    "SELECT business_name, r.stars, review_text FROM YelpDataset3.Business b, YelpDataset3.Reviews r WHERE b.business_id = r.business_id AND business_name = '"
    +business_name+
    "';";
  db.query(query,function (error, result) {
      if (error) throw error;
      console.log(result);
      console.timeEnd();
      res.render("table2query2output", {
        title: "Query #4 Output (Two Tables)",
        scripts: "js/t2q2output.js",
        result: result,
        business_name: business_name,
      });
    }
  );
});
/* ---------- 3 TABLES (2 QUERIES) ---------- */

// [PAGE-11] QUERY 05: INPUT
app.get("/table3query1", function (req, res) {
  res.render("table3query1", {
    title: "Query #5 Input (Three Tables)",
    scripts: "js/t3q1.js",
  });
});

// [PAGE-12] QUERY 05: OUTPUT
app.get("/table3query1output-:param1-:param2", function (req, res) {
  var user = req.params.param1;
  var business = req.params.param2;
  console.time();
  var query =
    "SELECT u.name, b.business_name, r.stars AS UserRate FROM YelpDataset3.Users u, YelpDataset3.Business b, YelpDataset3.Reviews r WHERE u.user_id = r.user_id AND b.business_id = r.business_id AND name = '" +
    user +
    "' AND business_name = '" +
    business +
    "';";
  db.query(query, function (error, result) {
    if (error) throw error;
    console.log(result);
    console.timeEnd();
    res.render("table3query1output", {
      title: "Query #5 Output (Three Tables)",
      scripts: "js/t3q1output.js",
      result: result,
      UserName: user,
      BusinessName: business,
    });
  });
});

// [PAGE-13] QUERY 06: INPUT
app.get("/table3query2", function (req, res) {
  res.render("table3query2", {
    title: "Query #6 Input (Three Tables)",
    scripts: "js/t3q2.js",
  });
});

// [PAGE-14] QUERY 06: OUTPUT
app.get("/table3query2output-:param1-:param2-:param3", function (req, res) {
  var year = req.params.param1;
  var month = req.params.param2;
  var day = req.params.param3;
  console.time();
  var query =
    "SELECT b.business_name, t.date_year, t.date_month, t.date_day, u.name, t.tip_text FROM YelpDataset3.Tips t, YelpDataset3.Users u, YelpDataset3.Business b WHERE t.business_id = b.business_id AND t.user_id = u.user_id AND  t.date_year = '" +
    year +
    "' AND  t.date_month = '" +
    month +
    "' AND t.date_day = '" +
    day +
    "';";
  db.query(query, function (error, result) {
    if (error) throw error;
    console.log(result);
    console.timeEnd();
    res.render("table3query2output", {
      title: "Query #6 Output (Three Tables)",
      scripts: "js/t3q2output.js",
      result: result,
      YearInput: year,
      MonthInput: month,
      DayInput: day,
    });
  });
});

/* ---------- 4 TABLES (1 QUERY) ---------- */

// [PAGE-15] QUERY 07: INPUT
app.get("/table4query", function (req, res) {
  res.render("table4query", {
    title: "Query #7 Input (Four Tables)",
    scripts: "js/t4q.js",
  });
});

// [PAGE-15] QUERY 07: OUTPUT
app.get("/table4queryoutput-:param1", function (req, res) {
  var category = req.params.param1;

  console.time();
  var query =
    "SELECT category, business_name, u.name, r.stars, r.votes_useful, r.review_text FROM YelpDataset3.Business_Categories c, YelpDataset3.Business b, (SELECT * FROM (SELECT * FROM YelpDataset3.Reviews ORDER BY business_id, votes_useful desc, review_id) a GROUP BY business_id) r, YelpDataset3.Users u WHERE c.business_id = b.business_id AND r.business_id = b.business_id AND u.user_id = r.user_id AND category = '" +
    category +
    "';";
  db.query(query, function (error, result) {
    if (error) throw error;
    console.log(result);
    console.timeEnd();
   
    res.render("table4queryoutput", {
      title: "Query #7 Output (Four Tables)",
      scripts: "js/t4qoutput.js",
      result: result,
      CategoryInput: category,
    });
  });
});

/* ------------------------------------ END -------------------------------------- */
