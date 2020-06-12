var sirCalc2 = function (poptot, rzero, illtime, i0, tmax, dt) {
    var obj = {};
    //parameter calculations
    var b = 1 / illtime;
    var a = b * rzero;

    //inicializations
    var sval = (poptot - i0) / poptot;
    var ival = i0 / poptot;
    var rval = 0;
    var nmax = tmax / dt;

    //first data written in the output file:
    var normtot = sval + ival + rval;
    var time = 0;
    var didt = 0;

    obj.time = [time];
     obj.sval = [sval] ;
     obj.ival = [ival] ;
    obj.rval = [rval]; obj.didt = [didt];
    obj.normtot = [normtot];

    var sval0, ival0;
    for (let i = 1; i <= nmax; i++) {
        sval0 = sval; // aux variable
        ival0 = ival; // aux variable
        sval = sval - a*sval0*ival0*dt;
        didt = ival0*(a*sval0 - b)*dt; // derivate of i(t)
        ival = ival + ival0*(a*sval0 -b)*dt;
        rval = rval + b*ival0*dt;
        rval = 1 - (sval + ival);
        normtot = sval + ival + rval;
        time = time+dt;
        obj.time[i] = time; obj.sval[i] = sval;
        obj.ival[i] = ival; obj.rval[i] = rval;
        obj.didt[i] = didt; obj.normtot[i] = normtot;
    }

    return obj;

}