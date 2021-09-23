const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
const multer = require("multer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(routes);

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"-"+file.originalname);
    }
});

const upload = multer({ storage });

app.set("view engine", "ejs");

app.get("/TOP", (req, res) => res.render("home"));
app.post("/TOP", upload.single("img"), (req, res) => {
    console.log(req.body, req.file);
    res.send("ok");
});

app.listen(21370, () => {
    console.log("Servidor ativo na porta: 21370");
});