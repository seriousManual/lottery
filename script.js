var people = [];
var $config, $startScreen, $working, $spinner;

$(document).ready(function() {
    $config = $('#config');
    $startScreen = $('#startScreen');
    $working = $('#working');
    $spinner = $('#spinner');

    waiting();

    $('#bttnStart').click(function() {
        people = $('#names').val().split('\n').map(function(val) {
            return val.trim();
        }).filter(function(value) {
            return !!value;
        });

        $config.hide();
        $startScreen.show();
    });

    $('#bttnGo').click(function() {
        $startScreen.hide();
        $working.show();
        setTimeout(function() {
            $working.hide();
            $spinner.show();

            chooser();
        }, 3000);
    });
});

function returnRandomPeople(list) {
    return list[~~(Math.random()*list.length)];
}

function waiting() {
    var $points = $('#working');

    var state = 0;

    var states = ['|', '/', '-', '\\'];

    setInterval(function() {
        state = (++state) % states.length;

        $points.html(states[state]);
    }, 300)
}

function chooser() {
    var $box = $('#spinner div');

    var speed = 100;
    var level = 50;
    var decayInt = setInterval(function() {
        speed += level;
        level = Math.max(5, level - 1);
    }, 400);

    function role() {
        var end = false;
        var to = '250px';

        if(speed > 1000) {
            to = '80px';
            end = true;
        }
        var a = returnRandomPeople(people);

        $box.html(a);

        $box.animate({
            top: to
        }, speed, function() {
            if(!end) {
                $box.css({top:'-250px'});
                role();
            }
        });
    }

    role();
}
