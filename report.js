function queryDatabase(query) {
    var category = $("#category").val();
    var filterText = "";
  
    if (query != null) {
      filterText = "{First Name} = '" + query + "'";
      filterText = "?filterByFormula=" + encodeURI(filterText);
    }
  
    var url = "https://api.airtable.com/v0/appS2eIdn2kx4Jz30/" + category + filterText;
  
    axios.get(url, {
      headers: {
        'Authorization': 'Bearer keyv6QTGP06sdU3ld'
      }
    })
      .then(function (response) {
        // handle success
        console.log(response);
  
        var records = response.data.records;
        var html = "";
        var ageRanges = [];
        ageRanges["18-25"] = 0;
        ageRanges["26-40"] = 0;
        ageRanges["41-100"] = 0;
  
        for (var i = 0; i < records.length; i++) {
          var record = records[i];

            var dob = record.fields["Date of Birth"];
            var age = moment().diff(dob, "years");
            
            if(age <= 25)
            {
                ageRanges["18-25"] ++;
            }

            if ((age >= 26) && (age <= 40))
            {
                ageRanges["26-40"] ++;
            }

            if (age >= 41)
            {
                ageRanges["41-100"] ++;
            }
        };
        
        html += '<tr>';
        html += '<td> 18-25 </td>';
        html += '<td>' + ageRanges["18-25"] + '</td>';
        html += '</tr>';

        html += '<tr>';
        html += '<td> 26-40 </td>';
        html += '<td>' + ageRanges["26-40"] + '</td>';
        html += '</tr>';

        html += '<tr>';
        html += '<td> 41-100 </td>';
        html += '<td>' + ageRanges["41-100"] + '</td>';
        html += '</tr>';
  
        $("#injectable").html(html);
  
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  
  function editRecord(id) {
    window.location.href = "form.html?id=" + id + "&category=" + $("#category").val();
  }
  
  $(document).ready(function () {
  
    queryDatabase();
  
    $("#category").on('change', function () {
      queryDatabase();
    });
  
    $("#search").on("input", function () {
      var query = $("#search").val();
      queryDatabase(query);
  
    });
  });