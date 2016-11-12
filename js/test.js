$(document).ready(function() {
   
    //Loop over all person pages
    for (var j = 1; j < 9; j++){

        (function (i){
            var pageNum = i;        
            //Get people data
            $.getJSON('http://swapi.co/api/people/?page=' + pageNum, 
            function (peopleResponse) {
                var person = peopleResponse;
                var personHTML = '<ul>';
                //Loop thru person data
                $.each(person.results, function(i, personData) { 
                    personHTML += '<li class="person_name">';
                    personHTML += personData.name;
                    personHTML += '</li>';
                    //Use persons homeworld for new URL call to that homeworld
                    $.getJSON(personData.homeworld,
                    function(homeworldResponse){
                        //Grab the name and add a <li>
                        personHTML += '<li>' + homeworldResponse.name + '</li>';
                        console.log(homeworldResponse.name);
                    }); //JSON(personData.homeworld)

                }); //end $each(planetData)

                personHTML += '</ul>';
                //Print to the page
                $('#planets_cont').append(personHTML);

            });// end peopleResponse()

        })(j);

    }// end for loop
  
}); //end document.ready
