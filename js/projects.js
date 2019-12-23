$(document).ready(function () {
    $("#text_line").hide();
    $("#calculation").hide();
    requestApiName();

    $('#recipe').on('change', function () {
        $("#text_line").show();
        $("#calculation").show();
        var recipes = $('#recipe').val();
        requestRecipes(recipes);
    });
    // click for incress number
    $("#add").on('click', function () {
        var calculater = $("#getNumber").val();
        incress(calculater);
    });
    //click for decress number 
    $("#previous").on('click', function () {
        var previous = $("#getNumber").val();
        decrement(previous);
    });

});

//incress number 
function incress(inNumber){
    var incressNumbers = parseInt(inNumber) + 1;
    if(incressNumbers <= 15){
        $("#getNumber").val(incressNumbers);  
        addNumber($("#getNumber").val());  
    }
}
//decress number
function decrement(deNumber){
    var decressNumbers = parseInt(deNumber) - 1;
    if(decressNumbers >= 1){
        $("#getNumber").val(decressNumbers);  
        addNumber($("#getNumber").val());  
    }
}
// calculating of ingredient
function addNumber(output){
    var quantities;
    var newQuantity;
    var getResult = "";
    getQuantity.ingredients.forEach(item => {
        quantities = item.quantity/oldGuests;
        newQuantity = quantities*output;
        getResult += `

            <tr>
            <td><img src="${item.iconUrl}" class="img-fluid" width="50"></td>
            <td id='quantity'>${newQuantity}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
            </tr>

        `;
        $("#ingredient").html(getResult);
    });
}

//get url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// choose recipe name
function requestApiName() {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("error"),
    });
}

var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `<option value="${element.id}">${element.name}</option>`;
    });
    $('#recipe').append(option);
}

//request api 
function requestRecipes(recipes) {
    allData.forEach(element => {
        if (element.id == recipes) {
            recipe(element.name, element.iconUrl);
            requestIngredient(element.ingredients);
            getInstruction(element.instructions);
            getIdToInput(element.nbGuests);

            getQuantity = element;
            oldGuests = element.nbGuests;
        }
    });

}
// request recipe name and image
function recipe(name, image) {
    var results = "";
    results += `   
        <img src="${image}" class="img-fluid float-right rounded-circle" width="60%" height="60%">
        <h3 class="float-right mr-3">${name}</h3>
    
    `;
    $('#result').html(results);
}

//get ingredients from api
function requestIngredient(ing) {
    var ingre = "";
    ing.forEach(element => {
        ingre += `
            <tr>
            <td><img src="${element.iconUrl}" class="img-fluid" width="50"></td>
            <td>${element.quantity}</td>
            <td>${element.unit[0]}</td>
            <td>${element.name}</td>
            </tr>
      `;
    });
    $('#ingredient').html(ingre);
    $('#text_ing').html("Ingredients");
}

//get instruction from api
function getInstruction(instroct) {
    var instruction = "";
    var int = instroct.split("<step>");
    for (var i = 1; i < int.length; i++) {
        instruction += `
        <h5 class="text-primary">Step:${i}</h5>
        <p>${int[i]}</p>
        `;
        $('#step').html(instruction);
    }
    $('#inst').html("instructions");
}

// get nbGuests from api to input
function getIdToInput(id) {
    var guests = "";
    guests += `
        <input type="number" id="getNumber" class="form-control text-center" disabled value="${id}">
        `;
    $('#number').html(guests);
}
