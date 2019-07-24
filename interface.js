$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();

  $('#temperature-up').click(function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#power-saving-mode-toggle').click(function() {
    thermostat.togglePowerSavingMode();
    $('#power-saving').text('off')
    updateTemperature();
  })

  // $('#psm-on').click(function() {
  //   thermostat.powerSavingModeOn();
  //   $('#power-saving').text('on')
  //   updateTemperature();
  // })

  // $('#psm-off').click(function() {
  //   thermostat.powerSavingModeOff();
  //   $('#power-saving').text('off')
  //   updateTemperature();
  // })

  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    // $('#temperature').attr('class', thermostat.energyUsage());
  };
});
