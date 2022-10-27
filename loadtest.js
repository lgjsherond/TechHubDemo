import { check } from 'k6';
import http from 'k6/http';

export const options={
    // duration:'30s',
    // vus:2,
    stages:[
        {duration:'30s',target:2},
        {duration:'30s',target:2},
        {duration:'30s',target:0}
    ]
}

export default function(){
    let response=http.get('https://www.wiley.com/en-sg');
    check(response,{"Valid response":(r)=>r.body.includes('COVID-19')});
}