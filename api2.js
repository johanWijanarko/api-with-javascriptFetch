// $('.search-button').on('click', function (){
//     $.ajax({
//         url    : 'http://www.omdbapi.com/?apikey=9177c9bf&s=' + $('.input-keyword').val(),
//         success: results => {  
//             let movies = results.Search;
//             let cards = '';
    
//             movies.forEach(m=> {
//                 cards +=showCards(m);
//             });
    
//             $('.movie-container').html(cards);
    
//             $('.modal-detail-button').on('click', function () {
//                 // console.log($(this).data('imdbid'));
//                 $.ajax ({
//                     url:'http://www.omdbapi.com/?apikey=9177c9bf&i=' + $(this).data('imdbid'),
//                     success : m => {
//                         const movieDetail = showMovieDetail(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
           
//         },
//         error: (e) => {
//             console.log(e.responseText);
//         }
    
//     });

// });


// kita gunakan full javascript dengan fetch dan tidak menggunakan ajax/ jquery

// fetch
// deskripsikan variable searchButon ke dalam queryselector
const searchButton = document.querySelector('.search-button');
// kasih event, jika serachButton di klik maka lakukan
searchButton.addEventListener('click', function (){

    const inputKeyword = document.querySelector('.input-keyword');
    fetch('http://www.omdbapi.com/?apikey=9177c9bf&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach(m => cards += showCards(m));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;

// ketika tombol detil di klik
    const modalDetailButton = document.querySelectorAll('.modal-detail-button');
    modalDetailButton.forEach(btn => {
        btn.addEventListener('click', function (){
            const imdbid = this.dataset.imdbid;
            // console.log(imdbid);
            fetch('http://www.omdbapi.com/?apikey=9177c9bf&i=' + imdbid)
            .then(response => response.json())
            .then(m => {
                const movieDetail = showMovieDetail(m);
                const modlBody = document.querySelector('.modal-body');
                modlBody.innerHTML = movieDetail;
            })
        })
    })

    });
});


function showCards(m){
    return `
    <div class="col-md-4 my-3">
        <div class="card" >
            <img src="${m.Poster}" class="card-img-top" >
            <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">show details</a>
            </div>
        </div>
    </div>`;
}

function showMovieDetail(m){
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">                    
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">${m.Title} (${m.Year})</li>
                <li class="list-group-item"><strong>Director :</strong>${m.Director} </li>
                <li class="list-group-item"><strong>Actor :</strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong><br> ${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>
    `;
}