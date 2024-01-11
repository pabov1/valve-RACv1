require('dotenv').config();

class UbidotsAPI {
    constructor(dispositivoId, variableId, token) {
        this.dispositivoId = dispositivoId;
        this.variableId = variableId;
        this.token = token;
        //this.url = `https://industrial.api.ubidots.com/api/v1.6/devices/${dispositivoId}/${variableId}/values/?token=${token}&limit=1&order_by=created_at&aggregation_type=none`;
        this.url = `https://industrial.api.ubidots.com/api/v2.0/devices/${dispositivoId}/variables/${variableId}/?token=${token}`;
    }

    /* obtenerValorVariable() {
       fetch(this.url)
               .then(response => response.json())
               .then(data => {
                 const valor = data.value;
                 document.getElementById("valorVariable").textContent = valor;
               })
               .catch(error => {
                 console.log(error);
               });
     }*/

    obtenerValorVariable() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const valor = data.lastValue.value;
                var divValor = document.getElementById('valorVariable');
                divValor.innerHTML = '';
                divValor.innerHTML += valor;
                var dateFormat = new Date(data.lastValue.timestamp).toLocaleString();
                var divDate = document.getElementById('dates2');
                divDate.innerHTML = '';
                divDate.innerHTML += dateFormat;
                //document.getElementById("valorVariable").textContent = valor;
            } else {
                console.log('Error:', xhr.status);
            }
        };
        xhr.onerror = function () {
            console.log('Error de conexión');
        };
        xhr.send();
    }

    iniciarActualizacion() {
        this.obtenerValorVariable();
        setInterval(() => {
            this.obtenerValorVariable();
        }, 5000);
    }


}

// Crear una instancia de la clase UbidotsAPI
const ubidotsAPI = new UbidotsAPI(  process.env.UBIDOTS_DEVICE_ID, process.env.UBIDOTS_VARIABLE_ID, process.env.UBIDOTS_AKEY);
ubidotsAPI.iniciarActualizacion();
// Iniciar la actualización del valor de la variable
//ubidotsAPI.iniciarActualizacion();

var url2 = `https://industrial.api.ubidots.com/api/v1.6/variables/646ed7466a418846878e6d66/values`;

async function updatePayment2(e) {

    var UserOption = e.options[e.selectedIndex].textContent;
    console.log(UserOption);
    // //
    var paymentValue = 1;
    if (UserOption == "Paid") {
        paymentValue = 1;
    }
    else if (UserOption == "Not Payed") {
        paymentValue = 0;
    }

    const xhr = new XMLHttpRequest();
    const nuevoValorObj = {
        value: paymentValue
    };
    xhr.open('POST', url2, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', process.env.UBIDOTS_AKEY);
    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log('Valor cambiado exitosamente');
        } else {
            console.log('Error:', xhr.status);
        }
    };
    xhr.onerror = function () {
        console.log('Error de conexión');
    };
    xhr.send(JSON.stringify(nuevoValorObj));

}

document.querySelector('#ddlViewBy2').addEventListener("change", function () {
    updatePayment2(this);

});