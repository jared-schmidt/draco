holiday = {
    start:function(slack){

        var day = moment().date();

        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];

        var Cherrio = Meteor.npmRequire('cheerio');
        var d = new Date();

        var month = monthNames[d.getMonth()].toLowerCase()

        var req = Meteor.http.get('http://www.holidayinsights.com/moreholidays/'+monthNames[d.getMonth()].toLowerCase()+'.htm');
        $ = Cherrio.load(req.content);


        var hol_lst = [];
        var msg = '';
        $("td p").each(function(){
          var val = $(this).text();
          // console.log(val);
          val = val.trim();
          day = day.toString();
          // console.log("0 ->" + val[0] == day[0])
          // console.log("val 0 -> " + val[0])
          // console.log("day 0 -> " + day[0])

          if (val[0] == day[0] ){
            // console.log("val 1 -> " + val[1])
            if (val[1] == " " || val[1] == day[1]){
                // console.log(val);
                val = val.replace(day, '');
                hol_lst.push(val);
                msg += val + '\n'
            }
            }
        });

        return msg;
    }
}
