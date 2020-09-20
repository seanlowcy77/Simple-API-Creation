const Joi = require("joi");
const express = require("express");
const app = express();

// Adding a piece of middleware to use the parse json
app.use(express.json());

const courses = [
    { id: 1, name: "CS1010S" },
    { id: 2, name: "CS2103" },
    { id: 3, name: "CS3219" }
];

app.get("/", (req, res) => {
    res.send("Hello! This is the home page!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

// GET Request from Express (req,res) is the route handler
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res
            .status(404)
            .send("The course with the given id was not found");

    res.send(course);
});

// POST Request: Create a new course
app.post("/api/courses", (req, res) => {
    // Must always validate input from client
    const result = validateCourse(req.body);
    if (result.error) {
        // 400 Bad Request to inform client about error
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // Need to add json thing above cause we need to parse body which is in json
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    // Sends it to the user
    res.send(course);
});

// PUT Request to update
app.put("/api/courses/:id", (req, res) => {
    // If course doesnt exist 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("The course with the given id was not found");
        return;
    }

    // If invalid produce 400 error
    const result = validateCourse(req.body);
    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update course name
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
});

// DELETE Request
app.delete("/api/courses/:id", (req, res) => {
    // if the course does not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("The course with the given id was not found");
        return;
    }

    // find the index of the course
    const index = courses.indexOf(course);
    // Delete the course from that position
    courses.splice(index, 1);
    res.send(course);
});

// Validate the course name using Joi - ensure
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required()
    });

    return schema.validate({ name: course.name });
}

// Setting up PORT
const port = process.env.PORT || 3000;

// Open the server to start listening for requests
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

// Testing the sending of query:
// E.g. http://localhost:3000/api/courses/2018/1?sortBy=name
app.get("/api/courses/:year/:month", (req, res) => {
    res.send(req.query);
});
