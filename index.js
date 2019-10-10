const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: "rakhi"},
    {id: 2, name: "rakhi soni"},
    {id: 3, name: "rakhi gopal sangeeta"}
];
app.get('/', (req, res) => {
    res.send('hello world!!!');

});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {
        res.status(404).send('no data found for such id');
        return;
    } 
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const {error} = validate(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    } 
    const course = {
        id : courses.length +1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
})


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {
        res.status(404).send('no data found for such id');
        return;
    } 
    const {error} = validate(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    } 
    // update the course
    course.name = req.body.name;
    res.send(course); 
})

function validate(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);  
}

app.delete('/api/courses/:id', (req,res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {
        res.status(404).send('no data found for such id');
        return;
    } 

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
}) 
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening at port ${port}`))