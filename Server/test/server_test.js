// import libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
var should = chai.should();
const assert = chai.assert;

// import server.js
const app = require('../server');

// set chai to use chaiHttp
chai.use(chaiHttp);

describe('Configure and test', () => {
    it('connection to broker', (done) => {
        options = {
            "host": "f6a5b7010eb4472aa8657f1931c2f8f7.s1.eu.hivemq.cloud",
            "port": 8883,
            "protocol": "mqtts",
            "username": "Isaac Ampomah",
            "password": "1password@most",
            "reconnectPeriod": 0
        }

        var expected = true;

        chai
            .request(app)
            .post('/broker/connect')
            .send(options)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err,res) => {
                res.should.have.status(200);
                assert.equal(res.body.connectionStatus, expected);
                done();
            })
    });

    it('connection to Publisher and Subcriber', (done) => {
        publishValues = {
            "publishTopic": "home",
            "publishMessage": "sweet home"
        }

        var expected = true;

        chai
            .request(app)
            .post('/test/subpub')
            .send(publishValues)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err,res) => {
                res.should.have.status(200);
                assert.isNotNull(res.body.received);
                done();
            })
    });
    
});

describe('Set', () => {
    describe('number of subscribers that will subscribe to a topic', () => {
        describe('topic level all subscribers should subscribe to', () => {
            describe('interval at which messages are published', () => {
                describe('number of publishers that will publish messages to the broker.', () => {
                    describe('topic level all publishers should publish messages to', () => {
                        describe('configure the size of the message sent by publishers', () => {
                            it('publish and subscribe', (done) => {

                                let userInput = {
                                    "numberOfPublishers": 5,
                                    "publishTopicLevel": 4,
                                    "publishInterval": 10,
                                    "numberOfSubscribers": 10,
                                    "subscriptionTopicLevel": 4,
                                    "messageSize": 10
                                }

                                chai
                                .request(app)
                                .post('/pubsub')
                                .send(userInput)
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
                                .end((err,res) => {
                                    res.should.have.status(200);
                                    assert.isNotNull(res.body.result);
                                    done();
                                });
                            })
                        });
                    });
                });            
            });
        });
    });
});
