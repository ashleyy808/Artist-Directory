// Constants and Variables

let musicData, userInput, artistData, albumData;

//const API_KEY = '9c61803d5589d2c9d7afe6164ad96ea3';
const BASE_URL = 'https://proxify-artist-director.herokuapp.com';
//const BASE_URL2 = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json';
//const BASE_URL3 = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=YOUR_API_KEY&format=json';
// Cached Elements References 

const $main = $('main');
const $form = $('form');
const $input = $('input[type="text"]');
const $artist = $('#artist');
const $album = $('#album');
const $bio = $('#bio');


// Event Listeners 

$form.on('submit', handleGetArtist);
//$form.on('submit', handleGetData); 
$form.on('submit', handleGetAlbum); 

// Functions 


// 1) Function to obtain Artist's Information


function setQuery(event) {
    if(event.keyCode === 13) {
        handleGetData(value);
    }
}

function setQuery(event) {
    if(event.keyCode === 13) {
        handleGetData(value);
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

function renderArtist(){
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
     //   albumData = data.topalbums.album.name.slice(0,10);

     renderTopAlbums();

    }, function(error) {
        console.log('Error: ', error);
    });
}

function renderTopAlbums(){
    const html = albumData.topalbums.album.slice(0,5).map(function(album){
        return `
             -${album.name}<br>
        ` 
    })
    console.log(html);
    $album.html(html);
}




/*

// 3) Function to obtain Suggested Artist's Info

function handleGetData(event) {
    event.preventDefault();
    userInput = $input.val();
    if(!userInput) return;
    
    $.ajax(BASE_URL +'?method=artist.getSimilar&artist='+ userInput +'&api_key=' + API_KEY + '&format=json')
    .then(function(data) {
        musicData = data.similarartists.artist.slice(0,10);
        render();
        
    }, function(error) {
        console.log('Error: ', error);
    });
}


function render() {
    const musicDetailUI = musicData.map(function(similarartist) {
        return `
      <main>
        <h3>${similarartist.name}</h3>
       </main>
        `;
    });
    $main.html(musicDetailUI);
    
}
/*
function render() {
    $similarartists.html(`Similar Artist: ${musicData.map.similarArtist.name}`);
}

*/