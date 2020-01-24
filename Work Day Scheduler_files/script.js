//clock code
var clock = setInterval(time,1000);
function time() {
    var timeNow = moment().format('MMMM Do YYYY, h:mm a');
    $('#currentDay').text(timeNow);
};
clock;




// ERIC USE THIS ONE 
// moment().isAfter(); // false















