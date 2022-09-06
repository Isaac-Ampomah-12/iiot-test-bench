const chai = require('chai');
const chaiHttp = require('chai-http');
// const { options } = require('../server');
const assert = chai.assert;

const app = require('../server');
chai.use(chaiHttp);

describe('Configure and test', () => {
    //     // describe('Connection to Broker', () => {
        it('connection to broker', (done) => {
            var clusterInfo = {
                "host": "f6a5b7010eb4472aa8657f1931c2f8f7.s1.eu.hivemq.cloud",
                "port": 8883,
                "protocol": "mqtts",
                "username": "Isaac Ampomah",
                "password": "1password@most",
                // "keepalive": 90,
                "reconnectPeriod": 0,
                "clientId": 'mqttjs_df807ed6',
                "clean": false,
            }
    
    
            var expected = true;
    
            chai
                .request(app)
                .post('/broker/connect')
                .send(clusterInfo)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((err,res) => {
                    assert.equal(res.body.connectionStatus, expected);
                    done();
                })
        });
    
});