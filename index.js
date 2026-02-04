console.log(">>> MY SERVER FILE IS RUNNING <<<");
const simpleGit = require("simple-git") ;
const express = require("express");
const app = express();

app.use(express.json());
app.use("/deployments", express.static("output"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/deploy", async(req, res) => {
  console.log("deploy endpoint hit");

  const repoUrl = req.body.repoUrl;

  if(!repoUrl){
    return res.status(400).json({error: "repoUrl missing"});
  }
  const id = Date.now().toString();
  const path = `output/${id}`;
  try{
    await simpleGit().clone(repoUrl , path);
    res.json({
        message: "repo cloned successfully",
        id : id
    });
  }
  catch(err){
    console.error(err);
    res.status(500).json({error: "failed to clone repo"});
  }

});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
