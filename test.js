

const axios = require('axios');


axios.post('http://localhost:8182/helper/get_token', {
    client_id: 'A14P7E'
})
    .then(response => {

        console.log(response.data);

    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => {

    });