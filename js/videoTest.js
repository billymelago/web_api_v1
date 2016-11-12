$('form').on('submit', function (e) {
    e.preventDefault();
    
    var character = $('input[type=text]').val().replace(/\s/g, "");
    character = character.split(',');
    console.log(character);
    var charResults = character.map(function (char) {
        return $.ajax({
            url: 'http://swapi.co/api/people/',
            dataType: 'json',
            data: {search: char},
            method: 'GET'
        });
    });
    
    $.when.apply(null, charResults)
        .then(function () {
            var charCard = Array.prototype.slice.call(arguments);
            getCharacterResults(charCard);
        });
    
    
    
});

function getCharacterResults(charCard) {
    charCard = charCard.map(function (result) {
        console.log(result[0].results);
        return result[0].results;
    });
    charCard = flatten(charCard);
    
    var charHomeworld = charCard.map(function(char) {
        return $.ajax({
            url: char.homeworld,
            dataType: 'json',
            method: 'GET'
        });
    });
    
    $.when.apply(null, charHomeworld)
        .then(function() {
            var people = Array.prototype.slice.call(arguments);
            charInfo(people);
            
    });
    
}

function charInfo(people) {
    people = people.map(function(home) {
        return home[0].name;        
    });
    console.log(people);
    displayHomeworld(people);
}
function displayHomeworld(homeWorld) {
        homeWorld.forEach(function(planet) {
            var $container = $('<div>').addClass('homeworld');
            var $title = $('<h5>').text('Planet name: ' + planet);
            $container.append($title);
            $('.homeworld_cont').append($container); 
        });
        
}

function getRandomCharacter(charaterArray) {
    var index = Math.floor(Math.random() * charaterArray.length);
    return charaterArray[index];
}

function flatten(arrayToFlatten) {
    return arrayToFlatten.reduce(function(a,b) {
        return a.concat(b);
    },[]);
}