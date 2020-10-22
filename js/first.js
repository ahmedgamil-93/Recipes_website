

let allRecipes=[];
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let recipesRow= document.getElementById("recipesRow");
let searchResult= document.getElementById("searchResult");
let recipeDetail= document.getElementById("recipeDetails");

if(localStorage.getItem("myFood")==null)
{
   allRecipes=[];

}
else{
   allRecipes=JSON.parse(localStorage.getItem("myFood"));
   displayRecipes();
}


 async function getRecipes(term)
{
   let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`)
   apiResponse = await apiResponse.json();
   allRecipes = apiResponse.recipes;
   localStorage.setItem("myFood" ,JSON.stringify(allRecipes));
   displayRecipes()
  
}

searchBtn.addEventListener("click", function(){
   getRecipes(searchInput.value);
})


function displayRecipes()
{
   let cartoona = '';

   for(let i=0 ; i < allRecipes.length ; i++)
   {
      let myId = "'"+allRecipes[i].recipe_id+"'";

      cartoona += `
      <div class="card col-md-4 py-2 " onclick="getRecipeDetails(${myId})">
                  <div class="recipe">
                  <img src="${allRecipes[i].image_url}" class="card-img-top w-100 rounded">
                  <div class="card-body">
                  <h5 class="card-title color-mine">${allRecipes[i].title}</h5>
                  <p class="card-text">${allRecipes[i].publisher}</p>
                  <a href="${allRecipes[i].source_url}" class="btn btn-mine" target="_blank">Go Details</a>
                  </div>
                  </div>
    </div>
     
      `      
   }
   searchResult.innerHTML=cartoona;
   
}

 let recipeDetails=[];
async function getRecipeDetails(id)
{ 

   let apiResponse=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
   apiResponse= await apiResponse.json();
   recipeDetails=apiResponse.recipe;
   displayRecipeDetails();

}

function displayRecipeDetails()
{
   let cartoona=`
   <div class="detalis card ">
         <div class="card-body ">
         <h1>Recipe Details :</h1>
         <img src="${recipeDetails.image_url}" class="img-fluid rounded">
         <h2 class="color-mine">${recipeDetails.title}</h2>
         <h3>${recipeDetails.publisher}</h3>
         <h3>Ingredients :</h3>
         </div>
         <ul>`
         
             for(let i =0 ; i<recipeDetails.ingredients.length ; i++)
             {
                cartoona+=`<li>${recipeDetails.ingredients[i]}</li>`
             }
             cartoona+=`</ul>
             
             </div>`

      

 recipeDetail.innerHTML=cartoona;
}





