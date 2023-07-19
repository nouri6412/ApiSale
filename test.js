const axios = require('axios');
axios.post('http://localhost:8181/invoice/send_invoice', {init_params:{client_id:'aa',private_key:'11'},invoice:{
    header:{
        bb:'b_h',
        aa:'',
        za:'z_h'
    },body:[
        {
            cc:'c_b',
            aa:null,
            za:'z_b'
        },
        {
            cc:'c1_b',
            aa:'',
            za:'z1_b'
        }
    ],payments:[]
}})
    .then(response => {
        console.log(response.data);

    })
    .catch(error => {
        //  console.log(error)
    })
    .finally(() => {

    });