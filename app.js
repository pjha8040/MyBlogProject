const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Hello, and welcome to my blog! I’m Priyanshu Jha, a passionate web developer with a love for creating dynamic and engaging web applications. Here, you’ll find posts about the latest trends in web development, tutorials on various programming languages and frameworks, and insights from my personal projects.\n\nWhether you're a beginner looking to learn the basics or an experienced developer seeking advanced tips, there's something here for you. I hope you find my blog informative and inspiring. Happy coding!";
const aboutContent =
  "Hi, I'm Priyanshu Jha, a web developer with a knack for turning ideas into reality through code. With a strong foundation in HTML, CSS, and JavaScript, I have built numerous projects that range from simple websites to complex web applications.<br><br>My journey into web development began with a curiosity about how websites work, which soon turned into a passion. I expanded my skills by learning frameworks and libraries such as Express.js, Node.js, Bootstrap, and EJS. I believe in continuous learning and staying updated with the latest technologies to create better and more efficient web solutions.<br><br>In this blog, I share my experiences, challenges, and the knowledge I've gained over the years. I hope to help and inspire others who are on their own coding journeys.";
const contactContent =
  "I'd love to hear from you! Whether you have questions, suggestions, or just want to say hi, feel free to reach out to me.<br><br>Email: pjha8040@gmail.com<br><br>I'm always open to connecting with fellow developers, collaborating on projects, or simply discussing new ideas. Let's connect and create something amazing together.";
const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { content: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { contentAbout: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contentContact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    postTitle: req.body.postTitle,
    composeText: req.body.composeText,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const postName = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    let temp = _.lowerCase(post.postTitle);
    if (postName === temp) {
      res.render("post", { post: post });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
