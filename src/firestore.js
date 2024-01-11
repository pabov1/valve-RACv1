require('dotenv').config();
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

import { getFirestore, query, where, collection, getDocs, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIRESTORE_AKEY,
    authDomain: process.env.FIRESTORE_ADOMAIN,
    projectId: process.env.FIRESTORE_PROJECTID,
    storageBucket: process.env.FIRESTORE_SBUCKET,
    messagingSenderId: process.env.FIRESTORE_MSID,
    appId: process.env.FIRESTORE_APPID,
    measurementId: process.env.FIRESTIRE_MEASUREID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
console.log(db);

const q = query(collection(db, "sensorMeasurements"), where("userId", "==", 1));

// const querySnapshot = await getDocs(q);
var flag1 = false;
var lastDate;
var currentData;
var currentDate;
var graphData = [['Year', 'Consumption'], ['0', 0]];

const unsub = onSnapshot(q, (querySnapshot) => {
    console.log('Hay cambios!')
    var div = document.getElementById('measurements');
    div.innerHTML = '';
    var divDate = document.getElementById('dates');
    divDate.innerHTML = '';
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        currentDate = doc.data().dateTime.seconds;

        if (flag1 == false) {
            lastDate = currentDate;
            currentData = doc.data().value;
            flag1 = true;
        }
        else if (currentDate > lastDate) {
            currentData = doc.data().value;
            lastDate = currentDate;
        }

    });

    var dateFormat = new Date(lastDate * 1000).toLocaleString();
    flag1 = false
    div.innerHTML += currentData;
    divDate.innerHTML += dateFormat;
    console.log(div);

});

var ref = doc(db, "paymentCheck", "Valve_1")

async function updatePayment(e) {

    var UserOption = e.options[e.selectedIndex].textContent;
    console.log(UserOption);
    // //
    var paymentValue = true;
    if (UserOption == "Paid") {
        paymentValue = true;
    }
    else if (UserOption == "Not Payed") {
        paymentValue = false;
    }

    await updateDoc(ref, {
        payment: paymentValue
    });
}

document.querySelector('#ddlViewBy').addEventListener("change", function () {
    updatePayment(this);

});