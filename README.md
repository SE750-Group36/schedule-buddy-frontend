# Schedulinator Front End

## To Run
1. Ensure back end project is built and running
2. Open a command line window in '/schedulinator-frontend'
3. Run 'npm install'
4. Run 'npm start'
5. The application should load

## To Use
1. Click the gear icon on the sidebar to open settings, and set your scheduling preferences using the date and time pickers, then click 'done'
2. Click the '+' icon on the sidebar and upload a .ics file from your computer
3. Add at least one job in the 'Add Jobs' section to the left of the main calendar
4. Once all your jobs are added, click the 'Schedule' button in the top right of the screen to generate your schedule
5. Once you see your study schedule appear in the calendar, click the 'Export Schedule' button to download it as a .ics file

## The meeting minutes and further documentation can be found in the back end project
https://github.com/SE750-Group36/schedule-buddy-backend


#Project Meeting Minutes

##24/3/2021

-   Initial project ideation

-   Food menu app

-   Blood alcohol estimator

-   Study schedule app

-   Bar/club heat map

-   Begin setting up proposal.

##5/4/2021

-   Initial design ideation

-   Figma designs created

##6/4/2021

-   Initial development work set up

-   Organisation created with FE and BE projects

-   GH projects set up

-   Need to read up on technical viability

##12/4/2021

-   Check in on current knowledge

-   Verified methods for scheduling and the app architecture.

##22/4/2021

-   Clarified information to be passed between FE and BE

-   Scoped endpoint functionality

##3/5/2021

Checked in where we are at

-   FE has calendar displaying and basic UI.

-   BE basic algorithm working. Some modifications (such as converting from UTC) and testing need to be carried out.

-   Opening ics displays events on calendar

-   Skeleton API calls for persisting calendars and scheduling are done

Next steps

-   Finalise algorithm.

-   Put up endpoints.

-   Set up persisted schedule and calendar storage.

-   Add styling to FE

-   Add preferences modal and schedule to FE and a mechanism for adding jobs.

-   Add auth in the FE.

-   Loading old calendars?

Feedback

FE:

-   Add start and end times for when the user wants to work every day.

-   Change preferences block

-   Start and End time that every user has

-   Blocked time array should be pairs of start and end times rather than an array of events.

##7/5/2021

-   Discussed Linking FE and BE

-   Issues to be worked on

-   Date/time conversions between FE and BE

-   FE styling needs to be complete

##9/5/2021

-   Final checks before submission

-   Peripheral documentation added
