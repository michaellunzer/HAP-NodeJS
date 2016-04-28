var PythonShell = require('python-shell');
// HomeKit types required
var types = require("./types.js")
var exports = module.exports = {};

var conversions = require('color-conversions');

var alpha_hex = require('alpha-to-hex');

var execute = function(accessory,characteristic,value){ console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " +  value + "."); }

exports.accessory = {
  displayName: "Bedroom Light",
  username: "1A:3B:3C:4D:1E:FF",
  pincode: "031-45-154",
  services: [{
    sType: types.ACCESSORY_INFORMATION_STYPE, 
    characteristics: [{
    	cType: types.NAME_CTYPE, 
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "Bedroom_Light",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.MANUFACTURER_CTYPE, 
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "LUNZCORP",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.MODEL_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "REV-1",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.SERIAL_NUMBER_CTYPE, 
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "A1S2NASF88EW",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255    
    },{
    	cType: types.IDENTIFY_CTYPE, 
    	onUpdate: null,
    	perms: ["pw"],
		format: "bool",
		initialValue: false,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Identify Accessory",
		designedMaxLength: 1    
    }]
  },{
    sType: types.LIGHTBULB_STYPE, 
    characteristics: [{
    	cType: types.NAME_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "LunzBulb",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Bla",
		designedMaxLength: 255   
    },{
    	cType: types.POWER_STATE_CTYPE,
    	onUpdate: function(value)
	{ 
    		console.log("Change:",value);
    		if (value) {
			PythonShell.run('/python/light1.py', function (err) {
 				console.log('On Success');
			});
    		} else {
    			PythonShell.run('/python/light0.py', function (err) {
    				console.log("Off Success");
    				
    			});
    		}
    	},
    	perms: ["pw","pr","ev"],
		format: "bool",
		initialValue: false,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Turn On the Light",
		designedMaxLength: 1    
    },{
    	cType: types.HUE_CTYPE,
    	
		onUpdate: function(value)
	{ 
    		console.log("Change:",value);

    		var convertedHexValue
    		convertedHexValue = String(conversions.hsv2hex(value, 100, 100));
    		console.log(convertedHexValue); 


    		var options = {
			  mode: 'text',
			  args: [convertedHexValue]
			};

			PythonShell.run('/python/lightColor.py', options, function (err, results) {
			  if (err) throw err;
			  // results is an array consisting of messages collected during execution
			  console.log('results: %j', results);
			});

			
    		

    		//create variable to combine PythonShell.run command with Hex Value

    		// var pythonPathString 
    		// pythonPathString = ('lightColor.py ',  + String(convertedHexValue));
    		// console.log(pythonPathString);
    		

   //  		if (value < 361) {
			// PythonShell.run(pythonPathString, function (err) {
 		// 		console.log('color is ' + convertedHexValue);
			// });
   //  		} 
   //  		else {
   //  		// 	//PythonShell.run('/python/light0.py', function (err) {
   //  				console.log("pass");
    				
   //  		}
    	},


    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Doesn’t actually adjust Hue of Light",
		designedMinValue: 0,
		designedMaxValue: 360,
		designedMinStep: 1,
		unit: "arcdegrees"
    },{
    	cType: types.BRIGHTNESS_CTYPE,
    	onUpdate: function(value) { console.log("Change:",value); execute("Test Accessory 1", "Light - Brightness", value); },
    	

//Everything commented out below should be uncommented to enable dimming. It crashes, so use caution.

	// 	onUpdate: function(value)
	// {
 //    		console.log("Change:",value);
 //    		//console.log("StaticValue:",alpha_hex.convert("12"));

 //    		var valueString = value.toString();

 //    		//console.log("StaticValue:",alpha_hex.convert(valueString));

	// 		var convertedHexValue2
	// 		convertedHexValue2 = alpha_hex.convert(valueString);
	// 		var convertedHexValue2String = String(convertedHexValue2);
	// 		console.log("convertedHexValue2String:",convertedHexValue2String.substring(1));

 //    		// var convertedHexValue2
 //    		// convertedHexValue2 = alpha_hex.convert(String(value));
 //    		// console.log("ConvertedHexValue:",convertedHexValue2.substring(1)); 

 //    		var options = {
	// 		  mode: 'text',
	// 		  args: [convertedHexValue2String.substring(1)] 
	// 		};

	// 		PythonShell.run('/python/lightDim.py', options, function (err, results) {
	// 		  if (err) throw err;
	// 		  // results is an array consisting of messages collected during execution
	// 		  console.log('results: %j', results);
	// 		});
	// 		},

    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Doesn’t actually adjust Brightness of Light",
		designedMinValue: 0,
		designedMaxValue: 100,
		designedMinStep: 1,
		unit: "%"
    },{
    	cType: types.SATURATION_CTYPE,
    	onUpdate: function(value) { console.log("Change:",value); execute("Test Accessory 1", "Light - Saturation", value); },
    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Doesn’t actually adjust Saturation of Light",
		designedMinValue: 0,
		designedMaxValue: 100,
		designedMinStep: 1,
		unit: "%"
    }]
  }]
}
