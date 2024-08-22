// Cmd to run code: node index.js
// Now open browser > localhost:3000

// Run cmd to easy: 
// sudo npm i -g nodemon | pwd
// Nodemon index.js


const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //middleware

const courses = [
    { id:1, name:'Course1' },
    { id:2, name:'Course2' },
    { id:3, name:'Course3' }
]

//Just get message: http://localhost:3000
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

//Just get numbers: http://localhost:3000/api/num
app.get('/api/num', (req, res) => {
    res.send([1, 2, 3]);
})

//Get all courses: http://localhost:3000/api/courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
})

//Get all courses based on id:http://localhost:3000/api/courses/1
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
})

//Add courses: http://localhost:3000/api/courses
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

 //Update courses: http://localhost:3000/api/courses/id
 app.put('/api/courses/:id', (req, res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given Id was not found!');

    const { error } = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    course.name = req.body.name;
    res.send(course);
 });

 //Delete courses: http://localhost:3000/api/courses
app.delete('/api/courses/:id', (req, res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given Id was not found!')

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
 });


//Get courses based on id with error statusMsg:http://localhost:3000/api/courses/1
app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given ID was not found!');
   res.send(course);
})


//Get year & month - http://localhost:5000/api/posts/2024/8
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))