/**网站服务器模块(WebSite Server Module)**/
"use strict";//启用严格模式

class website {
    static Dict = {
        String: "为字符串类型",
        Array: "为数组类型",
        Object: "为对象类型",
        Boolean: "为布尔类型",
        Number: "为数字类型",
        Undefined: "未知定义类型",
        Function: "为函数类型",
        AsyncFunction: "为异步函数类型"
    }//人性化判断数据类型
    jds = {enableTips: true, PromptReferenceLibrary: website.Dict};
    DataTypeJudgment = function () {
        let exception;//异常标识，0为无异常，1为有异常
        let ReturnFinalTips;//最终要返回的提示
        try {
            let coutProc = 0;
            switch (arguments.length) {
                case 0:
                    throw new Error("请传递需要判断的源数据！");
                case 1:
                    if (Object.prototype.toString.call(this.jds) === "[object Object]") {
                        for (let attrName in this.jds) {
                            switch (String(attrName).toLowerCase().toString()) {
                                case String("enableTips").toLowerCase().toString():
                                    if (Object.prototype.toString.call(this.jds[attrName]) !== "[object Boolean]") {
                                        throw new Error("enableTips属性仅能为布尔值！");
                                    }
                                    break;
                                case String("PromptReferenceLibrary").toLowerCase().toString():
                                    if (Object.prototype.toString.call(this.jds[attrName]) !== "[object Object]") {
                                        throw new Error("PromptReferenceLibrary属性仅能为对象！");
                                    }
                                    break;
                                default:
                                    throw new Error("发现未知属性，函数无法执行！");
                            }
                        }
                        coutProc = 1;
                    } else {
                        return Object.prototype.toString.call(arguments[0]);
                    }
                    break;
                case 2:
                    if (Object.prototype.toString.call(arguments[1]) !== "[object Object]") {
                        throw new Error("显示人性化提示的参数仅能为对象数据体！且对象仅支持包含enableTips、PromptReferenceLibrary属性！");
                    } else {
                        for (let attrName in arguments[1]) {
                            switch (String(attrName).toLowerCase().toString()) {
                                case String("enableTips").toLowerCase().toString():
                                    if (Object.prototype.toString.call(arguments[1][attrName]) !== "[object Boolean]") {
                                        throw new Error("enableTips属性仅能为布尔值！");
                                    }
                                    break;
                                case String("PromptReferenceLibrary").toLowerCase():
                                    if (Object.prototype.toString.call(arguments[1][attrName]) !== "[object Object]") {
                                        throw new Error("PromptReferenceLibrary属性仅能为对象！");
                                    }
                                    break;
                                default:
                                    throw new Error("发现未知属性，函数无法执行！");
                            }
                        }
                    }
                    coutProc = 2;
                    break;
                default:
                    throw new Error("传递的形参过多，该函数仅能接收要判断的源数据和是否显示人性化提示的参数！");
            }
            switch (coutProc) {
                case 1:
                    let FinalOnes = false;
                    for (let oneCount in this.jds) {
                        switch (oneCount.toLowerCase().toString()) {
                            case String("enableTips").toLowerCase().toString():
                                FinalOnes = this.jds[oneCount];
                                break;
                        }
                    }
                    if (FinalOnes) {
                        let getReturnValue = Object.prototype.toString.call(arguments[0]);
                        try {
                            for (let Rxx in this.jds) {
                                switch (String(Rxx).toLowerCase().toString()) {
                                    case String("PromptReferenceLibrary").toLowerCase().toString():
                                        ReturnFinalTips = getReturnValue.substring(8, getReturnValue.length - 1) + "." + this.jds[Rxx][getReturnValue.substring(8, getReturnValue.length - 1)];
                                        break;
                                }
                            }
                        } catch (e) {
                            ReturnFinalTips = Object.prototype.toString.call(arguments[0]);
                        }
                    } else {
                        ReturnFinalTips = Object.prototype.toString.call(arguments[0]);
                    }
                    break;
                case 2:
                    let FinalTwos = false;
                    for (let twoCount in arguments[1]) {
                        switch (twoCount.toLowerCase().toString()) {
                            case String("enableTips").toLowerCase().toString():
                                FinalTwos = arguments[1][twoCount];
                                break;
                        }
                    }
                    if (FinalTwos) {
                        let getReturnValue = Object.prototype.toString.call(arguments[0]);
                        try {
                            for (let Qxx in arguments[1]) {
                                switch (String(Qxx).toLowerCase().toString()) {
                                    case String("PromptReferenceLibrary").toLowerCase().toString():
                                        ReturnFinalTips = getReturnValue.substring(8, getReturnValue.length - 1) + "." + arguments[1][Qxx][getReturnValue.substring(8, getReturnValue.length - 1)];
                                        break;
                                }
                            }
                        } catch (e) {
                            ReturnFinalTips = Object.prototype.toString.call(arguments[0]);
                        }
                    } else {
                        ReturnFinalTips = Object.prototype.toString.call(arguments[0]);
                    }
                    break;
                default:
                    throw new Error("执行过程发生异常！");
            }
            exception = 0;
        } catch (e) {
            exception = 1;
            return (e.message);
        }
        if (exception === 0) {
            return ReturnFinalTips.split('.');
        }
    }//数据类型检测器
    ServiceBuilder = function (ServerType) {
        let webService1 = require('http');
        let webService2 = require('https');
        let FinalReturnServiceObject;
        switch (String(ServerType).toLowerCase().toString()) {
            case "http":
                FinalReturnServiceObject = webService1;
                return FinalReturnServiceObject;
            case "https":
                FinalReturnServiceObject = webService2;
                return FinalReturnServiceObject;
            default:
                console.error("本函数仅能构造http、https这两种web服务对象！");
                break;
        }
    }//服务对象构造器
    ModuleObjectBuilder = function (NodeModuleName) {
        let newModuleObject = require(NodeModuleName);
        return newModuleObject;
    }//模块对象构造器，其实可以代替服务对象构造器
    /**DefaultPage，默认的主页文件对象，可根据需要修改*/
    DefaultPage = "index.html";
    /**DefaultRootPath，默认网站根路径对象，可根据需要修改*/
    DefaultRootPath = "./website";
    /**ServicePort，默认服务器端口对象，可根据需要修改http、https的端口数值，不可更改属性名*/
    ServicePort = {http: 80, https: 443};
    /**websiteControlPoint，网站服务控制节点，不可随意操作*/
    websiteControlPoint;
    /**websiteProfileMessage，网站配置信息对象，目前暂时未能实现此功能*/
    websiteProfileMessage;
    /**EnableHttpsMode，启用HTTPS模式，默认为false，不启用。*/
    EnableHttpsMode = false;
    /**EnableHttpMode，启用HTTP模式，默认为false，不启用。*/
    EnableHttpMode = false;
    /**SSLPrivateKey、指定的SSL私钥文件路径*/
    SSLPrivateKey;
    /**SSLCertificate、指定的SSL证书文件路径*/
    SSLCertificate;
    /**ExternalImportRouter，指定导入的外部路由对象函数组*/
    ExternalImportRouter;
    /**EnableHistoryRouter，启用History路由支持，默认为false，不启用*/
    EnableHistoryRouter = false;

    webApp = this.ModuleObjectBuilder('express');
    httpMod = this.ServiceBuilder('http');
    httpsMod = this.ServiceBuilder('https');
    FileStream = this.ModuleObjectBuilder('fs');
    PathProcess = this.ModuleObjectBuilder('path');
    HistoryRouterPlugins = this.ModuleObjectBuilder('connect-history-api-fallback');

    /**RootDir为网站根目录变量，不可随意对其操作*/
    RootDir;
    /**WebSiteCore为服务关键核心，不可随意对其操作*/
    WebSiteCore;

    /**GLOBAL_EVENT为Node.JS全局捕获该模块出现未处理的异常，不可随意操作*/
    GLOBAL_EVENT = this.ModuleObjectBuilder('process');

    /**ServiceCore、服务器核心程序，仅能允许模块内部函数调用，不可随意操作*/
    ServiceCore = async function () {
        let LoadItem = "";
        let SSL = {};//SSL证书对象
        let curPort;//当前端口记录
        let PathBranch;//目录分支选择
        let FileBranch;//文件分支选择
        let ServerHandle = this;
        ServerHandle.GLOBAL_EVENT.on('uncaughtException', async (err) => {
            let errWaits = setTimeout(function () {
                console.error(`网站服务启动失败，请检查配置的数据是否正确！如需使用80、443端口，请将此脚本置于管理员(Root)模式运行！\n${err}`);
                clearTimeout(errWaits);
            }, 1000);
        });
        try {
            let extraRouterStatus = false;//外部路由已成功导入标识，默认为false，未导入路由
            if (ServerHandle.DataTypeJudgment(ServerHandle.websiteProfileMessage)[0] === "Object") {
                /**配置信息判断**/
            } else {
                if (ServerHandle.DefaultRootPath === "./website") {
                    console.warn(`websiteRootPath形参传递过来的是“${ServerHandle.DefaultRootPath}”，仅能访问模块内部的测试页。如果是明确的网站根目录位置的，请填写完整！`);
                }
                //判断启用模式
                if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHttpMode)[0] === "Boolean" && ServerHandle.DataTypeJudgment(ServerHandle.EnableHttpsMode)[0] === "Boolean") {
                    if (ServerHandle.EnableHttpMode && ServerHandle.EnableHttpsMode) {
                        LoadItem = "EnableBoth";
                    }
                    if (ServerHandle.EnableHttpMode && !ServerHandle.EnableHttpsMode) {
                        LoadItem = "onlyEnableHttp";
                    }
                    if (!ServerHandle.EnableHttpMode && ServerHandle.EnableHttpsMode) {
                        LoadItem = "onlyEnableHttps";
                    }
                    if (!ServerHandle.EnableHttpMode && !ServerHandle.EnableHttpsMode) {
                        throw new Error("http、https，必须启用一个或两个都启用！");
                    }
                } else {
                    throw new Error("EnableHttpsMode、EnableHttpsMode，这两个属性仅能为布尔值！");
                }
                //判断启用模式

                //校验是否正确导入路由
                if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter)[0] === "Object") {
                    switch (LoadItem) {
                        case "EnableBoth":
                            for (let ServerItem in ServerHandle.ExternalImportRouter) {
                                switch (String(ServerItem).toLowerCase().toString()) {
                                    case "http":
                                        if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem])[0] === "Object") {
                                            for (let httpAttrName in ServerHandle.ExternalImportRouter[ServerItem]) {
                                                if (String(httpAttrName).charAt(0) === "/") {
                                                    if ((ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem][httpAttrName])[0] !== "AsyncFunction" && ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem][httpAttrName])[0] !== "Function")) {
                                                        throw new Error("属性项内包含的值不是函数、也不是异步函数！");
                                                    }
                                                } else {
                                                    throw new Error("ExternalImportRouter属性接收到的对象内的属性名不符合要求！仅接受首字符为“/”的属性名！");
                                                }
                                            }
                                        } else {
                                            throw new Error("http属性包含的数据不是对象！");
                                        }
                                        break;
                                    case "https":
                                        if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem])[0] === "Object") {
                                            for (let httpsAttrName in ServerHandle.ExternalImportRouter[ServerItem]) {
                                                if (String(httpsAttrName).charAt(0) === "/") {
                                                    if ((ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem][httpsAttrName])[0] !== "AsyncFunction" && ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem][httpsAttrName])[0] !== "Function")) {
                                                        throw new Error("属性项内包含的值不是函数、也不是异步函数！");
                                                    }
                                                } else {
                                                    throw new Error("ExternalImportRouter属性接收到的对象内的属性名不符合要求！仅接受首字符为“/”的属性名！");
                                                }
                                            }
                                        } else {
                                            throw new Error("https属性包含的数据不是对象！");
                                        }
                                        break;
                                    case "global":
                                        if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem])[0] === "Object") {
                                            for (let globalAttrName in ServerHandle.ExternalImportRouter[ServerItem]) {
                                                if (String(globalAttrName).charAt(0) === "/") {
                                                    if ((ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem][globalAttrName])[0] !== "AsyncFunction" && ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[ServerItem][globalAttrName])[0] !== "Function")) {
                                                        throw new Error("属性项内包含的值不是函数、也不是异步函数！");
                                                    }
                                                } else {
                                                    throw new Error("ExternalImportRouter属性接收到的对象内的属性名不符合要求！仅接受首字符为“/”的属性名！");
                                                }
                                            }
                                        } else {
                                            throw new Error("https属性包含的数据不是对象！");
                                        }
                                        break;
                                    default:
                                        throw new Error("出现未知的属性！ExternalImportRouter属性在http、https都启用的情况下仅支持只包含（http、https、global）三个属性的对象！");
                                }
                            }
                            break;
                        case"onlyEnableHttp":
                            for (let onlyHttpAttrName in ServerHandle.ExternalImportRouter) {
                                if (String(onlyHttpAttrName).toLowerCase().toString() === "https" || String(onlyHttpAttrName).toLowerCase().toString() === "global") {
                                    console.warn(`${onlyHttpAttrName} 属性在http、https都启用的状态下需要，在仅启用http模式下已经不需要了！`);
                                    continue;
                                } else if (String(onlyHttpAttrName).toLowerCase().toString() === "http") {
                                    if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpAttrName])[0] === "Object") {
                                        for (let chkHttpRouter in ServerHandle.ExternalImportRouter[onlyHttpAttrName]) {
                                            if (String(chkHttpRouter).charAt(0) === "/") {
                                                if ((ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpAttrName][chkHttpRouter])[0] !== "AsyncFunction" && ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpAttrName][chkHttpRouter])[0] !== "Function")) {
                                                    throw new Error("属性项内包含的值不是函数、也不是异步函数！");
                                                }
                                            } else {
                                                throw new Error("ExternalImportRouter属性接收到的对象内的属性名不符合要求！仅接受首字符为“/”的属性名！");
                                            }
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性接收到的对象包含的http属性并不是对象！");
                                    }
                                } else {
                                    if (String(onlyHttpAttrName).charAt(0) === "/") {
                                        if ((ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpAttrName])[0] !== "AsyncFunction" && ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpAttrName])[0] !== "Function")) {
                                            throw new Error("属性项内包含的值不是函数、也不是异步函数！");
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性接收到的对象内的属性名不符合要求！仅接受首字符为“/”的属性名！");
                                    }
                                }
                            }
                            break;
                        case "onlyEnableHttps":
                            for (let onlyHttpsAttrName in ServerHandle.ExternalImportRouter) {
                                if (String(onlyHttpsAttrName).toLowerCase().toString() === "http" || String(onlyHttpsAttrName).toLowerCase().toString() === "global") {
                                    console.warn(`${onlyHttpsAttrName} 属性在http、https都启用的状态下需要，在仅启用https模式下已经不需要了！`);
                                    continue;
                                } else if (String(onlyHttpsAttrName).toLowerCase().toString() === "https") {
                                    if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpsAttrName])[0] === "Object") {
                                        for (let chkHttpsRouter in ServerHandle.ExternalImportRouter[onlyHttpsAttrName]) {
                                            if (String(chkHttpsRouter).charAt(0) === "/") {
                                                if ((ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpsAttrName][chkHttpsRouter])[0] !== "AsyncFunction" && ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpsAttrName][chkHttpsRouter])[0] !== "Function")) {
                                                    throw new Error("属性项内包含的值不是函数、也不是异步函数！");
                                                }
                                            } else {
                                                throw new Error("ExternalImportRouter属性接收到的对象内的属性名不符合要求！仅接受首字符为“/”的属性名！");
                                            }
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性接收到的对象包含的https属性并不是对象！");
                                    }
                                } else {
                                    if (String(onlyHttpsAttrName).charAt(0) === "/") {
                                        if ((ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpsAttrName])[0] !== "AsyncFunction" && ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[onlyHttpsAttrName])[0] !== "Function")) {
                                            throw new Error("属性项内包含的值不是函数、也不是异步函数！");
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性接收到的对象内的属性名不符合要求！仅接受首字符为“/”的属性名！");
                                    }
                                }
                            }
                            break;
                    }
                    extraRouterStatus = true;
                } else if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter)[0] !== "Undefined") {
                    throw new Error("ExternalImportRouter属性仅支持对象数据导入！");
                }
                //校验是否正确导入路由
                if (ServerHandle.DataTypeJudgment(ServerHandle.DefaultRootPath)[0] === "Object") {
                    for (let DirPath in ServerHandle.DefaultRootPath) {
                        switch (String(DirPath).toLowerCase().toString()) {
                            case "http":
                                if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[DirPath])) {
                                    throw new Error("http属性指定的路径无效！");
                                }
                                break;
                            case "https":
                                if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[DirPath])) {
                                    throw new Error("https属性指定的路径无效！");
                                }
                                break;
                            default:
                                throw new Error("出现未知的属性，DefaultRootPath支持仅包含http、https这两个属性的对象！");
                        }
                    }
                    PathBranch = "multi";
                } else if (ServerHandle.DataTypeJudgment(ServerHandle.DefaultRootPath)[0] === "String") {
                    if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                        throw new Error("http属性指定的路径无效！");
                    }
                    PathBranch = "single";
                } else {
                    throw new Error("DefaultRootPath属性仅能接收对象或字符串！");
                }
                if (ServerHandle.DataTypeJudgment(ServerHandle.DefaultPage)[0] === "Object") {
                    for (let DefaultFileName in ServerHandle.DefaultPage) {
                        switch (String(DefaultFileName).toLowerCase().toString()) {
                            case "http":
                                if (ServerHandle.DataTypeJudgment(ServerHandle.DefaultPage[DefaultFileName])[0] !== "String") {
                                    throw new Error("http属性仅能为字符串内容！");
                                }
                                break;
                            case "https":
                                if (ServerHandle.DataTypeJudgment(ServerHandle.DefaultPage[DefaultFileName])[0] !== "String") {
                                    throw new Error("https属性仅能为字符串内容！");
                                }
                                break;
                            default:
                                throw new Error("出现未知的属性，DefaultPage支持仅包含http、https这两个属性的对象！");
                        }
                    }
                    FileBranch = "multi";
                } else if (ServerHandle.DataTypeJudgment(ServerHandle.DefaultPage)[0] === "String") {
                    FileBranch = "single";
                } else {
                    throw new Error("DefaultPage属性仅能接收对象或字符串！");
                }
                switch (LoadItem) {
                    case "EnableBoth":
                        ServerHandle.websiteControlPoint = [];
                        if (PathBranch === "multi") {
                            ServerHandle.RootDir = [];
                        }
                        if (PathBranch === "multi" && FileBranch === "multi") {
                            for (let PathChk1 in ServerHandle.DefaultRootPath) {
                                switch (String(PathChk1).toLowerCase().toString()) {
                                    case "http":
                                        for (let FileChk1 in ServerHandle.DefaultPage) {
                                            switch (String(FileChk1).toLowerCase().toString()) {
                                                case "http":
                                                    if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[PathChk1])) {
                                                        throw new Error("你指定的http网站根目录无效！");
                                                    }
                                                    if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[PathChk1], ServerHandle.DefaultPage[FileChk1]))) {
                                                        throw new Error("指定的默认文件不存在指定的http网站根目录中！");
                                                    }
                                                    ServerHandle.RootDir[0] = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[PathChk1], {index: ServerHandle.DefaultPage[FileChk1]});
                                                    ServerHandle.websiteControlPoint[0] = ServerHandle.webApp();
                                                    if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                                                        switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                                            case "Object":
                                                                for (let onlyEnableHttpAttr in ServerHandle.EnableHistoryRouter) {
                                                                    if (String(onlyEnableHttpAttr).toLowerCase().toString() !== "http") {
                                                                        continue;
                                                                    }
                                                                    if (String(onlyEnableHttpAttr).toLowerCase().toString() === "http") {
                                                                        if (ServerHandle.EnableHistoryRouter[onlyEnableHttpAttr]) {
                                                                            ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                                                        }
                                                                    }
                                                                }
                                                                break;
                                                            case "Boolean":
                                                                if (ServerHandle.EnableHistoryRouter) {
                                                                    ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                                                }//启用历史路由
                                                                break;
                                                        }
                                                    } else {
                                                        throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                                                    }
                                                    ServerHandle.websiteControlPoint[0].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                                                    ServerHandle.websiteControlPoint[0].use(ServerHandle.RootDir[0]);
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                        break;
                                    case "https":
                                        for (let FileChk2 in ServerHandle.DefaultPage) {
                                            switch (String(FileChk2).toLowerCase().toString()) {
                                                case "https":
                                                    if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[PathChk1])) {
                                                        throw new Error("你指定的https网站根目录无效！");
                                                    }
                                                    if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[PathChk1], ServerHandle.DefaultPage[FileChk2]))) {
                                                        throw new Error("指定的默认文件不存在指定的https网站根目录中！");
                                                    }
                                                    ServerHandle.RootDir[1] = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[PathChk1], {index: ServerHandle.DefaultPage[FileChk2]});
                                                    ServerHandle.websiteControlPoint[1] = ServerHandle.webApp();
                                                    if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                                                        switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                                            case "Object":
                                                                for (let onlyEnableHttpsAttr in ServerHandle.EnableHistoryRouter) {
                                                                    if (String(onlyEnableHttpsAttr).toLowerCase().toString() !== "https") {
                                                                        continue;
                                                                    }
                                                                    if (String(onlyEnableHttpsAttr).toLowerCase().toString() === "https") {
                                                                        if (ServerHandle.EnableHistoryRouter[onlyEnableHttpsAttr]) {
                                                                            ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                                                        }
                                                                    }
                                                                }
                                                                break;
                                                            case "Boolean":
                                                                if (ServerHandle.EnableHistoryRouter) {
                                                                    ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                                                }//启用历史路由
                                                                break;
                                                        }
                                                    } else {
                                                        throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                                                    }
                                                    ServerHandle.websiteControlPoint[1].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                                                    ServerHandle.websiteControlPoint[1].use(ServerHandle.RootDir[1]);
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "multi" && FileBranch === "single") {
                            for (let PathChk2 in ServerHandle.DefaultRootPath) {
                                switch (String(PathChk2).toLowerCase().toString()) {
                                    case "http":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[PathChk2])) {
                                            throw new Error("你指定的http网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[PathChk2], ServerHandle.DefaultPage))) {
                                            throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                                        }
                                        ServerHandle.RootDir[0] = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[PathChk2], {index: ServerHandle.DefaultPage});
                                        ServerHandle.websiteControlPoint[0] = ServerHandle.webApp();
                                        if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                                            switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                                case "Object":
                                                    for (let onlyEnableHttpAttr in ServerHandle.EnableHistoryRouter) {
                                                        if (String(onlyEnableHttpAttr).toLowerCase().toString() !== "http") {
                                                            continue;
                                                        }
                                                        if (String(onlyEnableHttpAttr).toLowerCase().toString() === "http") {
                                                            if (ServerHandle.EnableHistoryRouter[onlyEnableHttpAttr]) {
                                                                ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case "Boolean":
                                                    if (ServerHandle.EnableHistoryRouter) {
                                                        ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                                    }//启用历史路由
                                                    break;
                                            }
                                        } else {
                                            throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                                        }
                                        ServerHandle.websiteControlPoint[0].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                                        ServerHandle.websiteControlPoint[0].use(ServerHandle.RootDir[0]);
                                        break;
                                    case "https":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[PathChk2])) {
                                            throw new Error("你指定的https网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[PathChk2], ServerHandle.DefaultPage))) {
                                            throw new Error("你指定的默认文件在指定的https网站根目录中不存在！");
                                        }
                                        ServerHandle.RootDir[1] = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[PathChk2], {index: ServerHandle.DefaultPage});
                                        ServerHandle.websiteControlPoint[1] = ServerHandle.webApp();
                                        if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                                            switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                                case "Object":
                                                    for (let onlyEnableHttpsAttr in ServerHandle.EnableHistoryRouter) {
                                                        if (String(onlyEnableHttpsAttr).toLowerCase().toString() !== "https") {
                                                            continue;
                                                        }
                                                        if (String(onlyEnableHttpsAttr).toLowerCase().toString() === "https") {
                                                            if (ServerHandle.EnableHistoryRouter[onlyEnableHttpsAttr]) {
                                                                ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case "Boolean":
                                                    if (ServerHandle.EnableHistoryRouter) {
                                                        ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                                    }//启用历史路由
                                                    break;
                                            }
                                        } else {
                                            throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                                        }
                                        ServerHandle.websiteControlPoint[1].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                                        ServerHandle.websiteControlPoint[1].use(ServerHandle.RootDir[1]);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "single" && FileBranch === "multi") {
                            for (let FileChk3 in ServerHandle.DefaultPage) {
                                switch (String(FileChk3).toLowerCase().toString()) {
                                    case "http":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                                            throw new Error("你指定的http网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath, ServerHandle.DefaultPage[FileChk3]))) {
                                            throw new Error("你指定的默认文件在指定的http网站根目录不存在！");
                                        }
                                        ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage[FileChk3]});
                                        ServerHandle.websiteControlPoint[0] = ServerHandle.webApp();
                                        if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                                            switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                                case "Object":
                                                    for (let onlyEnableHttpAttr in ServerHandle.EnableHistoryRouter) {
                                                        if (String(onlyEnableHttpAttr).toLowerCase().toString() !== "http") {
                                                            continue;
                                                        }
                                                        if (String(onlyEnableHttpAttr).toLowerCase().toString() === "http") {
                                                            if (ServerHandle.EnableHistoryRouter[onlyEnableHttpAttr]) {
                                                                ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case "Boolean":
                                                    if (ServerHandle.EnableHistoryRouter) {
                                                        ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                                    }//启用历史路由
                                                    break;
                                            }
                                        } else {
                                            throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                                        }
                                        ServerHandle.websiteControlPoint[0].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                                        ServerHandle.websiteControlPoint[0].use(ServerHandle.RootDir);
                                        break;
                                    case "https":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                                            throw new Error("你指定的https网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath, ServerHandle.DefaultPage[FileChk3]))) {
                                            throw new Error("你指定的默认文件在指定的https网站根目录不存在！");
                                        }
                                        ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage[FileChk3]});
                                        ServerHandle.websiteControlPoint[1] = ServerHandle.webApp();
                                        if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                                            switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                                case "Object":
                                                    for (let onlyEnableHttpsAttr in ServerHandle.EnableHistoryRouter) {
                                                        if (String(onlyEnableHttpsAttr).toLowerCase().toString() !== "https") {
                                                            continue;
                                                        }
                                                        if (String(onlyEnableHttpsAttr).toLowerCase().toString() === "https") {
                                                            if (ServerHandle.EnableHistoryRouter[onlyEnableHttpsAttr]) {
                                                                ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case "Boolean":
                                                    if (ServerHandle.EnableHistoryRouter) {
                                                        ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                                    }//启用历史路由
                                                    break;
                                            }
                                        } else {
                                            throw new Error("EnableHistoryRouter属性在仅启用https模式下只支持只包含https个属性名的对象或布尔值！http和未知的属性将被忽略！");
                                        }
                                        ServerHandle.websiteControlPoint[1].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                                        ServerHandle.websiteControlPoint[1].use(ServerHandle.RootDir);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "single" && FileBranch === "single") {
                            ServerHandle.RootDir = [];
                            if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                                throw new Error("你指定的网站根目录不存在！");
                            }
                            if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath, ServerHandle.DefaultPage))) {
                                throw new Error("你指定的默认文件在指定的网站根目录中不存在！");
                            }
                            ServerHandle.websiteControlPoint[0] = ServerHandle.webApp();
                            ServerHandle.websiteControlPoint[1] = ServerHandle.webApp();
                            if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                                switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                    case "Object":
                                        for (let onlyEnableHistoryAttr in ServerHandle.EnableHistoryRouter) {
                                            if (String(onlyEnableHistoryAttr).toLowerCase().toString() === "https") {
                                                if (ServerHandle.EnableHistoryRouter[onlyEnableHistoryAttr]) {
                                                    ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                                }
                                            }
                                            if (String(onlyEnableHistoryAttr).toLowerCase().toString() === "http") {
                                                if (ServerHandle.EnableHistoryRouter[onlyEnableHistoryAttr]) {
                                                    ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                                }
                                            }
                                        }
                                        break;
                                    case "Boolean":
                                        if (ServerHandle.EnableHistoryRouter) {
                                            ServerHandle.websiteControlPoint[0].use(ServerHandle.HistoryRouterPlugins());
                                            ServerHandle.websiteControlPoint[1].use(ServerHandle.HistoryRouterPlugins());
                                        }//启用历史路由
                                        break;
                                }
                            } else {
                                throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                            }
                            ServerHandle.RootDir[0] = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage});
                            ServerHandle.RootDir[1] = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage});
                            ServerHandle.websiteControlPoint[0].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                            ServerHandle.websiteControlPoint[0].use(ServerHandle.RootDir[0]);
                            ServerHandle.websiteControlPoint[1].use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                            ServerHandle.websiteControlPoint[1].use(ServerHandle.RootDir[1]);
                        }
                        if (extraRouterStatus) {
                            for (let webServiceType in ServerHandle.ExternalImportRouter) {
                                switch (String(webServiceType).toLowerCase().toString()) {
                                    case "http":
                                        for (let httpBindAttrName in ServerHandle.ExternalImportRouter[webServiceType]) {
                                            ServerHandle.websiteControlPoint[0].use(httpBindAttrName, ServerHandle.ExternalImportRouter[webServiceType][httpBindAttrName]);
                                        }
                                        break;
                                    case "https":
                                        for (let httpsBindAttrName in ServerHandle.ExternalImportRouter[webServiceType]) {
                                            ServerHandle.websiteControlPoint[1].use(httpsBindAttrName, ServerHandle.ExternalImportRouter[webServiceType][httpsBindAttrName]);
                                        }
                                        break;
                                    case "global":
                                        for (let globalBindAttrName in ServerHandle.ExternalImportRouter[webServiceType]) {
                                            ServerHandle.websiteControlPoint[0].use(globalBindAttrName, ServerHandle.ExternalImportRouter[webServiceType][globalBindAttrName]);
                                            ServerHandle.websiteControlPoint[1].use(globalBindAttrName, ServerHandle.ExternalImportRouter[webServiceType][globalBindAttrName]);
                                        }
                                        break;
                                }
                            }
                        }//导入外部路由
                        //SSL证书
                        if (ServerHandle.FileStream.existsSync(ServerHandle.SSLPrivateKey)) {
                            SSL.key = ServerHandle.FileStream.readFileSync(ServerHandle.SSLPrivateKey, "utf-8");
                        } else {
                            throw new Error("请指定正确的SSL私钥文件全路径！");
                        }
                        if (ServerHandle.FileStream.existsSync(ServerHandle.SSLCertificate)) {
                            SSL.cert = ServerHandle.FileStream.readFileSync(ServerHandle.SSLCertificate, "utf-8");
                        } else {
                            throw new Error("请指定正确的SSL证书文件全路径！");
                        }
                        //SSL证书
                        ServerHandle.WebSiteCore = [];
                        ServerHandle.WebSiteCore[0] = ServerHandle.httpMod.createServer(ServerHandle.websiteControlPoint[0]);
                        ServerHandle.WebSiteCore[1] = ServerHandle.httpsMod.createServer(SSL, ServerHandle.websiteControlPoint[1]);
                        let httpServicePort = ServerHandle.ServicePort.http;
                        let httpsServicePort = ServerHandle.ServicePort.https;
                        ServerHandle.WebSiteCore[0].listen(httpServicePort, function () {
                            console.log(`协议：http，端口号：${httpServicePort}`);
                        });
                        ServerHandle.WebSiteCore[1].listen(httpsServicePort, function () {
                            console.log(`协议：https，端口号：${httpsServicePort}`);
                        });
                        console.log("网站服务器模块启动成功。");
                        break;
                    case "onlyEnableHttp":
                        if (PathBranch === "multi" && FileBranch === "multi") {
                            for (let rhp in ServerHandle.DefaultRootPath) {
                                let plm = String(rhp).toLowerCase().toString();
                                switch (plm) {
                                    case "http":
                                        for (let zxx in ServerHandle.DefaultPage) {
                                            if (plm === String(zxx).toLowerCase().toString()) {
                                                if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[rhp])) {
                                                    throw new Error("你指定的http网站根目录不存在！");
                                                }
                                                if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[rhp], ServerHandle.DefaultPage[zxx]))) {
                                                    throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                                                }
                                                ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[plm], {index: ServerHandle.DefaultPage[zxx]});
                                            }
                                        }
                                        break;
                                    default:
                                        console.warn(`${rhp}属性在仅启用http模式下不需要用到的。`);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "multi" && FileBranch === "single") {
                            for (let rhp in ServerHandle.DefaultRootPath) {
                                let plm = String(rhp).toLowerCase().toString();
                                switch (plm) {
                                    case "http":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[rhp])) {
                                            throw new Error("你指定的http网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[rhp], ServerHandle.DefaultPage))) {
                                            throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                                        }
                                        ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[plm], {index: ServerHandle.DefaultPage});
                                        break;
                                    default:
                                        console.warn(`${rhp}属性在仅启用http模式下不需要用到的。`);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "single" && FileBranch === "multi") {
                            for (let rhp in ServerHandle.DefaultPage) {
                                let plm = String(rhp).toLowerCase().toString();
                                switch (plm) {
                                    case "http":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                                            throw new Error("你指定的http网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath, ServerHandle.DefaultPage[rhp]))) {
                                            throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                                        }
                                        ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage[rhp]});
                                        break;
                                    default:
                                        console.warn(`${rhp}属性在仅启用http模式下不需要用到的。`);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "single" && FileBranch === "single") {
                            if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                                throw new Error("你指定的http网站根目录不存在！");
                            }
                            if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath, ServerHandle.DefaultPage))) {
                                throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                            }
                            ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage});
                        }
                        ServerHandle.websiteControlPoint = ServerHandle.webApp();
                        if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                            switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                case "Object":
                                    for (let onlyEnableHttpAttr in ServerHandle.EnableHistoryRouter) {
                                        if (String(onlyEnableHttpAttr).toLowerCase().toString() !== "http") {
                                            continue;
                                        }
                                        if (String(onlyEnableHttpAttr).toLowerCase().toString() === "http") {
                                            if (ServerHandle.EnableHistoryRouter[onlyEnableHttpAttr]) {
                                                ServerHandle.websiteControlPoint.use(ServerHandle.HistoryRouterPlugins());
                                            }
                                        }
                                    }
                                    break;
                                case "Boolean":
                                    if (ServerHandle.EnableHistoryRouter) {
                                        ServerHandle.websiteControlPoint.use(ServerHandle.HistoryRouterPlugins());
                                    }//启用历史路由
                                    break;
                            }
                        } else {
                            throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                        }
                        ServerHandle.websiteControlPoint.use(ServerHandle.RootDir);
                        ServerHandle.websiteControlPoint.use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                        if (extraRouterStatus) {
                            for (let importName in ServerHandle.ExternalImportRouter) {
                                if (String(importName).toLowerCase().toString() === "https") {
                                    continue;
                                }
                                if (String(importName).toLowerCase().toString() === "http") {
                                    if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[importName])[0] === "Object") {
                                        for (let bindHttpRouter in ServerHandle.ExternalImportRouter[importName]) {
                                            ServerHandle.websiteControlPoint.use(bindHttpRouter, ServerHandle.ExternalImportRouter[importName][bindHttpRouter]);
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性内的子属性http包含的数据不是对象！");
                                    }
                                } else if (String().toLowerCase().toString() === "global") {
                                    if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[importName])[0] === "Object") {
                                        for (let bindHttpRouter in ServerHandle.ExternalImportRouter[importName]) {
                                            ServerHandle.websiteControlPoint.use(bindHttpRouter, ServerHandle.ExternalImportRouter[importName][bindHttpRouter]);
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性内的子属性global包含的数据不是对象！");
                                    }
                                } else {
                                    ServerHandle.websiteControlPoint.use(importName, ServerHandle.ExternalImportRouter[importName]);
                                }
                            }
                        }//外部路由导入
                        ServerHandle.WebSiteCore = ServerHandle.httpMod.createServer(ServerHandle.websiteControlPoint);
                        curPort = ServerHandle.ServicePort.http;
                        ServerHandle.WebSiteCore.listen(curPort, function () {
                            console.log(`网站服务器模块启动成功。协议：http，端口号：${curPort}`);
                        });
                        break;
                    case "onlyEnableHttps":
                        if (ServerHandle.FileStream.existsSync(ServerHandle.SSLPrivateKey)) {
                            SSL.key = ServerHandle.FileStream.readFileSync(ServerHandle.SSLPrivateKey, "utf-8");
                        } else {
                            throw new Error("请指定正确的SSL私钥文件全路径！");
                        }
                        if (ServerHandle.FileStream.existsSync(ServerHandle.SSLCertificate)) {
                            SSL.cert = ServerHandle.FileStream.readFileSync(ServerHandle.SSLCertificate, "utf-8");
                        } else {
                            throw new Error("请指定正确的SSL证书文件全路径！");
                        }
                        if (PathBranch === "multi" && FileBranch === "multi") {
                            for (let rhp in ServerHandle.DefaultRootPath) {
                                let plm = String(rhp).toLowerCase().toString();
                                switch (plm) {
                                    case "https":
                                        for (let zxx in ServerHandle.DefaultPage) {
                                            if (plm === String(zxx).toLowerCase().toString()) {
                                                if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[rhp])) {
                                                    throw new Error("你指定的http网站根目录不存在！");
                                                }
                                                if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[rhp], ServerHandle.DefaultPage[zxx]))) {
                                                    throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                                                }
                                                ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[plm], {index: ServerHandle.DefaultPage[zxx]});
                                            }
                                        }
                                        break;
                                    default:
                                        console.warn(`${rhp}属性在仅启用https模式下不需要用到的。`);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "multi" && FileBranch === "single") {
                            for (let rhp in ServerHandle.DefaultRootPath) {
                                let plm = String(rhp).toLowerCase().toString();
                                switch (plm) {
                                    case "https":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath[rhp])) {
                                            throw new Error("你指定的http网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath[rhp], ServerHandle.DefaultPage))) {
                                            throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                                        }
                                        ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath[plm], {index: ServerHandle.DefaultPage});
                                        break;
                                    default:
                                        console.warn(`${rhp}属性在仅启用https模式下不需要用到的。`);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "single" && FileBranch === "multi") {
                            for (let rhp in ServerHandle.DefaultPage) {
                                let plm = String(rhp).toLowerCase().toString();
                                switch (plm) {
                                    case "https":
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                                            throw new Error("你指定的http网站根目录不存在！");
                                        }
                                        if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath, ServerHandle.DefaultPage[rhp]))) {
                                            throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                                        }
                                        ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage[rhp]});
                                        break;
                                    default:
                                        console.warn(`${rhp}属性在仅启用https模式下不需要用到的。`);
                                        break;
                                }
                            }
                        }
                        if (PathBranch === "single" && FileBranch === "single") {
                            if (!ServerHandle.FileStream.existsSync(ServerHandle.DefaultRootPath)) {
                                throw new Error("你指定的http网站根目录不存在！");
                            }
                            if (!ServerHandle.FileStream.existsSync(ServerHandle.PathProcess.join(ServerHandle.DefaultRootPath, ServerHandle.DefaultPage))) {
                                throw new Error("你指定的默认文件在指定的http网站根目录中不存在！");
                            }
                            ServerHandle.RootDir = ServerHandle.webApp.static(ServerHandle.DefaultRootPath, {index: ServerHandle.DefaultPage});
                        }
                        ServerHandle.websiteControlPoint = ServerHandle.webApp();
                        if (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Object" || ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0] === "Boolean") {
                            switch (ServerHandle.DataTypeJudgment(ServerHandle.EnableHistoryRouter)[0]) {
                                case "Object":
                                    for (let onlyEnableHttpsAttr in ServerHandle.EnableHistoryRouter) {
                                        if (String(onlyEnableHttpsAttr).toLowerCase().toString() !== "https") {
                                            continue;
                                        }
                                        if (String(onlyEnableHttpsAttr).toLowerCase().toString() === "https") {
                                            if (ServerHandle.EnableHistoryRouter[onlyEnableHttpsAttr]) {
                                                ServerHandle.websiteControlPoint.use(ServerHandle.HistoryRouterPlugins());
                                            }
                                        }
                                    }
                                    break;
                                case "Boolean":
                                    if (ServerHandle.EnableHistoryRouter) {
                                        ServerHandle.websiteControlPoint.use(ServerHandle.HistoryRouterPlugins());
                                    }//启用历史路由
                                    break;
                            }
                        } else {
                            throw new Error("EnableHistoryRouter属性在仅启用http模式下只支持只包含http个属性名的对象或布尔值！https和未知的属性将被忽略！");
                        }
                        ServerHandle.websiteControlPoint.use(ServerHandle.RootDir);
                        ServerHandle.websiteControlPoint.use(ServerHandle.webApp.json(), ServerHandle.webApp.urlencoded({extended: true}));
                        if (extraRouterStatus) {
                            for (let importName in ServerHandle.ExternalImportRouter) {
                                if (String(importName).toLowerCase().toString() === "http") {
                                    continue;
                                } else if (String(importName).toLowerCase().toString() === "https") {
                                    if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[importName])[0] === "Object") {
                                        for (let bindHttpsRouter in ServerHandle.ExternalImportRouter[importName]) {
                                            ServerHandle.websiteControlPoint.use(bindHttpsRouter, ServerHandle.ExternalImportRouter[importName][bindHttpsRouter]);
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性内的子属性https包含的数据不是对象！");
                                    }
                                } else if (String(importName).toLowerCase().toString() === "global") {
                                    if (ServerHandle.DataTypeJudgment(ServerHandle.ExternalImportRouter[importName])[0] === "Object") {
                                        for (let bindHttpsRouter in ServerHandle.ExternalImportRouter[importName]) {
                                            ServerHandle.websiteControlPoint.use(bindHttpsRouter, ServerHandle.ExternalImportRouter[importName][bindHttpsRouter]);
                                        }
                                    } else {
                                        throw new Error("ExternalImportRouter属性内的子属性global包含的数据不是对象！");
                                    }
                                } else {
                                    ServerHandle.websiteControlPoint.use(importName, ServerHandle.ExternalImportRouter[importName]);
                                }
                            }
                        }//外部路由导入
                        ServerHandle.WebSiteCore = ServerHandle.httpsMod.createServer(SSL, ServerHandle.websiteControlPoint);
                        curPort = ServerHandle.ServicePort.https;
                        ServerHandle.WebSiteCore.listen(curPort, function () {
                            console.log(`网站服务器模块启动成功。协议：https，端口号：${curPort}`);
                        });
                        break;
                }
            }
        } catch (e) {
            console.error(e.message);
        }
    }
    /**openService，用于启动web网站服务，调用此函数之前，配置好相应的配置信息*/
    openService = async function () {
        console.log("已发出服务器启动指令！");
        await this.ServiceCore();
    }
    /**closeService，用于停止web网站服务，仅能停止自身所在web网站服务实例，无需任何参数*/
    closeService = async function () {
        console.log("已发出服务器停止指令！");
        this.WebSiteCore.close(function (err) {
            if (!err) {
                console.log("网站服务器模块已经停止。");
            }
        });
    }
}

module.exports = website;