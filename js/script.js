// Constants and Variables

let musicData, userInput, artistData, albumData;

//const API_KEY = '9c61803d5589d2c9d7afe6164ad96ea3';
const BASE_URL = 'https://proxify-artist-director.herokuapp.com';


// Cached Elements References 

const $main = $('main');
const $form = $('form');
const $input = $('input[type="text"]');
const $artist = $('#artist');
const $album = $('#album');
const $bio = $('#bio');


// Event Listeners 

$form.on('submit', handleGetArtist);
$form.on('submit', handleGetAlbum); 


// Functions 

// 1) Function to obtain Artist's Information

function setQuery(event) {
    if(event.keyCode === 13) {
        handleGetArtist(value);
    }
}

function handleGetArtist(event) {
    event.preventDefault();
    userInput = $input.val();
    if(!userInput) return;

    $.ajax( BASE_URL + '/artist?artist=' + userInput)
    .then(function(data) {
        artistData = data.artist;

        artistName = artistData ['name'];
        artistBio = artistData ['bio']['summary'];
        console.log(artistName);
        console.log(artistBio, 'summary');
        renderArtist(artistData);

    }, function(error) {
            console.log('Error: ', error);
    });
}

function renderArtist() {
    $artist.html(`Artist: ${artistData.name}`);
    $bio.text(`Bio: ${artistData.bio.summary}`);  
}



// 2) Function for obtaining album information 

function setQuery(event) {
    if(event.keyCode === 13) {
        handleGetAlbum(value);
    }
}

function handleGetAlbum(event) {
    event.preventDefault();
    userInput = $input.val();
    if(!userInput) return;

    $.ajax(  BASE_URL + '/album?artist=' + userInput)
    .then(function(data) {
        
        albumData = data;
        renderTopAlbums();

    },  function(error) {
            console.log('Error: ', error);
    });
}

function renderTopAlbums(){
    const html = albumData.topalbums.album.slice(0,5).map(function(album){
        return `
             -${album.name}<br>
        ` 
    });
    console.log(html);
    $album.html(html);
}



