import request from 'supertest';
import app from '../src/app';

it('fails when an email that doesnt exist is supplied', async ()=>{
    return request(app)
            .post('/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400);
});

it('fails when an incorrect password is supplied', async ()=>{
    // signup
    const response = await request(app)
        .post('/auth/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
    // signin
    const response2=await request(app)
            .post('/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'wrongpass'
            })
            .expect(400);
});

it('response with a cookie when given valid credentials', async ()=>{
    // signup
    await request(app)
        .post('/auth/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    // signin
    let response=await request(app)
            .post('/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});

it('clears the cookie after signing out', async ()=>{
    await request(app)
            .post('/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);
    
    const response=await request(app)
                    .post('/auth/signout')
                    .send({})
                    .expect(200)
    
    expect(response.get('Set-Cookie')![0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});

it('returns a 201 on successful signup', async ()=>{
    return request(app)
            .post('/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)
})

it('returns a 400 on invalid email', async ()=>{
    return request(app)
            .post('/auth/signup')
            .send({
                email: 'gfegigfwif',
                password: 'password'
            })
            .expect(400)
})

it('returns a 400 on invalid password', async ()=>{
    return request(app)
            .post('/auth/signup')
            .send({
                email: 'test@testc.com',
                password: 'p'
            })
            .expect(400)
})

it('returns a 400 with missing email and password', async ()=>{
    await request(app)
            .post('/auth/signup')
            .send({
                email: 'test@test.com'
            })
            .expect(400)
    
    await request(app)
        .post('/auth/signup')
        .send({
            password: 'password'
        })
        .expect(400)
})

it('disallow duplicate emails', async ()=>{
    await request(app)
        .post('/auth/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/auth/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
});

it('sets a cookie aftersuccessful signup', async ()=>{
    const response=await request(app)
            .post('/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
    expect(response.get('Set-Cookie')).toBeDefined();
});
