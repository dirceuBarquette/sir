var buildGraph = function () {
    var p = getParams();
    var dataCalc = sirCalc2 (p.poptot, p.rzero, p.illtime, p.i0, p.tmax, p.dt);
    config.data.labels = dataCalc.time;
    config.data.datasets = [
        {
            label: "Sucetíveis",
            backgroundColor: 'rgb(255, 255, 0)',
            borderColor: 'rgb(255, 255, 0)',
            hidden: false,
            data: dataCalc.sval,
            fill: false
        },
        {
            label: "Infectados",
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: 'rgb(255, 0, 0)',
            hidden: false,
            data: dataCalc.ival,
            fill: false
        },
        {
            label: "Removidos",
            backgroundColor: 'rgb(0, 255, 64)',
            borderColor: 'rgb(0, 255, 64)',
            hidden: false,
            data: dataCalc.rval,
            fill: false
        },  
        {   
            label: "di/dt",
            backgroundColor: 'rgb(102, 0, 204)',
            borderColor: 'rgb(102, 0, 204)',
            data: dataCalc.didt,
            hidden: true,
            fill: false
        }
    ];

    window.myLine.update();

    buildTDebug (dataCalc);

    enableDisableds();
}
var enableDisableds = function () {
    document.getElementById("debugMode").disabled = false;
    document.getElementById("derivada").disabled = false;
}
var showDerivada = function () {
    let dtsts = config.data;
    let elem2 = document.getElementById("derivada");
    elem2.addEventListener("click", function(){
        if (elem2.checked) {
            dtsts.datasets[0].hidden = dtsts.datasets[1].hidden = dtsts.datasets[2].hidden = true;
            dtsts.datasets[3].hidden = false;
        } else {
            dtsts.datasets[0].hidden = dtsts.datasets[1].hidden = dtsts.datasets[2].hidden = false;
            dtsts.datasets[3].hidden = true;
        }
        window.myLine.update();
    })
}
var getParams = function () {
    var obj = {};
    obj.dt = 1;
	obj.poptot = document.getElementById("poptot").value;
	obj.rzero = document.getElementById("rzero").value;
	obj.illtime = document.getElementById("illtime").value;
	obj.i0 = document.getElementById("i0").value;
    obj.tmax = document.getElementById("dias").value;
    
    return obj;
}

var buildTDebug = function (dataCalc) {
    document.getElementById("Tdebug").innerHTML = '';
    let element = document.getElementById("Tdebug");
    for(let i = dataCalc.time[0]; i < dataCalc.time.length;i++) {
        var total = dataCalc.sval[i] + dataCalc.ival[i] + dataCalc.rval[i];
        var tr = document.createElement("tr");
        var td_D = document.createElement("td");
        var node_D = document.createTextNode(dataCalc.time[i]);
        td_D.appendChild(node_D);
        tr.appendChild(td_D);
        var td_S = document.createElement("td");
        var node_S = document.createTextNode(dataCalc.sval[i]);
        td_S.appendChild(node_S);
        tr.appendChild(td_S);
        var td_I = document.createElement("td");
        var node_I = document.createTextNode(dataCalc.ival[i]);
        td_I.appendChild(node_I);
        tr.appendChild(td_I);
        var td_R = document.createElement("td");
        var node_R = document.createTextNode(dataCalc.rval[i]);
        td_R.appendChild(node_R);
        tr.appendChild(td_R);
        var td_T = document.createElement("td");
        var node_T = document.createTextNode(total);
        td_T.appendChild(node_T);
        tr.appendChild(td_T);
        element.appendChild(tr);
    }    
}

var debugMode = function () {
    let elem = document.getElementById("debugMode");
    elem.addEventListener("click", function(){
        if (elem.checked) {
            document.getElementById("Tdebug").style.display = "block";
        } else {
            document.getElementById("Tdebug").style.display = "none";
        }
    })
}
