// Constants and Variables

let musicData, userInput, artistData, albumData, artistDetail;

const API_KEY = '';
const BASE_URL = 'http://ws.audioscrobbler.com/2.0';
//const BASE_URL2 = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json';
//const BASE_URL3 = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=YOUR_API_KEY&format=json';
// Cached Elements References 

const $main = $('main');
const $form = $('form');
const $input = $('input[type="text"]');
const $artist = $('#artist');
const $album = $('#album');
//const $similarartists = $('#similaratists');  
const $cardsEl = $('#cards');
const $modal = $('#modal');
const $bio = $('#bio');

//const $output =$('#output');


// Event Listeners 

$form.on('submit', handleGetArtist);
//$form.on('submit', handleGetData);
$cardsEl.on('click', 'article', handleClick);    
$form.on('submit', handleGetAlbum); 

// Functions 


// 1) Function to obtain Artist's Info


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

    $.ajax( BASE_URL + '?method=artist.getinfo&artist=' + userInput + '&api_key=' + API_KEY + '&format=json')
    .then(function(data) {
        artistData = data.artist;
       // console.log(artistData);
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



// 2) Function to obtain 'Bio' Info through modal pop-up

init();
function init() {
    getData();
}
function getData(detailURL) {
    const url = detailURL ? detailURL : BASE_URL;
    $.ajax(url)
    .then(function(data) {
        if(detailURL) {
            artistDetail = data;
            renderArtist(true);
        } else {
            artistData = data;
            renderArtist();
        }
    }, function(error) {
        console.log('Error: ', error);
    
    });
}
function handleClick() {
    const url = this.dataset.url;
    getData(url);
}
function displayResults (bio) {
    artistBio = artistData ['bio']['summary'];
    console.log(artistBio, 'summary');
    bio = document.querySelector('#cards .flex-ctr');
    $bio.text(`Bio: ${artistData.bio.summary}`);
}
/*
function generateUI() {
    return artistData.results.map(function(bio) {
        return`
        <article data-url="${artist.url}" class="card flex-ctr outline">
            <h3>${artist.bio}<h3>
        </article>`;
    });
}
*/

function render(isDetail) {
    if(isDetail) {
        $sprite.attr({
            src: artistDetail.sprites.front_default,
            alt: artistData.name
        });
        $bio.text(`Bio: ${artistData.bio.summary}`);
        $modal.modal();
    } else {
        $cardsEl.html(generateUI())
    }
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

function setQuery(event) {
    if(event.keyCode === 13) {
        handleGetAlbum(value);
    }
}

function handleGetAlbum(event) {
    event.preventDefault();
    userInput = $input.val();
    if(!userInput) return;

    $.ajax( BASE_URL + '?method=artist.gettopalbums&artist=' + userInput + '&api_key=' + API_KEY + '&format=json')
    .then(function(data) {
        
        albumData = data;
        
       // console.log(albumTopAlbum);
        

       // console.log(albumData);
    //  renderTopAlbums();
      
      // renderTopAlbums(albumData);

    }, function(error) {
        console.log('Error: ', error);
    });
}

//function renderTopAlbums(){
   // console.log(albumData);
   // $output.text(albumData.topalbums.album);
   // $album.html(albumData.topalbums.album.name);
    //console.log(albumData);
    // $album.html(`Albums: ${albumData.map.topalbums.album.name.artist}`);
//}








function render() {
     musicDetailUI = albumData.map(function(topalbums) {
        return `
        <article>
        <h3>${topalbums.album.name}</h3>
        </article>
        `;
    });
    $main.html(musicDetailUI);
}


/*

function render() {
    const musicDetailUI = musicData.map(function(similarartist) {
        return `
        <p>
        <h3>${similarartist.name}</h3>
        </p>
        `;
    });
    $main.html(musicDetailUI);
}
*/




jQuery(document).ready(function($) {

    //Count nr. of square classes
    var countSquare = $('.square').length;
  
    //For each Square found add BG image
    for (i = 0; i < countSquare; i++) {
      var firstImage = $('.square').eq([i]);
      var secondImage = $('.square2').eq([i]);
  
      var getImage = firstImage.attr('data-image');
      var getImage2 = secondImage.attr('data-image');
  
      firstImage.css('background-image', 'url(' + getImage + ')');
      secondImage.css('background-image', 'url(' + getImage2 + ')');
    }
  
  });