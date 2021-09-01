const toggleSpinner =(display) =>{
    document.getElementById('loading-spinner').style.display = `${display}`
};
const searchFood = ()=>{
    const searchField  = document.getElementById('search-field');
    const searchText = searchField.value;

    if(searchText == ''){
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = `
        <h1 class="text-center mt-5 text-danger">404 Search result not found !</h1>
         `
    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals,searchText));
        // loadingStyle('none');
        toggleSpinner('flex');
    }

    searchField.value = '';
}

const displaySearchResult=(meals,searchText)=>{
    toggleSpinner('none');
    // loadingStyle('block');
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(meals == null){
        searchResult.innerHTML = `
        <h1 class="text-center mt-5 text-danger">${searchText} is Not Found</h1>
        `
    }
    else{
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card p-3" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top w-50 rounded-circle mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,80)}</p>
                    <button class="btn btn-outline-danger" onclick="(loadMealDetails(${meal.idMeal}))">View Details</button>
                </div>
             </div>
            `;   
            searchResult.appendChild(div);
        });
    }    
}

const loadMealDetails=(id)=>{
    // loadingStyle('none');
    toggleSpinner('flex');
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]));
}
const displayMealDetails = (meal) =>{
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = `
    <div class="col-md-4 mx-auto">
        <div class="card p-3">
            <img src="${meal.strMealThumb}" class="card-img-top mx-auto w-75" style="height:200px;" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <p>Category : ${meal.strCategory}</p>
            <p>Meal id : ${meal.idMeal}</p>
            <a class="btn btn-secondary" href="https://www.youtube.com/watch?v=utv-GpSJypk">Go Somewhere</a>
            </div>
         </div>
    </div>
    ` ;
    // loadingStyle('block');
    toggleSpinner('none');
}