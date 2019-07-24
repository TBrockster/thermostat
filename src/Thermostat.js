'use strict';

function Thermostat(){
  this.MINIMUM_TEMPERATURE = 10;
  this.MAXIMUM_TEMPERATURE = 32;
  this.POWER_SAVING_MODE_MAXIMUM_TEMPERATURE = 25;
  this.temperature = 20;
  this.powerSavingMode = true;
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};
Thermostat.prototype.isPowerSavingMode = function() {
  return this.powerSavingMode;
};
Thermostat.prototype.isMinimumTemperature = function() {
  return this.temperature === this.MINIMUM_TEMPERATURE;
};
Thermostat.prototype.isMaximumTemperature = function() {
  if(this.isPowerSavingMode()) {
    return this.temperature === this.POWER_SAVING_MODE_MAXIMUM_TEMPERATURE;
  };
  return this.temperature === this.MAXIMUM_TEMPERATURE;
};
Thermostat.prototype.up = function() {
  if(this.isMaximumTemperature())  {
    throw new Error('Error: Cannot raise thermostat above maximum temperature.');
  };
  this.temperature += 1;
};
Thermostat.prototype.down = function() {
  if(this.isMinimumTemperature()) {
    throw new Error('Error: Cannot lower thermostat below 10 degrees.');
  };
  this.temperature -= 1;
};
Thermostat.prototype.togglePowerSavingMode = function() {
  this.powerSavingMode ? this.powerSavingMode = false : this.powerSavingMode = true;
};
