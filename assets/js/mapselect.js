//MapSelect JS
"use strict";
var lat = 52;
var long = -60;
var scale = 350;
var map = new Datamap({
    element: document.getElementById('map'),
    geographyConfig: {
	    highlightOnHover: true,
	    highlightFillColor: '#9F9F9F',
	    //highlightFillColor: 'rgba(238,50,36, 0)',
	    highlightBorderColor: '#9F9F9F',
	    highlightBorderWidth: 1
	},
	fills: {
        'available': '#F58025',
        defaultFill: '#C4C4C4'
    },

    data: {
        "AUS": {
            "fillKey" : "available"
        },
    	"AUT": {
    		"fillKey" : "available"
    	},
    	"BEL": {
    		"fillKey" : "available"
    	},
    	"CAN": {
    		"fillKey" : "available"
    	},
    	"CHE": {
    		"fillKey" : "available"
    	},
    	"CYP": {
    		"fillKey" : "available"
    	},
    	"DEU": {
    		"fillKey" : "available"
    	},
    	"ESP": {
    		"fillKey" : "available"
    	},
    	"FIN": {
    		"fillKey" : "available"
    	},
    	"FRA": {
    		"fillKey" : "available"
    	},
        "GBR": {
            "fillKey" : "available"
        },
    	"HKG": {
    		"fillKey" : "available"
    	},
    	"IRL": {
    		"fillKey" : "available"
    	},
        "ITA": {
            "fillKey" : "available"
        },
        "LUX": {
            "fillKey" : "available"
        },
        "MAR": {
            "fillKey" : "available"
        },
    	"MLT": {
    		"fillKey" : "available"
    	},
    	"NLD": {
    		"fillKey" : "available"
    	},
        "NOR": {
            "fillKey" : "available"
        },
        "NZL": {
            "fillKey" : "available"
        },
        "PRT": {
            "fillKey" : "available"
        },
        "SVN": {
            "fillKey" : "available"
        },
        "SWE": {
            "fillKey" : "available"
        },
    	"ZAF": {
    		"fillKey" : "available"
    	},
    },


    setProjection: function(element) {
	    var projection = d3.geo.equirectangular()
	      .center([long, lat])
	      .scale(scale)
	      console.log("long: " + long + " and lat: " + lat);
	    var path = d3.geo.path()
	      .projection(projection);

	    return {path: path, projection: projection};
	},

    movemap: function(geography){

        $.ajax({
            url: "../mapselect-d3/assets/shapefiles/centers.json",
        }).done(function(centers) {
            for(var key in centers){
                if(centers[key].code == geography.id){
                    lat = centers[key].latitude;
                    long = centers[key].longitude;
                    scale = 500;
                    map.options.setProjection();
                }
            }

           });
    },

	done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            map.options.movemap(geography);

            if(geography.properties.name == "United Kingdom"){
                geography.properties.name = "Great Britain";
            }

            if(typeof map.options.data[geography.id] !== "undefined") { 
                $(".mapselect-country").html("<style>height:4em;</style>");
            	$(".mapselect-selectedcountry").html("");
    	       
    	       	$.ajax({
					url: "../mapselect-d3/assets/products/products.json",
				}).done(function(data) {
                    $(".mapselect-table").removeClass("mapselect-hidden");
					for(var i = 0, itemcounter = 0; i < data.length; i++){
                        if(data[i].country != 0 && /.+.+-SC-.+.+.+/.test(data[i].sku) == false){
                            if(data[i].country == geography.properties.name){
                                itemcounter ++;
                                $(".mapselect-quantity").html("There are " + itemcounter + " items for your selection");
                                $(".mapselect-selectedcountry").append( "<tr> <div class='mapselect-item'> <td class='mapselect-product'> " + data[i].name + " </td> <td class='mapselect-price'>£ " + (data[i].price + (data[i].price/5)) + " </td> <td class='mapselect-countrylist'> " + data[i].country + " </td> <td class='mapselect-sku'> " + data[i].sku + " </td> <td class='mapselect-buy'> <a href='https://satmap.com/quickorder?skus=" + data[i].sku + "'>Buy Now!</a></td> </div> </tr>")

                            //Unminified:
                            // "<tr>
                            //     <div class='mapselect-item'>
                            //        <td class='mapselect-product'> " + data[i].name + " </td>
                            //        <td class='mapselect-price'>£ " + data[i].price + " </td>
                            //        <td class='mapselect-countrylist'> " + data[i].country + " </td>
                            //        <td class='mapselect-sku'> " + data[i].sku + " </td>
                            //        <td class='mapselect-buy'> <a href='https://satmap.com/quickorder?skus=" + data[i].sku + "'>Buy Now!</a></td>
                            //     </div>
                            //</tr>"
                            }
                        }
                    }
			  	});

            } else {
            	$(".mapselect-country").html("<h1> No maps available for this country, please try again </h1>");
                $(".mapselect-table").addClass("mapselect-hidden");

                //Clearing sections of the page not needed if products aren't getting shown
                $(".mapselect-quantity").html("");
                $(".mapselect-selectedcountry").html("");
            }
            
        });
    }

});