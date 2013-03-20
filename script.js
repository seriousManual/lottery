var people = [];
var $config, $startScreen, $working, $spinner;

$(document).ready(function() {
    $config = $('#config');
    $startScreen = $('#startScreen');
    $working = $('#working');
    $spinner = $('#spinner');

    waiting();

    $('#bttnStart').click(function() {
        var peopleList = $('#names').val().split('\n').map(function(val) {
            return val.trim();
        }).filter(function(value) {
            return !!value;
        });

        people = new ListEval(peopleList, 4);

        $config.hide();
        $startScreen.show();
    });

    $('#bttnGo').click(function() {
        $startScreen.fadeOut(1000, function() {
            $working.fadeIn(3000);
        });

        setTimeout(function() {
            $working.hide();
            $spinner.show();

            chooser();
        }, 5000);
    });
});

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
            speed = 1500;
        }
        var a = people.get();

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

function ListEval(list, nr) {
    this.list = list || [];
    this.nr = nr || 2;
    this.lasts = [];

    this.get = function() {
        if(this.list.length === 1) {
            return this.length[0];
        } else if(this.list.length === 0) {
            return null;
        }

        var tmp;
        do {
            tmp = this.list[~~(Math.random() * this.list.length)]
        } while(this.lasts.indexOf(tmp) > -1);

        this.lasts.pop();
        this.lasts.unshift(tmp);

        return tmp;
    };

    this.init = function() {
        if(this.list.length <= 1) {
            return;
        }

        if(this.list.length <= nr) {
            this.nr = this.list.length - 1;
        }

        for(var i = 0; i < this.nr; i++) {
            this.lasts.push(null);
        }
    };

    this.init();
}