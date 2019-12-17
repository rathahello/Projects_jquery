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

    $("#add").on('click', function(){
        var calculater = $("#add").val();
        // add(calculater);
    });

});

//get url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

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
            calculate(element.nbGuests);
            // add(element.id);
        }
    });

}

function recipe(name, image) {
    var results = "";
    results += `   
    <div class="container">
        <div class="col-8 " id="avocado">
        <img src="${image}" class="img-fluid float-right" width="150">
        <h3 class="float-right mr-3">${name}</h3>
        </div>
    </div> 
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

// get id from api to input
function calculate(id) {
    var calculator = "";
    calculator += `
        <input type="number" class="form-control text-center" id="number" disabled value="${id}">
        `;
    $('#number').html(calculator);
}

// function add(incress){
//     var incressNumber = parseInt(incress)+ 1;
//     console.log(incressNumber);
//     // allData.forEach(element => {
//     //     console.log(element.incressNumber);

//     // })
//     // if(incressNumber<=15 && incressNumber > 0){
//         // $("#number").val(incressNumber);
       
//     // }
// }