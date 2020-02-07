'use strict';

process.env.STORAGE = 'mongo';

const jwt = require('jsonwebtoken');

const  server  = require('../lib/server').server;
console.log('server : ', server);

const supergoose = require('../supergoose.js');

const mockRequest = supergoose.server(server);

 
 let user= {username: 'obadaq', password: '123456'}


beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {

      let id;

      it('can create one user', () => {
        return mockRequest.post('/signup')
          .send(user)
          .then(response => {
            //   console.log('response.text : ', response.text);
            var token = jwt.verify(response.text, process.env.SECRET || 'secretobada');
            console.log('token : ', token);
            id=token.iat
            expect(token.iat).toBeDefined();
            expect(token.username).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(user.username, user.password)
          .then(response => {
            console.log('response.text : ', response.text);
            expect(response.status).toEqual(200);
            
            // var token = jwt.verify(response.text, process.env.SECRET || 'secretobada');
            // console.log('id : ', id);
            // expect(token.iat).toEqual(id);
            // expect(token.username).toBeDefined();
          });
      });
      
  

});