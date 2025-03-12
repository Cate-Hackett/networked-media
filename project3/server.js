// import express
const { response } = require("express")
const express = require("express")

// initialize the express app
const app = express()

app.use(express.static('public'))
app.set("view engine","ejs")

// create first route (goes home)

app.get('/', (request, response)=>{
    response.render('home.ejs', {  page: "home", bgClass: "shelf-bg"  })
})

/////////////////////////////////////////////
// home page
/////////////////////////////////////////////
app.get('/home',(req,res)=>{
    
    res.render("home.ejs", {page: "home", bgClass: "shelf-bg" })
})
/////////////////////////////////////////////
// about page
/////////////////////////////////////////////

app.get('/about',(req,res)=>{
    
    res.render("about.ejs", {page: "about", bgClass: "about-bg" })
})
/////////////////////////////////////////////
// B&W phone page
/////////////////////////////////////////////
let tSend =[]

app.get('/b-w_phone',(req,res)=>{
    res.render("b-w_phone.ejs", {page: "b-w_phone", posts: tSend, bgClass: "product_page_bg" })
})

app.get('/send', (req,res)=>{
    tSend.push({
        post: req.query.message
    })
    res.redirect('/b-w_phone')
})

/////////////////////////////////////////////
// 3d mouse page
/////////////////////////////////////////////

let mouse_comments = [];

app.get('/3d-mouse',(req,res)=>{
    res.render("3d-mouse.ejs", {page: "3d-mouse", posts: mouse_comments, bgClass: "product_page_bg" })
})


app.get('/send_mouse', (req,res)=>{
    mouse_comments.push({
        post: req.query.message
    })
    res.redirect('/3d-mouse')
})


/////////////////////////////////////////////
// ai pin page
/////////////////////////////////////////////

let pin_comments = [];

app.get('/ai-pin',(req,res)=>{
    res.render("ai-pin.ejs", {page: "ai-pin", posts: pin_comments, bgClass: "product_page_bg" })
})


app.get('/send_ai-pin', (req,res)=>{
    pin_comments.push({
        post: req.query.message
    })
    res.redirect('/ai-pin')
})


/////////////////////////////////////////////
// rayban meta glasses page
/////////////////////////////////////////////

let glasses_comments = [];

app.get('/glasses',(req,res)=>{
    res.render("glasses.ejs", {page: "glasses", posts: glasses_comments, bgClass: "product_page_bg" })
})


app.get('/send_glasses', (req,res)=>{
    glasses_comments.push({
        post: req.query.message
    })
    res.redirect('/glasses')
})


/////////////////////////////////////////////
// trifold phone page
/////////////////////////////////////////////

let trifold_comments = [];

app.get('/trifold',(req,res)=>{
    res.render("trifold.ejs", {page: "trifold", posts: trifold_comments, bgClass: "product_page_bg" })
})


app.get('/send_trifold', (req,res)=>{
   trifold_comments.push({
        post: req.query.message
    })
    res.redirect('/trifold')
})



/////////////////////////////////////////////
// apple ai lamp page
/////////////////////////////////////////////

let lamp_comments = [];

app.get('/apple-lamp',(req,res)=>{
    res.render("apple-lamp.ejs", {page: "apple-lamp", posts: lamp_comments, bgClass: "product_page_bg" })
})


app.get('/send_lamp', (req,res)=>{

    lamp_comments.push({
        post: req.query.message
    })
    res.redirect('/apple-lamp')
})


app.listen(2222, ()=>{
    console.log('http://127.0.0.1:2222')
})
