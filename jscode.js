        $(function () {
    
            var metric = false;
            var Url = "";
            var currentConditionsUrl = "";
            
            var language = "en-us";
            
            var apiKey = "hoArfRosT1215";  
            var awxClearMessages = function() {
                $("#WeatherInfo").html("...");
            }
            // Function to find the current weather conditions of given city i.e. the condition of clouds and temperature in degree Celsius     
            var GetCurrentWeatherConditions = function (locationKey) {
                currentConditionsUrl = "http://apidev.accuweather.com/currentconditions/v1/" + 
                    locationKey + ".json?language=" + language + "&apikey=" + apiKey;
                $.ajax({
                    type: "GET",
                    url: currentConditionsUrl,
                    dataType: "jsonp",
                    cache: true,                    
                    jsonpCallback: "awxCallback",   
                    success: function (data) {
                            var weatherconditions;
                            if(data && data.length > 0) {
                                var conditions = data[0];
                                var temp = metric ? conditions.Temperature.Metric : conditions.Temperature.Imperial;
                                weatherconditions = conditions.WeatherText + ", " + Math.round(((temp.Value-32)*5)/9) + " " + "degree Celsius";
                            }
                            else {
                                weatherconditions = "N/A";
                            }
                        $("#WeatherInfo").html(weatherconditions);
                    }
                });
            };
            // Firstly, we find the city which is mentioned in the textbox
            var Find_City = function (CITY_NAME) {
                awxClearMessages();
                Url = "http://apidev.accuweather.com/locations/v1/search?q=" + CITY_NAME + "&apikey=" + apiKey;
                $.ajax({
                    type: "GET",
                    url: Url,
                    dataType: "jsonp",
                    cache: true,                    
                    jsonpCallback: "awxCallback",   
                    success: function (data) { City_found(data); }
                });
            };
            // Check whether the city is found or not ..... if found get the current conditions of the city using the GetCurrentWeatherConditions function 
            var City_found = function (data) {
                var msg, locationKey = null;
                $("#awxUrl").html("<a href=" + encodeURI(Url) + ">" + Url + "</a>");
                
                locationKey = data[0].Key;
                    
                if(locationKey != null) {
                    GetCurrentWeatherConditions(locationKey);
                }       
            };
            
            // defining the functionality of search textbox
            $("#searchtxtbx").keypress(function (e) {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    var text = $("#searchtxtbx").val();
                    Find_City(text);
                    return false;
                } else {
                    return true;
                }
            });
            $("#Search").click(function () {
                var text = $("#searchtxtbx").val();
                Find_City(text);
            });
        });
		