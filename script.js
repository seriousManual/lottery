var people = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
];

$(document).ready(function() {
    $('button').click(chooser);
});

var prev = null;

function returnRandomPeople() {
    var zug;

    do {
        zug = people[~~(Math.random()*people.length)];
    } while(zug === prev);

    prev = zug;

    return zug;
}

function waiting(cb) {
    var nr = 0;
    $cont = $('#name');

    setTimeout(function() {
        $cont.html('working');
    }, 500);

    setTimeout(function() {
        $cont.html('working..');
    }, 1000);

    setTimeout(function() {
        $cont.html('working...');
    }, 1500);

    setTimeout(function() {
        $cont.html('working....');
    }, 2000);

    setTimeout(function() {
        $cont.html('working.....');
    }, 2500);

    setTimeout(function() {
        $cont.html('working......');
    }, 3000);

    setTimeout(function() {
        $cont.html('working.......');
    }, 3500);

    setTimeout(function() {
        $cont.html('working........');
    }, 4000);

    setTimeout(function() {
        cb();
    }, 4500);
}

function chooser() {
    var $cont = $('#name');
    $cont.html('');

    var theChoosenOne = returnRandomPeople();

    waiting(function() {
        $cont.html('');

        var $box = $('<div></div>').addClass('subBox');
        $cont.append($box);
        $box.html(returnRandomPeople());

        var speed = 100;
        var level = 50;
        var bla = setInterval(function() {
            speed += level;
            level = Math.max(5, level - 1);
        }, 400);

        function role(cb) {
            var end = false;

            var to = '130px';

            if(speed > 1000) {
                $box.html(returnRandomPeople());
                to = '60px';
                end = true;
            } else {
                $box.html(returnRandomPeople());
            }

            $box.animate({
                top: to
            }, speed, function() {
                if(end) {
                    cb();
                } else {
                    $box.css({top:'-80px'});
                    role(cb);
                }
            });
        }

        role(function() {

        });

    });


}