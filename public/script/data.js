$(function(){
    var t1 = $(".table-1");
    var t2 = $(".table-2");
    var t3 = $(".table-3");
    var t4 = $(".table-4");
    
    $.get('/listItems', {}, function (data) {
        t2.empty().css("display","none");
        t2.append('<tr id="headRow"><td>Items</td><td>Count</td></tr>');
        for (i = 0; i < data.length; i++) {
            t2.append('<tr><td>' + data[i]._id + '</td><td>' + data[i].count + '</td></tr>');
        }
        console.log(data);
    });
    $.get('/showDb', {}, function (data) {
        t3.empty().css("display","none");
        t3.append('<tr id="headRow"><td>order ID</td><td>Customer name</td><td>Customer address</td><td>Item name</td><td>Price</td><td>Currency</td></tr>');
        for (i = 0; i < data.length; i++) {
            t3.append('<tr><td>' + data[i]["order ID"] + '</td><td>' + data[i]["Customer name"] + '</td><td>' + data[i]["Customer address"] + '</td><td>' + data[i]["Item name"] + '</td><td>' + data[i]["Price"] + '</td><td>' + data[i]["Currency"] + '</td></tr>');
        }
        console.log(data);
    });
    $.get('/showInfo', {}, function (data) {
        t4.empty().css("display","none");
        t4.append('<tr id="headRow"><td>Customer name</td><td>Customer address</td><td>Item names</td><td>Price</td></tr>');
        for (i = 0; i < data.length; i++) {
            t4.append('<tr><td>' + data[i]["Name"] + '</td><td>' + data[i]["Address"] + '</td><td>' + data[i]["Items"] + '</td><td>' + data[i]["Price"] + '</td></tr>');
        }
        console.log(data);
    });
    $("#list").click(function(){
        t3.fadeOut();
        t4.fadeOut();
        t2.stop().slideToggle(500);
    })
    $("#odb").click(function(){
        t4.fadeOut();
        t2.fadeOut();
        t3.stop().slideToggle(500);
    })
    $("#cdb").click(function(){
        t3.fadeOut();
        t2.fadeOut();
        t4.stop().slideToggle(500);
    })
    
});