$.ajax({
		url: "../assets/products/products.json",
	}).done(function(data) {
		for(var i = 0, itemcounter = 0; i < data.length; i++){
            if(data[i].country != 0){
                console.log("Entered first if");
            
                countries = [];
                for(var i = 0; i < data.length;i++){
                    if(countries.indexOf(data[i].country) == -1){
                        console.log("Entered second if");
                        countries.push(data[i].country);
                        countries.push("<br>");
                         $(".output").html(countries);
                    }
                }    

            } else{
                console.log("Didn't enter first if");
            }

        }
    })


//    countries = [];
//    for(var i = 0; i < array.length;i++){
//        if(countries.indexOf(array[i].id) == -1){
//            countries.push(array[i].id);
//        }
//    }        