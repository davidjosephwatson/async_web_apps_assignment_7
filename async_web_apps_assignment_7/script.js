'use strict';

const apiKey = 'dFMna9w3blWuEM3ALGj74AKbbLA3k8VdiZJWfiHy'; 
//check this url
const searchURL = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}`;

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function pingParks(stateCode, limit=10) {
    const params = {
        stateCode: [],
        limit
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '&' + queryString;

    fetch(url)
    .then(result => result.json())
    .then(resultJson => {
        if (resultJson.status === 'error') {
            displayError();
        } else {
            console.log(url);
            displayResults(resultJson);
        }
        console.log(resultJson);
      })
    .catch(error => {
        alert('Something went wrong. Try again later.'); 
        }); 
    }

function displayError() {
    $('.feedback').text("No Parks Found")
}
    
function displayResults(resultJson) {
    console.log(resultJson);
    $('.results-list').empty();
    for (let i=0; i<resultJson.data.length; i++) {
    $(".results-list").append(
        `<h2>Park Name:</h2><br>
        ${resultJson.data[i].fullName}<br>
        <h2>Description:</h2><br>
        ${resultJson.data[i].description}<br>
        <h2>Website URL:</h2><br>
        <a href="${resultJson.data[i].url}">Park_Link</a><br>`)
    }
    $('.results').removeClass('hidden');
}
    
function addEventListener() {
    $("form").submit(e=>{
        e.preventDefault();
        $('.feedback').text('');
        let searchTerm = $('#search-term').val();
        let limit = $('#max-results').val();
        pingParks(searchTerm, limit);
    })
}
    
$(function() {
    addEventListener();
})
    //"https://developer.nps.gov/api/v1/parks?stateCode=MI&stateCode=&limit=5"
    // fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc`)
    // fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    //'https://INSERT-API-KEY-HERE@developer.nps.gov/api/v1/parks?parkCode=acad'
    //'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE'