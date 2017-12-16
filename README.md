**Hacker News Clone**
---------------------------

### **Brief Overview:**
This is a clone application of the website HackerNews. There are 3 parts to this project which are all hosted on a droplet in DigitalOcean. At: 146.185.141.49

**MySQL db** - container for holding our data (on port number 3306)

**Backend** - Express server that retrieves or inserts data into the db container (on port number 8081)

**Front-end** - Website built with Vuejs (on port 8080)

### **Access:**
**Droplet**: (146.185.141.49)
To be able to gain access to the droplet via ssh, your machine’s public key needs to be added to the authorized list. Please contact one of the team members, with the public key ready, to be given access.

**Database**:
> Username: root
> Password: root

### **Data, Files and Projects**:
Since the docker containers depends on volumes to save its data, the data for the database is saved on the path ./mysql/data on the droplet.

The database also needs to be structured when the container is created from the official image. This is initiated by the file dbcreation.sql located at ./mysql/mysql_init on the droplet.

### **Starting/Stopping of the application**:
The `docker-compose.yml` file is responsible for the initialization of the application. If you look closer into it, it defines the images (read: Docker Images above) to be dockerized, sets the environment and volume, links the services among each other and link the ports between the host and the containers.

To start the application, which includes all the steps above, ssh onto the droplet and type the command: 

 `docker-compose up -d`

  The `“-d”` flag allows it to run in the background.

To check if it worked, you can check the processes with 

 `docker ps`
 
And to stop the application, simply run 

 `docker-compose down`

### **Node API description**:
Please make sure you send JSON to our API. It probably is needed to specify in your header like so:
> Accept   application/json 
> Content-type application/json
To be sure, before using any post route, please verify you have valid json. You can use this website to do validate your json. 
https://jsonformatter.curiousconcept.com

##### Posts

GET ROUTES

http://146.185.141.49:8081/post/ - To get all available stories/posts.

http://146.185.141.49:8081/post/112 - (112 being the id of story) To get a post by id .

Post ROUTE 

http://146.185.141.49:8081/post/ - (116 being the id of story) To post a new post
request body: `{
"pwd_hash":"aYUxbTekKH",
"username":"nippotam",
"hanesst_id":526052,
"post_parent":-1,
"post_type":"story",
"post_title":"6 keys keyboard on iPhone",
"post_url":"http://www.tikilabs.com/videotiki1.html",
"post_text":""
}`

PUT ROUTE

http://146.185.141.49:8081/post/116 - (116 being the id of story) To update a post

DELETE ROUTE

http://146.185.141.49:8081/post/112 - (112 being the id of story) To delete a story/post by id

##### User

GET ROUTES

http://146.185.141.49:8081/user/ - To get all users.

http://146.185.141.49:8081/user/djur - (djur being the username of a user) To get a user by username

Post ROUTE

http://146.185.141.49:8081/user/ - To post a new user

request body: `{
"pwd_hash":"aYUxbTekKH",
"username":"nippotam",
}`

PUT ROUTE

http://146.185.141.49:8081/user/djur - To update a user

DELETE ROUTE

http://146.185.141.49:8081/post/djur - To delete a user


#### **Feedback and Troubleshooting**:
In case of feedback and/or troubleshooting, please contact one of the team members. If it is regarding troubleshooting, please take note of the exception thrown.

#### **Team Members**:
Mikkel Djurhuus   
Theis Kjeld Rye

#### **Monitoring**
http://146.185.141.49:3000/dashboard/db/hackernews?orgId=1
login: admin/admin
