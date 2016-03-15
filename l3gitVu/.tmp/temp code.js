/**
 * Created by Andrei on 11/24/2015.
 */
        //Stalk gunbroker.com
        $scope.performStalk = function(stalkVal) {

            //GunBroker Variables
            var gunBrokerUrl = 'http://www.gunbroker.com/';
            var gunBrokerSortType = '&Sort=4&PageSize=75';
            var gunBrokerHeader = 'application/x-www-form-urlencoded';

            var parseResponse = function (response) {
                var tmp = document.implementation.createHTMLDocument();
                tmp.body.innerHTML = response.data;
                window.open(tmp);
                var items = $(tmp.body.children).find('.GridBrowse tr');

                var results = [];
                for (var i = 0; i < items.length; i++) {
                    var result = {
                        Name: $(items[i]).children('a')[0].innerText,
                        Date: $(items[i]).children('strong')[0].innerText
                    };
                    results.push(result);
                }

            return results;
            };

            return $http.get(gunBrokerUrl + stalkVal + gunBrokerSortType, {headers: gunBrokerHeader})
                .then(parseResponse);
        };
        //END Stalk gunbroker.com