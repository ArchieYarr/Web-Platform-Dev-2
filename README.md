# Web-Platform-Dev-2
CW1 Submission for Demo 

I will list the basic purpose of the app here alongside how it meets the criteria (my interpretation of the criteria) in the CW1 spec.

WORKING FEATURES
1) Client-Server Communication: The app responds to 5 URLs and provides a 404 message if an unrecognised one is entered
2) Data Persistence: The app persists data to memory 
3) The integration of application data into the response provided by the application: The app loads data persisted to memory to the 'planner' page 
4) The implementation of the Model-View-Controller pattern: The MVC pattern was used to implement the app

FEATURES WITH ERRORS
The data persistence function has a logic error, the IF loop I used skips into the ELSE for unkown reasons, I could not solve this issue but have left the code as is to demonstrate that I know the code to persist to a file but was not able to effectively implement it into the constructor of my Planner class

UPDATE TO FEATURES WITH ERRORS
I fixed the persistence issue 
