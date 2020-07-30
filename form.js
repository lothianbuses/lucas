var recordID = null;
var category = "Students";

// this fires when webpage loads

$(document).ready(function () {

    var querystringParameters = getUrlVars();

    if ("category" in querystringParameters) {
        category = querystringParameters["category"];
    }

    // if querystring contains 'id', save it as local variable

    if ("id" in querystringParameters) {
        recordID = querystringParameters["id"];
        fillFieldsWithRecord(recordID);
    }

});

function fillFieldsWithRecord(id) {

    var url = "https://api.airtable.com/v0/appS2eIdn2kx4Jz30/" + category + "/" + id;

    axios.get(url, {
        headers: {
            'Authorization': 'Bearer keyv6QTGP06sdU3ld'
        }
    })
        .then(function (response) {
            // handle success

            var fields = response.data.fields;

            $("#category").val(category);
            $("#id").val(fields["ID"]);
            $("#first_name").val(fields["First Name"]);
            $("#last_name").val(fields["Last Name"]);
            $("#email").val(fields["E Mail"]);
            $("#gender").val(fields["Gender"]);
            $("#dob").val(fields["Date of Birth"]);
            $("#phone").val(fields["Phone"]);
            $("#address").val(fields["Address"]);
            $("#county").val(fields["County"]);
            $("#city").val(fields["City"]);
            $("#postcode").val(fields["Postcode"]);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });


}

function saveRecord() {

    // The way Airtable works:
    // To create a new record, POST a record to the web service
    // To update an existing record, PATCH a record with the correct Airtable record ID to the web service

    category = $("#category").val();

    var url = "https://api.airtable.com/v0/appS2eIdn2kx4Jz30/" + category;
    var httpMethod = "post";

    if (recordID != null) {
        httpMethod = "patch";
    }

    var record = {};
    record.fields = {};
    record.fields["ID"] = $("#id").val();
    record.fields["First Name"] = $("#first_name").val();
    record.fields["Last Name"] = $("#last_name").val();
    record.fields["E Mail"] = $("#email").val();
    record.fields["Gender"] = $("#gender").val();
    record.fields["Date of Birth"] = $("#dob").val();
    record.fields["Phone"] = $("#phone").val();
    record.fields["Address"] = $("#address").val();
    record.fields["County"] = $("#county").val();
    record.fields["City"] = $("#city").val();
    record.fields["Postcode"] = $("#postcode").val();

    if (recordID != null) {
        record.id = recordID;
    }

    axios({
        method: httpMethod,
        url: url,
        headers: {
            'Authorization': 'Bearer keyv6QTGP06sdU3ld'
        },
        data: {
            records: [record]
        }
    }).then(function (response) {
        // handle success

        console.log(response);
        alert("Record saved");

    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });;
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}