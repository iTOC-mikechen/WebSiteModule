
function sleep(msTime) {
    return new Promise((loopWait) => {
        setTimeout(() => {
            loopWait();
        }, msTime);
    });
}//延时等待函数


//服务器接口

let port1 = {};
port1["/ts1"] = function (req, res) {
    res.send("这是http的接口", 200);
    res.end();
};

let port2 = {};
port2["/ts2"] = function (req, res) {
    res.send("这是https的接口", 200);
    res.end();
};


let port3 = {};
port3["/ts3"] = function (req, res) {
    res.send("这是http、https公用的接口", 200);
    res.end();
};

//服务器接口

//网站服务器模块测试
let webservice = require("./website");
let tc = new webservice();

tc.ServicePort.http=9080;
tc.ServicePort.https = 9081;
tc.SSLPrivateKey = "./website/ssl.key";
tc.SSLCertificate = "./website/ssl.crt";
tc.EnableHttpMode=true;
tc.EnableHttpsMode = true;
tc.ExternalImportRouter={http:port1,https:port2,global:port3};
tc.openService().then();


//服务器1
let test1 = {};
test1["/op1"] = function (req, res) {
    res.send("这是前端页面服务器！", 200);
    res.end();
}
test1["/s"] = function (req, res) {
    res.redirect("https://localhost:8081/op2");
    res.end();
}

let webservice = require('./website');
let frt = new webservice();
frt.EnableHttpMode = true;
frt.ServicePort.http = 8080;
frt.EnableHistoryRouter = true;
frt.ExternalImportRouter = test1;
frt.openService().then(function () {

});

//服务器1

//服务器2
let test2 = {};
test2["/op2"] = function (req, res) {
    res.send("这是后台页面服务器！", 200);
    res.end();
}
test2["/close"] = async function (req, res) {
    res.send("已发出关闭前端服务器指令！", 200);
    await frt.closeService();
    // frt=null;
    res.end();
}
test2["/open"] = async function (req, res) {
    res.send("已发出开启前端服务器指令！", 200);
    await frt.openService();
    // restartServer();
    res.send("前端服务器已启动！", 200);
    res.end();
}

let bef = new webservice();
bef.EnableHttpsMode = true;
bef.SSLPrivateKey = "./website/ssl.key";
bef.SSLCertificate = "./website/ssl.crt";
bef.ServicePort.https = 8081;
bef.ExternalImportRouter = test2;
bef.openService().then(function () {

});
//服务器2


//网站服务器模块测试