var DELAY = 10000;
var page = require('webpage').create();
var system = require('system');
var args = system.args;
var username = args[1];
var password = args[2];

page.onConsoleMessage = function (msg) {
    console.log(msg);
};
page.viewportSize = {
    width: 1920,
    height: 1080
};

page.onError = function (msg) {
    console.log('js error', msg);
};

page.open("https://www.smartinhalerlive.com/", function (status) {

    page.evaluate(function () {
        window.location.reload();
    });

    setTimeout(function () {
        var login = page.evaluate(function (username, password) {
            var a = document.querySelector("input[id='Login1_UserName']");
            var b = document.querySelector("input[id='Login1_Password']");
            a.value = username;
            b.value = password;
            document.getElementById("Login1_LoginButton").click();
        }, username, password);

        setTimeout(function () {
            page.evaluate(function () {
                window.location.href = "https://www.smartinhalerlive.com/Reports/MedicationUsagePatients.aspx";
            });
            setTimeout(function () {
                page.evaluate(function () {
                    window.location.reload();
                });
                setTimeout(function () {
                    //page.render('render.png');
                    page.evaluate(function () {
                        var data = [];
                        var table = document.querySelectorAll('table.rgMasterTable tbody tr');
                        Array.prototype.map.call(table, function (tr) {
                            if (tr.cells[0] && tr.cells[1] && tr.cells[2]) {
                                var elem = {
                                    user: tr.cells[0].innerText,
                                    date: tr.cells[1].innerText,
                                    inhaler: tr.cells[2].innerText,
                                    medName: tr.cells[3].innerText,
                                    medType: tr.cells[4].innerText,
                                    medStrength: tr.cells[5].innerText,
                                    event: tr.cells[6].innerText
                                };
                                data.push(elem);
                            }
                        });
                        console.log(JSON.stringify(data));

                    });
                    phantom.exit();
                }, DELAY);
            }, DELAY);
        }, DELAY);
    }, DELAY);
});
