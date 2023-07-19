const axios = require('axios');
axios.post('http://localhost:8181/invoice/send_invoice', {init_params:{client_id:'aa',private_key:'11'},invoice:{
    header:{},body:[],payments:[]
}})
    .then(response => {
        console.log(response.data);

    })
    .catch(error => {
        //  console.log(error)
    })
    .finally(() => {

    });