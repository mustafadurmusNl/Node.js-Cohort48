const request = require('supertest');
const app = require('./app');
const fs = require('fs');

describe('POST /blogs', () => {
  it('should respond with 201 status code', async () => {
    //arrange and act
    const response = await request(app)
      .post('/blogs')
      .send({
        title: 'My first post',
        content: 'This is my first post'
      });
      //assert
    expect(response.statusCode).toBe(201);
    


  //clean up
  await request(app).delete('/blogs/My first post');
});
  describe('given only content ', () => {
    it('should respond with 400 status code', async () => {
      //arrange and act
      const response = await request(app)
        .post('/blogs')
        .send({
          content: 'This is my first post'
        });
        //assert
      expect(response.statusCode).toBe(400);
    });
  })
  describe('unhappy scenario', () => {   //another better way of above structure
    it('should respond with 400 status code when the content is missing', async () => {
      await request(app)
        .post('/blogs')
        .send({
          title: 'title'
        })
        .expect(400);
    });
  });
  describe("given existing post", () => {
    it('should respond with 409 status code', async () => {
     await request(app)
        .post('/blogs')
        .send({
          title: 'title',
          content: 'random content'
        });
await request(app)
        .post('/blogs')
        .send({
          title: 'title',
          content: 'random content'
        })
        .expect(409);
    });
  });
describe("given internal error", () => {
    it('should respond with 500 status code', async () => {
     jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
        throw new Error('Mocked error');
      });
      await request(app)
        .post('/blogs')
        .send({
          title: 'title',
          content: 'random content'
        })
        .expect(500);
    });
  });
});
