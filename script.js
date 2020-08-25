const ApiUrl = "https://www.benjaminjeschke.com/housecontrol/index.php";
const ControlLight = 'control-light';
const ControlTemperature = 'control-temperature';
const ControlCurtains = 'control-curtains';

$(document).ready(function () {

    // Get Data From Server at first pageload
    init();


    // Light Change Event
    $('input[type=radio][name=' + ControlLight + ']').change(function () {

        CommunicateWithServer('setLight', this.value);

    });

    // Temperatur Change Event
    $('#' + ControlTemperature).change(function () {

        CommunicateWithServer('setTemperature', this.valueAsNumber);

    });

    // Curtains Change Event
    $('input[type=radio][name=' + ControlCurtains + ']').change(function () {

        CommunicateWithServer('setCurtains', this.value);

    });

});

// control init
function init() {

    CommunicateWithServer('setLight', '');
    CommunicateWithServer('setTemperature', '');
    CommunicateWithServer('setCurtains', '');

}

// Communication With Server
// Send Data:
// control: string
// value: number
function CommunicateWithServer(aControl, aValue) {

    $.ajax({
        url: ApiUrl,
        data: {control: aControl, value: aValue},
        type: 'GET',
        crossDomain: true,
        success: function (successData) {

            var data = JSON.parse(successData);
            changeControlValue(data);
        },
        error: function () {
            alert('Unfortunately an error occurred');
        }
    });

}

// function called when communication with server was successful
function changeControlValue(aObjControlData) {

    if (aObjControlData.control == undefined || !aObjControlData.value == undefined) {
        return
    }

    switch (aObjControlData.control) {
        case 'setLight':
            setLight(aObjControlData.value);
            break;
        case 'setTemperature':
            setTemperature(aObjControlData.value);
            break;
        case 'setCurtains':
            setCurtains(aObjControlData.value);
            break;
    }

}

// Change user interface of Light Control
function setLight(aValue) {

    $('#' + ControlLight).prop('checked', aValue);

    (aValue === '1') ? $('.light-status').addClass('active') : $('.light-status').removeClass('active');

}


// Change user interface of Temperature Control
function setTemperature(aValue) {

    $('#' + ControlTemperature).val(aValue);

    $('#current-temperature').html(aValue + '&#8451;');

}

// Change user interface of Curtains Control
function setCurtains(aValue) {

    $('#' + ControlCurtains).prop('checked', aValue);

    (aValue === '1') ? $('.curtains-status').addClass('active') : $('.curtains-status').removeClass('active');

}
		
		
		

