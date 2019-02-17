/* eslint-disable no-undef */
import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import 'chai/register-should';

const { expect } = chai;
const should = chai.should();

const request = supertest.agent(app);

const signupRoute = '/api/v1/auth/signup';
const loginRoute = '/api/v1/auth/login';


/**
 * Signup user
 */
describe('Signup user end-point', () => {
  it('should return 201 if all input fields are validated correctly', (done) => {
    request.post(signupRoute)
      .send({
        firstname: 'jane',
        lastname: 'doe',
        email: 'jane_doe@gmail.com',
        password: 'asdfghj',
        confirmPassword: 'asdfghj'
      }).end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.message).to.eql('user created successfully');
        expect(res.body.token).to.be.a('string');
        expect(res.body.data).to.be.a('object');
        expect(res.body.status).to.be.a('string');
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an('object');
        if (err) { return done(err); }
        done();
      });
  });

  it('should return 400 if a user already exists', (done) => {
    request.post(signupRoute)
      .send({
        firstname: 'jane',
        lastname: 'doe',
        email: 'jane_doe@gmail.com',
        password: 'asdfghj',
        confirmPassword: 'asdfghj'
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('user already exists');
        expect(res.body.status).to.be.a('string');
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an('object');
        if (err) { return done(err); }
        done();
      });
  });

  it('should return 400 if password doesn\'t match', (done) => {
    request.post(signupRoute)
      .send({
        firstname: 'john',
        lastname: 'doe',
        email: 'john_doe@gmail.com',
        password: 'asdfgh',
        confirmPassword: 'asdfghj'
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('password doesn\'t match');
        expect(res.body.status).to.be.a('string');
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an('object');
        if (err) { return done(err); }
        done();
      });
  });

  it('should return 400 if a required input field is empty', (done) => {
    request.post(signupRoute)
      .send({
        firstname: '',
        lastname: 'doe',
        email: 'jane_doe@gmail.com',
        password: 'asdfghj',
        confirmPassword: 'asdfghj'
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('firstname field is required');
        expect(res.body.message).to.be.a('string');
        expect(res.body.status).to.be.a('string');
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an('object');
        if (err) { return done(err); }
        done();
      });
  });

  it('should return 400 if input is not a string', (done) => {
    request.post(signupRoute)
      .send({
        firstname: 'jane',
        lastname: 234569,
        email: 'jane_doe@gmail.com',
        password: 'asdfghj',
        confirmPassword: 'asdfghj'
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('lastname field should be a string');
        expect(res.body.message).to.be.a('string');
        expect(res.body.status).to.be.a('string');
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an('object');
        if (err) { return done(err); }
        done();
      });
  });
});

describe('Login user end-point', () => {
  it('should return 201 if all input fields are validated correctly', (done) => {
    request.post(loginRoute)
      .send({
        email: 'jane_doe@gmail.com',
        password: 'asdfghj'
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('user login successful');
        expect(res.body.token).to.be.a('string');
        expect(res.body.status).to.be.a('string');
        expect(res.body.status).to.eql('success');
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an('object');
        if (err) { return done(err); }
        done();
      });
  });
});
