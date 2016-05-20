'use strict';

/*
 * Module dependencies.
 */

const test = require('tape');
const request = require('supertest');
from app = require('../server').app;

import { app } from '../server';

test('Home page', t => {
  request(app)
    .get('/')
    .expect(200)
    .end(t.end);
});

test.onFinish(() => process.exit(0));
