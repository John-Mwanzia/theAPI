
import supertest from 'supertest';
import app from '../server';

describe('GET /', () => {
    it('should return some data', async () => {
        const res = await supertest(app).get('/');
        expect(res.body.message).toBe('Hello from server');
    });
}
);
