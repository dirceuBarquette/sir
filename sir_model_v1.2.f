       program sir_model
C#########################################################
C Euler's method for solving SIR Model (non linear ODEs)
C author: Bernardo M. Tavares
C last update:   04.21.2020 06:23 PM (BRT)
C Code version: 1.1
C#########################################################

c##### Declaring variables and parameters:                                                             
       implicit none
       integer i, nmax
       double precision a,b,sval,ival,rval,dt, s0, i0, r0, illtime,
     $      sval0, ival0
       double precision time, t0, normtot, poptot, tmax, rzero, didt 
       

c----- calculation step:
       parameter(dt=1.d0)

c###### reading input parameters 
       write(*,*)'*** welcome to SIR model for epidemics ***'
       write(*,*)'Enter the total population'
       read(*,*)poptot
       write(*,*)'enter R0 estimate:'
       read(*,*)rzero
       write(*,*)'Enter the average ilness time (infection+incubation) 
     $ in days'
       read(*,*)illtime
       write(*,*)'enter the initial number of infected people:'
       read(*,*)i0
       write(*,*)'enter the maximum time for the calculation (in days):'
       read(*,*)tmax

C##### parameter calculations:
       b = 1/illtime
       a = b*rzero

C###### output definitions:
       open(80,file='sir_output.dat')
 1000  format(6f10.5)

C###### calculations:

c------initializations:
       sval = (poptot-i0)/poptot
       ival = i0/poptot
       rval = 0.d0
       nmax = int(tmax/dt)

c----- first data written in the output file: 
       normtot = sval + ival + rval
       time = 0.d0
       didt = 0.d0 !!just initializationq
       write(80,1000) time, sval, ival, rval, didt, normtot
c      write(*,*) time, sval, ival, rval, normtot

c----- loop:
       do i=1,nmax
          sval0=sval !! aux variable
          ival0=ival !! aux variable
          sval = sval - a*sval0*ival0*dt
          didt = ival0*(a*sval0 - b)*dt !! derivative of i(t)
          ival = ival + ival0*(a*sval0 - b)*dt
          rval = rval + b*ival0*dt
c         rval = 1 - (sval + ival)
          normtot = sval + ival + rval
          time=time+dt
          write(80,1000) time, sval, ival, rval, didt, normtot
       enddo

       end program
