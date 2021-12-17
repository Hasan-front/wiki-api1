const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB")
const articleSchema={
  title:String,
  content:String
}
const article= mongoose.model("article", articleSchema);

app.route("/main")
.get(function(req,res) {
  article.find(function(err,result) {
    if (!err) {
    res.send(result)
    } else {
      res.send(err)
    }
  })
})
.post(function (req,res) {
  article1=new article({  
    title:req.body.title,
    content:req.body.content
  })
  
})
.delete(function(req,res){
  article.deleteMany(function(err) {
    if (!err) {
      res.send("succesfully deleted all ")
    } else {
      res.send(err)
    }
  })
})
///////request targeting specific article//////
app.route("/articles/:articletitle")
.get(function (req,res) {
   article.findOne({title: req.params.articletitle},function(err,item) {
    if (item) {
        res.send(item)
    } else {
      res.send("no such article found")
    }
   })
})
.put(function (req,res) {
    article.updateOne(
      {
        title:req.params.articletitle
      },
      {
        title:req.body.title,
        content:req.body.content
      },
      
      function (err) {
        if (!err) {
          res.send("successfully updated article")
        }
      }
      );
})

.patch(function (req,res) {
  article.replaceOne({
    title: req.params.articletitle
  },
  {
    $set: req.body
  },
  
    function (err) {
      if (!err) {
        res.send("hoogaya jii")
      }
      else
      {
        res.send(err)
      }
    }
  
  )
})
.delete(function(req,res) {
  article.deleteOne({
    title:req.params.articletitle
  },
  function (err) {
    if (!err) {
   
      res.send("succesfully deleted")
    } else {
      res.send(err)
    }
  }
  )
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});