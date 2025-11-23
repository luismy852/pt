import express from 'express';
import supertest from 'supertest';

export default function testServer(router) {
    const app = express();
    app.use(express.json());

    app.use(router);

    return supertest(app);
}
