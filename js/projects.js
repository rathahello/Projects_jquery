$(document).ready(function () {
    $('#chooseRecipe').on('change', function(){
        var avocado = $('#chooseRecipe').val();
        choose(avocado);
    });
    $('#chooseRecipe').on('change', function(){
        var creps = $('#chooseRecipe').val();
        choose(creps);
    });
});
function choose(foods){
    switch(parseInt(foods)){
        case 1:
            requestCreps(); 
            requestApi();
            break;
        case 2:
            requestAvocado();
            requestApi();
            break;
    }
}

//request api Toek Kalok
function requestAvocado(){
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: function(data){
            var results = "";
            data.recipes.forEach(element => {
                if(element.id == 0){
                    results += `    
                    <div class="col-lg-6 " id="avocado">
                        <img src="${element.iconUrl}" class="img-fluid float-right" width="80">
                        <h3 class="float-right">${element.name}</h3>
                    </div>
                    `;
                }
            });
            $('#result').html(results);
        },
    
    });
}
// request api creps
var requestCreps = () => {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: function(data){
            var results = "";
            data.recipes.forEach(element => {
                if(element.id == 1){
                    results += `    
                    <div class="col-lg-6 " id="avocado">
                        <img src="${element.iconUrl}" class="img-fluid float-right" width="80">
                        <h3 class="float-right">${element.name}</h3>
                    </div>
                    `;
                }
            });
            $('#result').html(results);
        },
    
    });
}
//get url
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
//request api of ingredients
var requestApi = () => {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success:  function(myData){
            myData.recipes.forEach(element => {
                if(element.id == 0){
                    getIngredient(element.ingredients);
                }
        });
    }
        
    });
}

var getIngredient = (ing) => {
    ing.forEach(item => {
        computeHTML(item);
    });
}
//compute to html 
function computeHTML(display){
    var compute = "";
    compute +=`
        <tr >

        <td><img src="${display.iconUrl}" class="img-fluid" width="50"></td>
        <td>${display.name}</td>
        <td>${display.quantity}</td>
        <td>${display.unit}</td>

        </tr>
    `;
    printOut(compute);
}
// print out

printOut = (out) => {
    $("#ingredient").append(out);
}