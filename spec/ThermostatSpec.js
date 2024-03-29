'use strict';

describe('Thermostat', function(){

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });
  it('can increase temperature by 1 degree', function() {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });
  it('can decrease temperature by 1 degree', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });
  it('has a lower limit of 10 degrees', function() {
    for (var i = 1; i <= 10; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
    expect(function(){ thermostat.down(); }).toThrowError('Error: Cannot lower thermostat below 10 degrees.');
  });
  it('starts in power-saving-mode', function() {
    expect(thermostat.isPowerSavingMode()).toBe(true);
  });
  it('can reset temperature to 20 degrees', function() {
    thermostat.up();
    thermostat.reset();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  describe('when power-saving-mode is on', function() {
    it('can toggle off power-saving-mode', function() {
      thermostat.togglePowerSavingMode();
      expect(thermostat.isPowerSavingMode()).toBe(false);
    });
    it('has an upper limit of 25 degrees, in power-saving-mode', function() {
      expect(thermostat.isPowerSavingMode()).toBe(true);
      for (var i = 1; i <= 5; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
      expect(function(){ thermostat.up(); }).toThrowError('Error: Cannot raise thermostat above maximum temperature.');
    });
  });

  describe('when power-saving-mode if off', function(){
    beforeEach(function() {
      thermostat.togglePowerSavingMode();
    });
    it('can toggle on power-saving-mode', function() {
      thermostat.togglePowerSavingMode();
      expect(thermostat.isPowerSavingMode()).toBe(true);
    });
    it('has an upper limit of 32 degrees, outside power-saving-mode', function() {
      expect(thermostat.isPowerSavingMode()).toBe(false);
      for (var i = 1; i <= 12; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
      expect(function(){ thermostat.up(); }).toThrowError('Error: Cannot raise thermostat above maximum temperature.');
    });
  });

  describe('displaying energy usage', function() {
    describe('when the temperature is below 18', function() {
      it('returns low-usage', function() {
        for (var i = 1; i <= 3; i++) {
          thermostat.down();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(17);
        expect(thermostat.reportEnergyUsage()).toEqual('low-usage');
      });
    });
    describe('when the temperature is between 18 and 24', function() {
      it('returns medium-usage', function() {
        for (var i = 1; i <= 2; i++) {
          thermostat.down();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(18);
        expect(thermostat.reportEnergyUsage()).toEqual('medium-usage');
        thermostat.reset();
        for (var i = 1; i <= 4; i++) {
          thermostat.up();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(24);
        expect(thermostat.reportEnergyUsage()).toEqual('medium-usage');
      });
    });
    describe('when the temperature is above 24', function() {
      it('returns high-usage', function() {
        for (var i = 1; i <= 5; i++) {
          thermostat.up();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(25);
        expect(thermostat.reportEnergyUsage()).toEqual('high-usage');
      });
    });
  });
});
