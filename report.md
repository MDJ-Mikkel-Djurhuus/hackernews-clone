# Large Systems Development Exam

## Introduction
We will look at creating a clone of the website “Hacker News”. We will look at Hacker News for system requirements, design and functionality. We will however write write documentation as though it is an original product of our own making. 

Besides the creation of the website, we’ll also create a continuous delivery setup. We will do this to learn more about DevOps(Development Operations). To make simple and mundane developer tasks autonomous is especially interesting. Since it can reduce human errors, and free up time for developers to spend more time on actually producing, hopefully, quality code.
 
## Requirements, architecture, design and process
### System requirements
The users of our website will be able to read, create, update and delete the tech related links they post. Furthermore, the users should be able to post comments for previously posted links and upvote or downvote links. The system will resemble “Hacker News” and “Reddit”.
Functional Requirements
A user should be able to sign up/register
A user (if signed up) should be able to login
A logged in user should be able post new stories
A logged in user should be able to comment on a story
A logged in user should be able to comment on a comment
A logged in user should be able up/down vote other users stories and comments
A logged in user should be able to edit comments/stories created by himself
Non Functional Requirements
A user should be able to browse previously created stories
A user should be able get an overview of a post (story or comment) with the related comments
A user should be able get an overview of all stories posted a by a user
A user should be able get an overview of all comments posted a by a user
The website should be responsive, so users can use it on multiple devices (mobile, tablet & computer)
The website should feel responsive (low response time)
### Development process
Deciding for a development method was somewhat difficult. We’re used to working agile, using primarily Scrum and Unified Process. We usually work agile since we don’t know the complete system requirements. As well as we like being able to iterate as we go. Do A/B tests to find the best solution. And in our experience, it’s too difficult, and waste of time trying to define where the product should end up precisely. 
But in this project, we actually knew exactly what the end product were supposed to be like. Or at least we knew it well enough that, working with a traditional development method such as Waterfall would actually work.
We compared the pros and cons of using Agile vs Traditional/Waterfall development method. In the end we didn’t feel like the benefits of actually knowing how the end product should be like, was a big enough factor compared to the flexibility gained by using an Agile method.
In the end, we decided upon using mainly Scrum. This way we knew, we could handle most if not all curve balls thrown at us through the project. And we’d still be able to develop at the same speed, but without spending the time planning everything upfront, as we’d otherwise be forced to if using Traditional/Waterfall.

### Software architecture
We chose to split our system into two main parts (front/back end) and a database, implementing common term “Three-Layered Services Application”:

Front-end / (Presentation & Business layer)
Provides the system’s user interface (UI) and an api for communication with the data layer
Dockerized NodeJS application devoloped with VueJS.
Deployed to Digital Ocean.
Back-end / (Data layer)
Provides a REST api for communication with the database.
Dockerized NodeJS application devoloped with ExpressJS.
Deployed to Digital Ocean.
Database
Stores our data
Dockerized MySQL
Deployed to Digital Ocean
### Software design
Here you should sketch your thoughts on the software design before you started implementing the system. This includes describing the technical concerns you had about the system before you started development, together with all the technical components you came up with to fix these concerns and meet the requirements.
One of our concerns was how to handle the nested comments and find a way to store the hierarchical data. So we did a little investigation to see how other people solves this issue.
The standard method of storing hierarchical data is a simple parent-child releationship. Each record in the database includes a “parent id” which then makes it possible to do a recursive query to get the nested structure. Adding a new record to the system only requires the id of the parent, with no other indexing. The advantages of this method are the simplicity and the low cost of adding new records. The cost comes when building the nested structure when you get into larger data sets.

Pros:
Easy to insert new data (no indexing required)
Lightweight storage of data (only one field “parent id” required to build an entire affiliate tree)
“levels of the tree” (how deep you are) is inherently obvious, as each level requires a new query.
Cons:
Very intensive overhead to report
Another method is to build an index for each record using nested sets. In a nested set each record contains two indices, a “left” and a “right” index number. The indexes are created by starting at the root of the tree, and working from left to right through each node of the tree. If there are any child records, the left and right indexes of the children will be a number larger than the left of the parent, and smaller than the right.

Pros:
Reporting is easy and lightweight
Quick selection of downline sets
Cons:
Adding or removing records requires a re-index of the entire tree
Report details (such as finding the number of levels in the child-set of records) can require complex queries
Because of the simplicity we chose to go with the parent-child method.
As the data set gets larger, showing the stories in one long list won’t be sufficient. As the loading time would be too long.
There are 3 common ways to display lists of data:
Endless scrolling
Slow load time
Load more
Fast load time but lackluster navigation
Pagination
Fast load time and nice navigation
1.5. Software implementation
This section should describe your actual implementation. Mainly how well you followed the requirements, process and software design you began with. If your system changed during this phase you should summarise the unexpected events/problems and explain how you solved them.
Front-end
Api (Business layer)
Exports functionality for interacting with the data layer
Implements shared data model with back-end
Views (Web endpoints)
/news/:page
Visual: Display a list of stories
Functionality: Paginated list with sorting
Fetch ids of all stories based on sorting. (only fetching ids allow for a faster load)
Fetch stories with ids corresponding to the current page.
Prefetch the next page.
Everything gets stored in memory (Vuex) to avoid fetching the same data twice
/user/:username
Visual: Display user information
Functionality: Fetch user data
/post/:id
Visual: Display post information with a comment section
Funcitonality: Fetch post by id
/login
Visual: Display post information with a comment section
Funcitonality: 
Components
Post
Display posts in different states: Full, List etc..
List
Display lists of posts
Vuex store (state management)


## Maintenance and SLA status
This section describes the process of maintaining the software over time, starting from the hand-over to the shutting down of your system. The section should be written from the viewpoint of the operator, not the developers.
### Hand-over
To simulate exchanging systems with another company, we exchanged all the necessary information online, instead of during a meeting. This solution also has an added benefit of flexibility. And everyone now knows how to contact everyone, in case anyone needed further clarification, or bugs were reported.
We received medium-high quality documentation. It was well written. Easy to find what we needed.
We didn’t feel well equipped to handle maintaining a system of this kind. On the other hand, that is often the story when trying new things as a software developer. We felt timid and unsure at the start, but as we got into it, and poked around, playing with things, it quickly settled and everything soon became fine.
### Service-level agreement
This Service-level Agreement (SLA) will define the contract that we, the service provider, will try to guarantee at all times to you, the client. We describe an agreement that we have set in order to have a service that meets all expectations. We set the expected up time of the service, response times and status as well as explain how we calculate the metrics.
Uptime
Our services minimum expected up time is set at 95% per month. This means that the website Hacker News will be at a minimum 95% of the month. The way in which we calculate the percentage of up-time of the service is by taking the number of minutes in the month and comparing the minutes of up-time we have had that month.
Response time
our service will have a maximum response time of 100 milliseconds. This metric is calculated with the help of an external service, Prometheus. Prometheus will store the response time of all requests sent to our server and the time it takes the server to respond to the client, from this we will be able to see if any request surpasses a response time of 60 milliseconds. This of course is subjective depending on whether the client internet connection is strong. If the client internet connection is by any means deemed to be not of adequate speed this agreement can be acquitted.
### Maintenance and reliability
To ensure that the SLA was upheld we used a combination of Prometheus and Grafana, tools that can be used for storing and visualizing time series data. Prometheus acts as the storage backend and Grafana as the interface for analysis and visualization.

Our grafana setup:

Uptime
Up or down: up{job="backend"}
% of last 30 days: avg_over_time(up{job='backend'}[30d]) * 100
Apdex score
(  sum(rate(http_request_duration_ms_bucket{le="100"}[1m])) by (service)+  sum(rate(http_request_duration_ms_bucket{le="300"}[1m])) by (service)) / 2 / sum(rate(http_request_duration_ms_count[1m])) by (service)
Error rate
sum(increase(http_request_duration_ms_count{code=~"^5..$"}[1m])) / sum(increase(http_request_duration_ms_count[1m]))
Requests per minute
sum(rate(http_request_duration_ms_count[1m])) by (service, route, method, code)  * 60
Response time
Average: avg(rate(http_request_duration_ms_sum[1m]) 
Median: histogram_quantile(0.5, sum(rate(http_request_duration_ms_bucket{method="GET"}[1m])) by (le, service, route, method))
95th: histogram_quantile(0.95, sum(rate(http_request_duration_ms_bucket[1m])) by (le, service, route, method))
One major upside to using grafana is that you can set up automated alerts. Which can help reduce reaction time for developers. Here is shown how we used it to get alerts when the service went down.

Utilizing docker’s ability to restart services when failing, we didn’t encounter downtime for more than a minute at a time. This has let to a really reliable system with an uptime around 99%. As the data set grew, response time for some of the heavier operation, exceeded the 100ms that was required by the SLA.
## Discussion
### Technical discussion

### Group work reflection & Lessons learned
We learned a lot about virtualization, specifically the usage of both Docker and Digital Ocean. We can see the knowledge and skills we’ve gained by using these technologies come in very handy in future projects, and most likely work as well. 

The most difficult thing about using Docker was getting it up and running properly. Albeit once that hurdle is cleared, the continued use of Docker can save a lot of time and make a better development environment.

The continuous integration & continuous deployment chain we set up using Jenkins was really worth the time spent on getting it up and running. We feel it’s a good thing, this technology was part of our planning from the beginning. Since, as with most software, we could imagine it would be quite cumbersome and annoying to convert an existing production pipeline to include Jenkins. Although it’s still likely worth the time spent on it.

The idea hand-over and operating someone else’s software was a nice experience to have as part of the course. Since it reflects the real world quite well. You never really know what you’re gonna get, how well it’s documented, and what the quality of the product actually is. 

Since we both have work experience operating other’s systems, we decided to try to simulate an online-only hand-over. Which neither of us had really tried before. This was an interesting experience, and we were able to see some of the pros and cons of both, doing the hand-over physically during a meeting for example, or the online version, where everything was written text and therefore communication a bit harder. But at the same time, easier to ask questions later on in the process, if some should arrive.

Due to being a bit too busy with various tasks, we feel our response time as developer were below what we would have liked. That being said, our fix time from reading the issues to solving the problem were satisfactory. In the future we have to set up a better system for alarming us, and reminding us about issues. 
