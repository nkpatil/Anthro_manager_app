To run the manager_app, first we switch to manager_app directory and then write a command:
  $ slc run
  
The above command will run the application on url "http://0.0.0.0:3000" So we can directly go to that url and see the manager ui to see all tasks and create new tasks.

If we want to see the data in raw format, we can open the url "http://0.0.0.0:3000/api/task_type". It will show all fields for every task type stored in database.

To check mongodb database:
  - Write "mongo" in terminal. Then you'll entered into mongodb.
  - Write "use test" to enter into database named test.
  - Then to check the task type entries: write command "db.task_type.find()" - It will get all entries saved under task_type.
