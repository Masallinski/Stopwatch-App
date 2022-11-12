// jquery code
$(function() {
    // variables
    var mode = 0;  // app mode
    var timeCounter = 0;//time counter
    var lapCounter = 0;// lap counter
    var action;// variable for setInterval
    var lapNumber = 0;//Number of Laps

    // minutes, seconds, centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds,
    lapMinutes, lapSeconds, lapCentiseconds;

    // on app load show start and lap buttons 
    hidesButtons("#startButton","#lapButton");

    // click on startButton
    $("#startButton").click(function() {
        // mode on
        mode = 1;
       // show stop and lap buttons
       hidesButtons("#stopButton","#lapButton");
       // start counter
       startAction();
    })
       

    // click on stopButton
    $("#stopButton").click(function() {
        // show resume and reset buttons
        // hidesButtons("#resumeButtons","resetButton")
      // stop counter
      clearInterval(action);
    })
      

    // click on resumeButton
    $("#resumeButton").click(function() {
        // show stop and lap buttons
        hidesshowButtons("#stopButton","lapButton")
      // start action
      startAction();
    });
      
    // click on lapButton
    $("#resetButton").click(function() {
         //reload the page
         location.reload();
    });
     
    
    // click on lapButton
    $("#lapButton").click(function(){
            // if mode is ON
            if(mode){
                // stop action
                clearInterval(action);
                // resetLap and print lap details
                lapCounter= 0;
                addLap();
                 // start action
                 startAction();


            }
    })

       
    // functions
    // hidesButtons
    function hidesButtons(x,y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
   // start the counter
    function startAction() {
       action = setInterval(function(){
        timeCounter++;
        if(timeCounter == 100*60*100) {
            timeCounter = 0;
        }
        lapCounter++;
        if(timeCounter == 100*60*100) {
            timeCounter = 0;
        }
        updateTime();
       },10)
    }
   // converts to min , sec ,centisec
    function updateTime() {
        //1min = 60 * 100 = 6000 centiseconds
        timeMinutes = Math.floor(timeCounter / 6000);
        // 1 sec = 100 centisec
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

         //1min = 60 * 100 = 6000 centiseconds
         lapMinutes = Math.floor(timeCounter / 6000);
         // 1 sec = 100 centisec
         lapSeconds = Math.floor((timeCounter%6000)/100);
         lapCentiseconds = (timeCounter%6000)%100;

         $("#lapminute").text(format(lapMinutes));
         $("#lapsecond").text(format(lapSeconds));
         $("#lapcentisecond").text(format(lapCentiseconds));
    }

    // format numbers
    function format(number) {
        if(number<10) {
            return '0' + number;
        }
        else {
            return number;
        }
    }

    // add Lap
    function addLap() {
        lapNumber++;
        var myLapDetails = 
        '<div class="lap">' +
          '<div class="laptimetitle">' +
             'lap' + lapNumber + 
          '</div>' +
          '<div class="laptime">' +
              '<span>' + format(lapMinutes) + '</span>'+
              ':<span>' + format(lapSeconds) + '</span>'+
              ':<span>' + format(lapCentiseconds) + '</span>'+
          '</div>'
        '</div>';
        $(myLapDetails).prependTo("#laps");
    }
});