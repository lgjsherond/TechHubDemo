import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';

export default function testSuite(){
    describe('Fetch the list',()=>{
        const response=http.get('https://test-api.k6.io/public/crocodiles/');

        expect(response.status,'response status').to.equal(200);
        expect(response).to.have.validJsonBody();
        expect(response.json().length,'number of crocs').to.be.above(4);
    })
}