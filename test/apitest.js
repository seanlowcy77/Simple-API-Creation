let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);
let server = require("../index");

describe("Courses", () => {
    describe("/GET courses", () => {
        it("it should GET the homepage", done => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(
                        res.text,
                        "Hello! This is the home page!\nAdd /api/courses above to view all the courses",
                        "The homepage text is different from what is expected"
                    );
                    done();
                });
        });
        it("it should GET all the courses", done => {
            chai.request(server)
                .get("/api/courses")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("it should GET a specific course", done => {
            chai.request(server)
                .get("/api/courses/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(
                        res.text,
                        '{"id":1,"name":"CS1010S"}',
                        "The first course received does not match the sample course"
                    );
                    done();
                });
        });
        it("it should not GET a course if it doesnt exist", done => {
            chai.request(server)
                .get("/api/courses/10")
                .end((err, res) => {
                    res.should.have.status(404);
                    assert.equal(
                        res.text,
                        "The course with the given id was not found",
                        "The course should not exist inside the list"
                    );
                    done();
                });
        });
    });
    describe("/POST a new course", () => {
        it("it should POST a new course", done => {
            const course = {
                id: 4,
                name: "CS4222"
            };
            chai.request(server)
                .post("/api/courses")
                .send(course)
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(
                        res.text,
                        '{"id":4,"name":"CS4222"}',
                        "The course added does not match the course added from the POST request"
                    );
                    done();
                });
        });
        it("it should not POST a course with an invalid body", done => {
            const course = {
                id: 4,
                name: "CS"
            };
            chai.request(server)
                .post("/api/courses")
                .send(course)
                .end((err, res) => {
                    res.should.have.status(400);
                    assert.equal(
                        res.text,
                        '"name" length must be at least 6 characters long',
                        "The course is able to be added despite not passing the validation of requirements set using Joi"
                    );
                    done();
                });
        });
    });

    describe("/PUT update a course", () => {
        it("it should PUT a course that exists", done => {
            const body = {
                name: "new_module"
            };
            chai.request(server)
                .put("/api/courses/1")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(
                        res.text,
                        '{"id":1,"name":"new_module"}',
                        "The course updated does not match the course updated from the PUT request"
                    );
                    done();
                });
        });
        it("it should not PUT a course with an invalid body", done => {
            const body = {
                name: "cs"
            };
            chai.request(server)
                .put("/api/courses/1")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    assert.equal(
                        res.text,
                        '"name" length must be at least 6 characters long',
                        "The course is able to be added despite not passing the validation of requirements set using Joi"
                    );
                    done();
                });
        });

        it("it should not PUT a course if it doesnt exist", done => {
            const body = {
                name: "new_module"
            };
            chai.request(server)
                .put("/api/courses/10")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(404);
                    assert.equal(
                        res.text,
                        "The course with the given id was not found",
                        "Since the index (10) far exceeds the length of the list a 404 should be returned instead since the course does not exist"
                    );
                    done();
                });
        });
    });

    describe("/DELETE a course", () => {
        it("it should DELETE a course if it exists", done => {
            chai.request(server)
                .delete("/api/courses/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(
                        res.text,
                        '{"id":1,"name":"new_module"}',
                        "The course from index 1 should be deleted"
                    );
                    done();
                });
        });

        it("it should not DELETE a course if it does not exist", done => {
            chai.request(server)
                .delete("/api/courses/10")
                .end((err, res) => {
                    res.should.have.status(404);
                    assert.equal(
                        res.text,
                        "The course with the given id was not found",
                        "No course should be deleted since the course at index 10 does not exist"
                    );
                    done();
                });
        });
    });
});
