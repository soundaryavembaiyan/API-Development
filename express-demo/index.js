
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //middleware

const courses = [
    { id:1, name:'Course1' },
    { id:2, name:'Course2' },
    { id:3, name:'Course3' }
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});


// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);
// })

//Return all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
})


//POST courses based on id
app.post('/api/courses', (req, res) => {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    // const result = Joi.Validate(req.body, schema);
    // if(result.error){
    //     //400 Bad Request
    //     res.status(400).send(result.error.details[0].message)
    //     return;
    // }

    const course =  { 
        id: courses.length + 1, 
        name:req.body.name 
    };
    courses.push(course);
    res.send(course);
 });





//Get all courses based on id
app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given ID was not found!');
   res.send(course);
})

//Get courses based on id
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
})

//Get year & month - http://localhost:5000/api/posts/2024/8
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))