
// HTML variables

let title = document.getElementById("title")
let Price = document.getElementById("Price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById("create")
let tableData = document.querySelector(".tableData")
let deleteAll = document.getElementById("deleteAll")
let Search = document.getElementById("Search")
let alertCard = document.getElementById("alertCard")
let warning = document.getElementById("warning")
let overlay = document.querySelector(".overlay")
let alertMessage = document.querySelector(".alertMessage")
let clear = document.querySelector(".clear")




let mood = "create";

let searchMood = "title"

let myData;

let tmp;

if (localStorage.products != null) {

    myData = JSON.parse(localStorage.products)
} else {
    myData = [];
}



// Functions

function getTotal() {
    if (Price.value != '') {
        let result = (Number(Price.value) + Number(taxes.value) + Number(ads.value) - Number(discount.value))
        total.innerHTML = result
        total.style.background = '#040'
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }


}


// clear inputs

function clearInputs() {

    title.value = '';
    Price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';

}

// displayData

function displayData() {

    getTotal()

    let cartona = '';
    for (let i = 0; i < myData.length; i++) {

        cartona += `
        <tr class="table-dark">
        <td>${i + 1}</td>
        <td> ${myData[i].title}</td >
        <td> ${myData[i].Price} </td>
        <td> ${myData[i].taxes}</td>
        <td> ${myData[i].ads} </td>
        <td> ${myData[i].discount} </td>
        <td> ${myData[i].total} </td>
        <td> ${myData[i].category} </td>
        <td> <button onclick=" updateData(${i})" class="btn btn-success"> update </button> </td>
        <td> <button onclick="deleteData(${i})" class="btn btn-danger"> delete </button> </td>
    </tr >
        `
    }
    document.getElementById("deleteCount").innerHTML = `  Deleta All ( ${myData.length} ) `;
    tableData.innerHTML = cartona

    if (myData.length > 0) {
        deleteAll.classList.remove("d-none")
    } else {
        deleteAll.classList.add("d-none");
    }


}

// delete data 
function deleteData(i) {

    myData.splice(i, 1);

    localStorage.products = JSON.stringify(myData);
    displayData();

}

// update Data
function updateData(i) {

    title.value = myData[i].title;
    Price.value = myData[i].Price;
    taxes.value = myData[i].taxes;
    ads.value = myData[i].ads;
    discount.value = myData[i].discount;
    getTotal();

    count.classList.add("d-none")
    category.value = myData[i].category;
    create.innerHTML = "Update"
    mood = "update"
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// Search 

function getSearchMood(id) {

    if (id === 'searchTitle') {

        searchMood = 'title'
        Search.placeholder = 'Search By Title'

    } else {
        searchMood = 'category'
        Search.placeholder = 'Search By Category'
    }
    Search.focus()
    Search.value = '';
    displayData()
}


function searchData(value) {

    let cartona = '';

    if (searchMood == 'title') {

        for (let i = 0; i < myData.length; i++) {

            if (myData[i].title.includes(value.toLowerCase())) {

                cartona += `
                    <tr class="table-dark">
                    <td>${i + 1}</td>
                    <td> ${myData[i].title}</td >
                    <td> ${myData[i].Price} </td>
                    <td> ${myData[i].taxes}</td>
                    <td> ${myData[i].ads} </td>
                    <td> ${myData[i].discount} </td>
                    <td> ${myData[i].total} </td>
                    <td> ${myData[i].category} </td>
                    <td> <button onclick=" updateData(${i})" class="btn btn-success"> update </button> </td>
                    <td> <button onclick="deleteData(${i})" class="btn btn-danger"> delete </button> </td>
                </tr >
                    `
            }

        }


    } else {

        for (let i = 0; i < myData.length; i++) {
            if (myData[i].category.includes(value.toLowerCase())) {
                cartona += `
                    <tr class="table-dark">
                    <td>${i + 1}</td>
                    <td> ${myData[i].title}</td >
                    <td> ${myData[i].Price} </td>
                    <td> ${myData[i].taxes}</td>
                    <td> ${myData[i].ads} </td>
                    <td> ${myData[i].discount} </td>
                    <td> ${myData[i].total} </td>
                    <td> ${myData[i].category} </td>
                    <td> <button onclick=" updateData(${i})" class="btn btn-success"> update </button> </td>
                    <td> <button onclick="deleteData(${i})" class="btn btn-danger"> delete </button> </td>
                </tr >
                    `


            }

        }

    }

    tableData.innerHTML = cartona

}


function alert(alert) {


    if (alert == "yes") {
        localStorage.clear()
        myData.splice(0)
        displayData();
        alertCard.classList.add("d-none")
        overlay.classList.add("d-none")
    } else {

        alertCard.classList.add("d-none")
        overlay.classList.add("d-none")
    }

}

//  events
create.addEventListener("click", function () {
    let data = {
        title: title.value.toLowerCase(),
        Price: Price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value.toLowerCase(),
    }



    if (
        title.value != '' &&
        Price.value != '' &&
        count.value < 101) {

        if (mood === "create") {

            if (data.count > 1) {
                for (let i = 0; i < data.count; i++) {
                    myData.push(data)
                }
            } else {

                myData.push(data);
            }
        }
        else {
            myData[tmp] = data
            mood = "create"
            create.innerHTML = "Create"
            count.classList.remove("d-none")
        }

        warning.classList.add("d-none")
    }
    else {
        warning.classList.remove("d-none")
    }


    localStorage.setItem("products", JSON.stringify(myData))
    clearInputs();
    displayData();
})


deleteAll.addEventListener("click", function () {

    alertCard.classList.remove("d-none")
    overlay.classList.remove("d-none")

})



Search.addEventListener("keyup", function () {

    value = Search.value;
    searchData(value)

});

clear.addEventListener('keyup', function () {

    warning.classList.add("d-none")
});


displayData();
