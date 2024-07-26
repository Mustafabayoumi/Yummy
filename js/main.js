let sideWidth = $('.nav-tab').innerWidth();
$('#sideNav').animate({left: -sideWidth},500);

$('#sideNav i').click(function(){

    let sideWidth = $('.nav-tab').innerWidth();
    if($('#sideNav').css('left') == '0px')
    {
        $('#sideNav').animate({left: -sideWidth},500);
        $('#barsIcon').show()
        $('#closeIcon').hide()
    }
    else
    {
        $('#sideNav').animate({left: '0px'},500);
        $('#barsIcon').hide()
        $('#closeIcon').show()
    }
})



let rowData = document.getElementById("rowData");
let SearchInput = document.getElementById("SearchInput");

var allMeals = [];
async function getMeals() {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        
        if (!response.ok) 
        {
            console.log('Network response was not ok.');
        }
        
        var finalData = await response.json();
        allMeals = finalData.meals;
        displayProduct(allMeals);
        
    } 
    catch (error) 
    {
        console.error('Error fetching meals:', error);
    }
}
getMeals();



function displayProduct(meals) 
{
    $('.spiner').fadeIn(0);


    let cartoona ='';
    for(let i = 0; i < meals.length; i++)
    {
        
        cartoona += `<div onclick="getFood(${meals[i].idMeal})" class="meal md:w-1/4 w-1/2 p-2 group cursor-pointer">
        <div class="inner relative ">
        <img class="border-transparent w-[98%] rounded-lg " src="${meals[i].strMealThumb}" alt="meal for client">
        <div class="meal-info group rounded-lg bg-gray-100 opacity-75 flex items-center absolute top-full left-0 bottom-0 right-[2%] group-hover:top-0 duration-500 transition-all ease-in-out overflow-hidden">
            <h1 class="md:text-3xl text-xl font-medium pl-2">${meals[i].strMeal}</h1>
        </div>
        </div>
    </div>`
    }
    document.getElementById('rowData').innerHTML = cartoona;

    $('.spiner').fadeOut(500);
}


async function getFood(foods) 
{ 
    $('.spiner').fadeIn(0);


    let food = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foods}`)
    let foodData = await food.json();
    detailMeal(foodData.meals[0]);


    $('.spiner').fadeOut(500);
}


function detailMeal(detail)
{
    let box = "";
    for(let i = 1 ; i <= 10 ; i++)
    {
        let measure = detail[`strMeasure${i}`];
        let ingredient = detail[`strIngredient${i}`];

    
    if (measure.length >= 1 && ingredient.length >= 1 ) 
    {
        box += `<span class="bg-[#cff4fc] rounded-md p-1">${measure} ${ingredient}</span>`;
    }

}
    

    let tags = detail.strTags.split(",");
    let tagsBox = "";
    for(let i = 0 ;i < tags.length ; i++)
        {
            tagsBox += `<span class="bg-red-100 rounded-md p-1">${tags[i]}</span>`;
        }
    
    let myMeal = `<div class="flex md:flex-row flex-col ">
    <div class="innerMeal md:w-5/12 ps-6">
        <img class="w-full rounded-lg" src="${detail.strMealThumb}" alt="">
        <h2 class="text-white text-3xl font-medium my-7">${detail.strMeal}</h2> 
    </div>

        <div class="detailMeal md:w-7/12 ps-6">
            <h2 class="text-white text-4xl font-medium pb-4">Instructions</h2>
            <p class="text-white pb-4">
                ${detail.strInstructions}
            </p>
            <h3 class="text-white text-3xl font-medium pb-2">
                <span class="text-white text-3xl font-medium">Area : </span>${detail.strArea}
            </h3>
            <h3 class="text-white text-3xl font-medium pb-2">
                <span class="text-white text-3xl font-medium">Category : </span>${detail.strCategory}
            </h3>
            <h3 class="text-white text-3xl font-medium pb-2">Recipes :</h3>
            <div class="flex flex-wrap gap-3 mb-5">${box}</div> <!-- Fixed the double quote here -->
            <h3 class="text-white text-3xl font-medium pb-5">Tags :</h3>
            <div class="text-black flex flex-wrap gap-3 rounded-md mb-7 p-1 m-2">${tagsBox}</div>
            <a target="_blank" href="${detail.strSource}" class="text-white bg-[#198754] rounded-md hover:bg-green-700 px-3 py-2">Source</a>
            <a target="_blank" href="${detail.strYoutube}" class="text-white bg-[#dc3545] rounded-md hover:bg-red-600 px-3 py-2">Youtube</a>
        </div>
    </div>
`;
document.getElementById("rowData").innerHTML = myMeal;
}



function showSearchInput()
{
    $('#sideNav').animate({left: -sideWidth},500);
        $('#barsIcon').show()
        $('#closeIcon').hide()

    let search = `<div class="w-[90%] mx-auto">

            <div class="flex md:flex-row flex-col gap-5">
                <input id="searchName" oninput="getSearchData( this.id, this.value)" class="md:w-1/2  bg-transparent rounded-md text-white border focus:ring-4 ring-sky-800  py-2 px-3" type="text" placeholder="Search By Name">
                <input id="searchLetter" oninput="getSearchData( this.id , this.value)" maxlength="1" class="md:w-1/2  bg-transparent rounded-md text-white border focus:ring-4 ring-sky-800 py-2 px-3" type="text" placeholder="Search By First Letter">
            </div>

    <div id="showData" class="flex flex-row flex-wrap  text-white mt-5 "></div>

</div>`;
    document.getElementById("rowData").innerHTML = search;
}

async function getSearchData(searchTyp , term)
{
    

    let searchApi;
    if(searchTyp == "searchName" )
    {
        searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        searchApi = await searchApi.json();
        displaySearch(searchApi.meals);
    }
    else if(searchTyp == "searchLetter")
    {
        searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
        searchApi = await searchApi.json();
        displaySearch(searchApi.meals);
    }
    
    
}


function displaySearch(meals) 
{
    $('.spiner').fadeIn(0);
    
    
    let cartoona ='';
    for(let i = 0; i < meals.length; i++)
    {
        
        cartoona += `<div onclick="getFood(${meals[i].idMeal})" class="meal md:w-1/4 w-1/2 p-3">
        <div class="relative group left-0 right-0 cursor-pointer">
            <img class="border-transparent w-screen rounded-lg" src="${meals[i].strMealThumb}" alt="meal for client">
        <div class="meal-info group rounded-lg  bg-white/50 flex items-center absolute top-full left-0 bottom-0 right-0 group-hover:top-0 duration-500 transition-all ease-in-out overflow-hidden">
            <h1 class="md:text-3xl text-xl text-black font-medium ">${meals[i].strMeal}</h1>
        </div>
        </div>
    </div>`
    }
    document.getElementById('showData').innerHTML = cartoona;
    $('.spiner').fadeOut(500);

}



async function getCategoryData()
{
    $('.spiner').fadeIn(0);

    $('#sideNav').animate({left: -sideWidth},500);
        $('#barsIcon').show()
        $('#closeIcon').hide()

    let categoryApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    
    let finalData = await categoryApi.json();
    let cat = await finalData.categories;

    let category =``;
    for(let i=0; i < cat.length; i++)
    {
        category += `<div onclick="getCategoryList('${cat[i].strCategory}')" class="p-2 md:w-1/4 w-1/2">
    <div class="inner-Category">
    <div class="category relative group  overflow-hidden cursor-pointer">
        <img class="rounded-md w-full" src="${cat[i].strCategoryThumb}" alt="category photo">
        <div class="group p-3 bg-gray-100 bg-white/50 rounded-md flex flex-col items-center text-center absolute top-full left-0 bottom-0 right-0 group-hover:top-0 duration-500 transition-all ease-in-out ">
            <h2 class="md:text-3xl text-xl font-medium ">${cat[i].strCategory}</h2>
            <p>${cat[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>
    </div>
</div>`
    }
    document.getElementById('rowData').innerHTML = category;
    $('.spiner').fadeOut(500);

}




async function getCategoryList(list)
{
    $('.spiner').fadeIn(0);

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${list}`);
    
    let finalData = await api.json();
    let dataArr = await finalData.meals;

    let box =``;
    for(let i=0; i < dataArr.length; i++)
    {
        box += `<div  onclick="getFood('${dataArr[i].idMeal}')" class="p-2 md:w-1/4 w-1/2">
    <div class="inner-Category">
    <div class="category relative group  overflow-hidden cursor-pointer">
        <img class="rounded-md w-full" src="${dataArr[i].strMealThumb}" alt="category photo">
        <div class="group p-3 bg-gray-100 bg-white/50 rounded-md flex flex-col justify-center absolute top-full left-0 bottom-0 right-0 group-hover:top-0 duration-500 transition-all ease-in-out overflow-hidden">
            <h2 class="md:text-[28px] text-xl font-medium ">${dataArr[i].strMeal}</h2>
        </div>
    </div>
    </div>
</div>`
    }
    document.getElementById('rowData').innerHTML = box;

    $('.spiner').fadeOut(1000);
}




async function getAreaData()
{
    $('.spiner').fadeIn(0);

    $('#sideNav').animate({left: -sideWidth},500);
        $('#barsIcon').show()
        $('#closeIcon').hide()

    let api = [];
    let Area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let finalData = await Area.json();
    api = await finalData.meals;


    let boox =``;
    for(let i=0; i < api.length; i++)
    {
        boox += `<div onclick="getAreaList('${api[i].strArea}')" class="row md:w-1/4 w-1/2 flex flex-row flex-wrap p-5 cursor-pointer">

        <div class="inner w-full text-white flex flex-col justify-start items-center ">
            <i class="text-6xl fa-solid fa-house-laptop"></i>
            <h2 class="md:text-3xl text-xl font-semibold">${api[i].strArea}</h2>
        </div>
    </div>`
    }
    document.getElementById('rowData').innerHTML = boox;

    $('.spiner').fadeOut(500);
}


async function getAreaList(list)
{
    $('.spiner').fadeIn(0);
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${list}`);
    
    let finalData = await api.json();
    let dataArr = await finalData.meals;

    let box =``;
    for(let i=0; i < dataArr.length; i++)
    {
        box += `<div  onclick="getFood('${dataArr[i].idMeal}')" class="p-2 md:w-1/4 w-1/2">
    <div class="inner-Category">
    <div class="category relative group  overflow-hidden cursor-pointer">
        <img class="rounded-md w-full" src="${dataArr[i].strMealThumb}" alt="category photo">
        <div class="group p-3 bg-gray-100 bg-white/50 rounded-md flex flex-col justify-center  absolute top-full left-0 bottom-0 right-0 group-hover:top-0 duration-500 transition-all ease-in-out overflow-hidden">
            <h2 class="md:text-3xl text-xl font-medium ">${dataArr[i].strMeal}</h2>
        </div>
    </div>
    </div>
</div>`
    }
    document.getElementById('rowData').innerHTML = box;
    $('.spiner').fadeOut(500);

}


async function getIngredientsData()
{
    $('.spiner').fadeIn(0);

    $('#sideNav').animate({left: -sideWidth},500);
        $('#barsIcon').show()
        $('#closeIcon').hide()

    let Area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let finalData = await Area.json();
    api = await finalData.meals;
    

    let boox =``;
    for(let i=0; i < api.length; i++)
    {
        boox += `<div onclick="getIngredientsList('${api[i].strIngredient}')" class="md:w-1/4 w-1/2 p-5 cursor-pointer">
        <div class="inner text-white flex flex-col justify-center items-center ">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="md:text-3xl text-xl font-medium">${api[i].strIngredient}</h3>
            <p class="md:text-center text-base line-clamp-2">${api[i].strDescription}</p>
        </div>
    </div>`
    }
    document.getElementById('rowData').innerHTML = boox;
    $('.spiner').fadeOut(500);
    
}


async function getIngredientsList(list)
{
    $('.spiner').fadeIn(0);

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${list}`);
    
    let finalData = await api.json();
    let dataArr = await finalData.meals;

    let box =``;
    for(let i=0; i < dataArr.length; i++)
    {
        box += `<div  onclick="getFood('${dataArr[i].idMeal}')" class="p-2 md:w-1/4 w-1/2">
    <div class="inner-Category">
    <div class="category relative group  overflow-hidden cursor-pointer">
        <img class="rounded-md w-full" src="${dataArr[i].strMealThumb}" alt="category photo">
        <div class="group p-3 bg-gray-100 bg-white/50 rounded-md flex flex-col justify-center items-center absolute top-full left-0 bottom-0 right-0 group-hover:top-0 duration-500 transition-all ease-in-out overflow-hidden">
            <h2 class="md:text-3xl text-xl font-medium ">${dataArr[i].strMeal}</h2>
        </div>
    </div>
    </div>
</div>`
    }
    document.getElementById('rowData').innerHTML = box;
    $('.spiner').fadeOut(500);

}


function getContactUs()
{
    $('.spiner').fadeIn(0);
    
    $('#sideNav').animate({left: -sideWidth},500);
        $('#barsIcon').show()
        $('#closeIcon').hide()
    
    document.getElementById('rowData').innerHTML = `<div class="inner w-full flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="md:w-2/3 flex md:flex-row flex-col md:gap-0 gap-5 p-3">
        <input id="nameInput" onkeyup="inputsValidation()" class="w-full rounded-md text-black focus:outline-none focus:border-sky-900 focus:ring-4 focus:ring-sky-900  py-[6px] px-3 mr-6 "  type="text" placeholder="Enter Your Name">
        
        <input id="emailInput" onkeyup="inputsValidation()" class="w-full rounded-md text-black focus:outline-none focus:border-sky-900 focus:ring-4 focus:ring-sky-900  py-[6px] px-3 mr-6" type="email" placeholder="Enter Your Email">
    </div>

    <div class="md:w-2/3 flex md:flex-row flex-col md:gap-0 gap-5 p-3">
        <input id="phoneInput" onkeyup="inputsValidation()" class="w-full rounded-md text-black focus:outline-none focus:border-sky-900 focus:ring-4 focus:ring-sky-900  py-[6px] px-3 mr-6" type="text" placeholder="Enter Your Phone">
        <input id="ageInput" onkeyup="inputsValidation()" class="w-full rounded-md text-black focus:outline-none focus:border-sky-900 focus:ring-4 focus:ring-sky-900  py-[6px] px-3 mr-6" type="number" placeholder="Enter Your Age">
    </div>

    <div class="md:w-2/3 flex md:flex-row flex-col md:gap-0 gap-5 p-3">
        <input id="passwordInput" onkeyup="inputsValidation()" class="w-full rounded-md text-black focus:outline-none focus:border-sky-900 focus:ring-4 focus:ring-sky-900  py-[6px] px-3 mr-6" type="password" placeholder="Enter Your Password">
        <input id="repasswordInput" onkeyup="inputsValidation()" class="w-full rounded-md text-black focus:outline-none focus:border-sky-900 focus:ring-4 focus:ring-sky-900  py-[6px] px-3 mr-6" type="password" placeholder="Repassword">
    </div>
    
        <button id="submitBtn" disabled="true" class="bg-black text-red-900 mt-3 p-2 outline outline-red-900 outline-1 rounded-md mr-5">Submit</button>
    </div>`;

    $('.spiner').fadeOut(500);

}