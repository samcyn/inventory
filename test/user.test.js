'use strict';

let app = require('../app'),
    expect = require('chai').expect,
    request = require('supertest');
global._pathfinder = require('../config/path_finder');
let permissions = require(_pathfinder.join(_pathfinder.config, 'permission'));

describe('User API endpoints integeration Tests', function() {

    let user = {
        'user': {
            'username': 'test-name',
            'password': 'password1234',
            'email': 'dent4reanlop@gmail.com',
            'role': '5b4fafca821cf474ccf0a221',
            'phone_number': '08148086013',
            'permissions': [permissions.GLOBAL_USER]
        }
    };

    let login = {
        'user': {
            'email': 'dent4real@yahoo.com',
            'password': 'superduperpassword1234',
        }
    };

    let token = "";

    let update = {
        'user': {
            'username': 'recent-name'
        }
    };

    describe('#POST / user/login', function () {
        it('should log a user in', function (done) {
            request(app).post('/apis/v1/user/login').send(login)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.payload).to.be.an('object');
                    expect(res.body.responseCode).to.equal(1);
                    expect(res.body.responseText).to.equal('ok');
                    token = 'Bearer ' + res.body.payload.token;
                    console.log(token);
                    done();
                })
        })
    });

    describe('#GET / user', function () {
        it('should get all users', function (done) {
            request(app).get('/apis/v1/user')
                .set('Authorization', token)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.responseCode).to.equal(1);
                    expect(res.body.responseText).to.equal('ok');
                    done();
                })
        })
    });

    describe('#POST / user', function () {
        it('should get all users', function (done) {
            request(app).post('/apis/v1/user').send(user)
                .set('Authorization', token)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.payload).to.be.an('object');
                    expect(res.body.payload.permissions).to.be.an('array');
                    expect(res.body.responseCode).to.equal(1);
                    expect(res.body.responseText).to.equal('ok');
                    user.user = res.body.payload;
                    done();
                })
        })
    });

    describe('#GET / user', function () {
        it('should get all users', function (done) {
            request(app).get('/apis/v1/user/' + user.user._id)
                .set('Authorization', token)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.payload).to.be.an('object');
                    expect(res.body.payload.role).to.be.an('object');
                    expect(res.body.responseCode).to.equal(1);
                    expect(res.body.payload.username).to.equal('test-name');
                    user.user.username = "changed name";
                    done();
                })
        })
    });

    describe('#PUT / user', function () {
        it('should get all users', function (done) {
            request(app).put('/apis/v1/user/' + user.user._id).send(update)
                .set('Authorization', token)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.payload).to.be.an('object');
                    expect(res.body.responseCode).to.equal(1);
                    expect(res.body.responseText).to.equal('ok');
                    done();
                })
        })
    });

    describe('#DELETE / user', function () {
        it('should get all users', function (done) {
            request(app).delete('/apis/v1/user/' + user.user._id)
                .set('Authorization', token)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.payload).to.be.an('object');
                    expect(res.body.responseCode).to.equal(1);
                    done();
                })
        })
    })
});