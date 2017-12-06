**Hacker News Clone**
---------------------------

#### **Brief Overview:**
This is a clone application of the website HackerNews. There are 3 parts to this project which are all hosted on a droplet in DigitalOcean. At: 146.185.141.49

**MySQL db** - container for holding our data (on port number 3306)

**Backend** - Express server that retrieves or inserts data into the db container (on port number 8081)

**Front-end** - Website built with Vuejs (on port 8080)

#### **Access:**
**Droplet**: (146.185.141.49)
To be able to gain access to the droplet via ssh, your machine’s public key needs to be added to the authorized list. Please contact one of the team members, with the public key ready, to be given access.

**API**:
The API is working on port 3000. Jenkins handles the build of this application, which you can have a peek at it yourself.

**Jenkins**:
> Username: builder 
> Password: builder

**Database**:
> Username: root
> Password: root

#### **Docker Images**:
Check the `docker-compose.yml`

#### **Data, Files and Projects**:
Since the docker containers depends on volumes to save its data, the data for the database is saved on the path ./mysql/data on the droplet.

The database also needs to be structured when the container is created from the official image. This is initiated by the file dbcreation.sql located at ./mysql/mysql_init on the droplet.

#### **Starting/Stopping of the application**:
The `docker-compose.yml` file is responsible for the initialization of the application. If you look closer into it, it defines the images (read: Docker Images above) to be dockerized, sets the environment and volume, links the services among each other and link the ports between the host and the containers.

To start the application, which includes all the steps above, ssh onto the droplet and type the command: 

 `docker-compose up -d`

  The `“-d”` flag allows it to run in the background.

To check if it worked, you can check the processes with 

 `docker ps`
 
And to stop the application, simply run 

 `docker-compose down`

#### **Node API description**:

Due to the front-end being under-development, the ways to interact with the API is with the help of Postman or something similar. GET requests can be handled by the browser itself.

> GET ROUTE 146.185.141.49:8081/status/ To check if our system is alive.
> 
> GET ROUTE 146.185.141.49:8081/latest/ To check latest entry post.
> 
> POST ROUTES 146.185.141.49:8081/post/ To post new stories and comments

For using this route, please make sure you send JSON to our API. It probably is needed to specify in your header like so:

> Accept   application/json 
> Content-type application/json

To be sure, before using any post route, please verify you have valid json. You can use this website to do validate your json. 
https://jsonformatter.curiousconcept.com

146.185.141.49:8081/post/       To post an object of story/post like this:
> 
> 
    {"post_title": "YoanaSuperisOk", "post_text": "", "post_type": "story", "post_parent": -1, "username": "pg", "pwd_hash": "Y89KIJ3frM", "post_url": "http://ycombinator.com", "hannest_id":655}



Please make sure, for the previous posts you use unique hannest_id. As our hannest_id is PK,NN,UQ in our mysql db.

http://207.154.245.251:3000/post/noid     To post story/post without hannest_id like this:
> 
>  `{"post_title": "YoanaisOk", "post_text": "", "post_type": "story", "post_parent": -1, "username": "pg", "pwd_hash": "Y89KIJ3frM", "post_url": "http://ycombinator.com"}`

GET ROUTES
http://207.154.245.251:3000/post/ - To get all available stories/posts.

http://207.154.245.251:3000/post/112 - (112 being the id of story) To get a story/post by id .

DELETE ROUTE
http://207.154.245.251:3000/post/112 - (112 being the id of story) To delete a story/post by id

PUT ROUTE
http://207.154.245.251:3000/post/116 - (116 being the id of story) Send JSON like object to update a story:

    

    > {"post_title": "HelloMuci", "post_text": "", "post_type": "story","post_parent": -1, "username": "pg", "pwd_hash": "Y89KIJ3frM", "post_url": "http://ycombinator.com"}

We have successfully inserted around 340000 users in our db. Routes to manipulate with these users:

GET ROUTE
http://207.154.245.251:3000/user/	To get all available users.

POST ROUTE
http://207.154.245.251:3000/user/      To post a user sending json like this:

 

>     {
>        "name": "Man",
>        "pwd": "jhdc"
>     }

DELETE ROUTE
http://207.154.245.251:3000/user/Yoana     Yoana being the user you want to delete.

#### **Feedback and Troubleshooting**:
In case of feedback and/or troubleshooting, please contact one of the team members. If it is regarding troubleshooting, please take note of the exception thrown.

#### **Team Members**:
Mikkel Djurhuus
Theis Kjeld Rye


#### **Monitoring**
http://146.185.141.49:3000/dashboard/db/hackernews?orgId=1
