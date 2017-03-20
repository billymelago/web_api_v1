$(document).ready(function() {
    var $overlay = $('<div id="overlay"></div>');
    //Add Overlay to page
    $("body").append($overlay);
    var page = 1;
    
  
    //Get film data
    $.getJSON('http://swapi.co/api/films/', function(filmResponse) {
        var films = filmResponse.results;
        var filmsHTML = '<ul>';
        
        //Loop thru film data
        $.each(films, function(i, filmData) {
            filmsHTML += '<li class="filmTitle">';
            filmsHTML += filmData.title;
            filmsHTML += '</li>';
        });// end .each(filmData)
        filmsHTML += '</ul>';
        $('#movie_cont').html(filmsHTML);
        
           
        //Get People data
        $.getJSON('http://swapi.co/api/people/?page=' + page, function(peopleResponse){
            var people = peopleResponse.results;
            var peopleHTML = '<ul>';
                
            //Get species data
            $.getJSON('http://swapi.co/api/species/', function(speciesResponse){
                var species = speciesResponse.results;    
                
                //Loop thru people results
                $.each(people, function(i, peopleData) {
                    peopleHTML += '<li class="name">';
                    peopleHTML += '<h2>' + peopleData.name + '</h2>';
                    if(peopleData.films.length){
                        peopleHTML += '<h3>Appeared in the following film(s):</h3>';
                        peopleHTML += '<ul class="film_name">';
                        
                        //Loop thru films data
                        $.each(peopleData.films, function(i, filmURL) {
                            for (var c = 0; c < films.length; c++) {
                                if (films[c].url === filmURL) {
                                    
                                    peopleHTML += '<li>';
                                    peopleHTML += films[c].title;
                                    
                                    peopleHTML += '</li>';
                                    break;   
                                }//end if films match
                            }
                           
                        });//end $.each(filmURL)
                        peopleHTML += '</ul>';
                    } //end if films have length
                      
                    peopleHTML += '</li>';
                }); // end $.each(peopleData)
                peopleHTML += '</ul>';
                $('#characters_cont').html(peopleHTML);
                
            }); // end JSON(speciesResponses)
            $('.filmTitle').click(function(){
                $overlay.show();
                var newSearch = $(this).text();
                $.getJSON('http://swapi.co/api/films/?search=' + newSearch,
                function displayOverlayInfo(info) {
                    
                    var overlayHTML = '<div>';
                    $.each(info.results, function(i, data){
                        overlayHTML += '<p>The films poster will be displayed here</p>';
                        overlayHTML += '<h3>' + data.title + '</h3>';
                        overlayHTML += '<p>' + data.opening_crawl + '</p>';
                        overlayHTML += '<p>Director: ' + data.director + ', Release Date: ' + data.release_date + '</p>';
                    });
                    overlayHTML += '<button id="prev" class="btn">Previous</button>';
                    overlayHTML += '<button id="next" class="btn">Next</button>';
                    overlayHTML += '</div>';
                    
                    $('#overlay').html(overlayHTML);
                    
                    $('#next').click(function(){
                        $('#overlay').html();
                        var id = info.results[0].episode_id;
                        console.log(id);
                        
                        if(id < 7) {
                            id++;
                            var nextFilm = 'http://swapi.co/api/films/' + id + '/';
                            console.log(nextFilm);
                            function displayNextFilm(info) {
                                var overlayHTML = '<div>';
                                $.each(info.results, function(i, data){
                                    overlayHTML += '<p>The films poster will be displayed here</p>';
                                    overlayHTML += '<h3>' + data.title + '</h3>';
                                    overlayHTML += '<p>' + data.opening_crawl + '</p>';
                                    overlayHTML += '<p>Director: ' + data.director + ', Release Date: ' + data.release_date + '</p>';
                                });
                                overlayHTML += '<button id="prev" class="btn">Previous</button>';
                                overlayHTML += '<button id="next" class="btn">Next</button>';
                                overlayHTML += '</div>';

                                $('#overlay').html(overlayHTML); 
                                $overlay.click(function(){
                                    $overlay.hide();
                                });
                            } //end displayNextFilm()
                            $.getJSON(nextFilm, displayNextFilm);
                        } //end if id < 7
                    });//end button#next
                }); 
            });
        }); // end JSON(peopleResponse)
        
      
        var residentURLS = [];
        //Loop over all planet pages
        for (var j = 1; j < 8; j++){
            
            (function (i){
                var pageNum = i;
                        
                //Get planet data
                $.getJSON('http://swapi.co/api/planets/?page=' + pageNum, 
                function (planetResponse) {
                    
                    var planets = planetResponse;
                    var planetsHTML = '<ul>'; 
                    var residentsURL;
                    //Loop thru planet data
                    $.each(planets.results, function(i, planetsData) { 
                        planetsHTML += '<li class="planet_name">';
                        planetsHTML += planetsData.name + ', ' + 'Population: ' + planetsData.population;
                        planetsHTML += '</li>';
                        residentURLS.push(planetsData.residents);
                    }); //end $each(planetData)
                planetsHTML += '</ul>';
                $('#planets_cont').append(planetsHTML); 
                    return planetsHTML;
                });// end planetResponse()
                
            })(j);

        }// end for loop 
                        
    }); // end JSON(filmResponse) 

}); //end document.ready
