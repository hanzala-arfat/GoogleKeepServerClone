const express = require("express");
const app = express();
bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
  extended: true
}));

let keepnote = [{
    id: 1,
    title: "First",
    text: "Request Object − The request object represents the HTTP request and has properties for the        request query string, parameters, body, HTTP headers, and so on.",
    eiditing: false
  },
  {
    id: 2,
    title: "Secand",
    text: "Response Object − The response object represents the HTTP response that an Express app            sends when it gets an HTTP request.",
    eiditing: false
  }
]

app.get("/notes", (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Data Retrived successfully",
    keepnote,
  })
})

app.post('/notes', (req, res) => {
  if (!req.body.title) {
    return res.status(404).send({
      success: "false",
      message: "Required Title name"
    })
  } else if (!req.body.text) {
    return res.status(404).send({
      success: "false",
      message: "Required Text name"
    })
  }

  const EnterdNote = {
    id: keepnote.length + 1,
    title: req.body.title,
    text: req.body.text,
    eiditing: false,
  }
  keepnote.push(EnterdNote);
  return res.status(200).send({ // enter kiya gya data ko show karaya gya h
    success: "ture",
    message: 'successfull enterd data',
    EnterdNote,
  })
})

// Editing k liye 
app.post('/notes/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  keepnote.forEach((element) => {
    if (element.id === id) {
      element.title = req.body.title;
      element.text = req.body.text;

      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        element
      });
    }
  });
});
// delete end point
app.post('/notes/delete/:id', (req, res) => {

  let id = parseInt(req.params.id);
  for (var i = 0; i < keepnote.length; i++) {
    if (keepnote[i].id === id) {
      keepnote.splice(i, 1);
      return res.status(200).send({
        success: true,
        message: "successfuly deleted",
        keepnote: keepnote
      })
    }
  }
})

app.listen(5001, () => {
  console.log("Server Started At 5001");
})