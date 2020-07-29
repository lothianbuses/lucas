function queryDatabase(query) {
    var category = $("#category").val();
    var filterText = "";

    if(query != null){
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

        for (var i = 0; i < records.length; i++) {
          var record = records[i];
          html += '<tr>';
          html += '<td><a href="javascript:editRecord(' + record.fields["ID"] + ');">' + record.fields["ID"] + '</a></td>';
          html += '<td>' + record.fields["First Name"] + '</td>';
          html += '<td>' + record.fields["Last Name"] + '</td>';
          html += '<td>' + record.fields["E Mail"] + '</td>';
          html += '</tr>';
        };

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

  function editRecord(id){
      window.location.href = "form.html?id=" + id;
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