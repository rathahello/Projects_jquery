$(document).ready(function () {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        dataType: "json",
        url: url,
        success: function (data) {
            var results = "";    
            data.recipes.forEach(element => {
                if(element.id){
                    results += `
                        <div class="col-lg-6 " id="avocado">
                            <img src="${element.iconUrl}" class="img-fluid float-right" width="80">
                            <h3 class="float-right">${element.name}</h3>
                        </div>
                        
                    `;
                } 
            });
            $('#result').append(results);
            var api_fruits = "";
            data.recipes.forEach(el=>{
                if(el.id){
                    api_fruits=`
                    ${el.name};
                        <div>
                            ${el.instructions}
                        </div>
                    `;
                 }
                });
                $('#api_fruit').append(api_fruits);    
        },
        error: function () { console.error("error"); }
    });
});