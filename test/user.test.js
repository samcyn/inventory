'use strict';

var app = require('../app'),
    expect = require('chai').expect,
    request = require('supertest');
    global._pathfinder = require('../config/path_finder');
    var permissions = require(_pathfinder.join(_pathfinder.config, 'permission'));
describe('User API endpoints integeration Tests', function(){
    var user = {
        'user': {
            'username': 'test-name',
            'password': 'password1234',
            'email': 'dent4real@gmail.com',
            'role':  '5b4fafca821cf474ccf0a221',
            'phone_number': '08146788113',
            'permissions': [permissions.GLOBAL_USER]
        }
    };
    var update = {
        'user':{
            'username': 'recent-name'
        }
    }
    describe('#GET / user', function(){
        it('should get all users', function(done){
            request(app).get('/apis/v1/user')
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.payload).to.be.an('array');
                expect(res.body.responseCode).to.equal(1);
                expect(res.body.responseText).to.equal('ok');
                done();
            })
        })
    })
    describe('#POST / user', function(){
        it('should get all users', function(done){
            request(app).post('/apis/v1/user').send(user)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.payload).to.be.an('object');
                expect(res.body.payload.permissions).to.be.an('array');
                expect(res.body.responseCode).to.equal(1);
                expect(res.body.responseText).to.equal('ok');
                user.user = res.body.payload
                done();
            })
        })
    })
    describe('#GET / user', function(){
        it('should get all users', function(done){
            request(app).get('/apis/v1/user/' + user.user._id)
            .end(function(err, res){
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
    })
    describe('#PUT / user', function(){
        it('should get all users', function(done){
            request(app).put('/apis/v1/user/' + user.user._id).send(update)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.payload).to.be.an('object');
                expect(res.body.responseCode).to.equal(1);
                expect(res.body.responseText).to.equal('ok');
                done();
            })
        })
        describe('#DELETE / user', function(){
            it('should get all users', function(done){
                request(app).delete('/apis/v1/user/' + user.user._id)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.payload).to.be.an('object');
                    expect(res.body.responseCode).to.equal(1);
                    done();
                })
            })
        })
    })
})