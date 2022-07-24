# Peedom

Even at the best of times, I’m sure each of you has had an urgent need to go to the bathroom. But when there are problems with finding the right place, the feeling of irritation only gets worse.

In Berlin, there are about 200 public toilets, which is far too few for a city with so many opportunities to spend time outdoors, and for a city where drinking alcohol in a public place is not forbidden.

During our adventure with TechLabs, we were working on a project that would solve this problem. Peedom is an app that allows Users to find toilets in their area and, with the help of filters, customize their search to suit their needs. We believe that this issue in itself is worthy of greater attention from our society.

Research provided by the UX team shows that accessing toilets is a problem that overwhelmingly affects women. They are doubly affected, since, in addition to the problem of finding a toilet, there is also the problem of paying. Women have to pay for the use of toilets, no matter what “purpose” they use it for.

The Peedom group initially consisted of 7 participants, but we worked on the project with a cast of five. Allow me to briefly present the work of the various groups.

## Data Science (DS)

- Members: Rashmi Carol Dsouza, Agnan John

- Tech Stack:Jupyter Notebook, Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Flask

### DATA

We have acquired the first raw data on toilets available in Berlin from the [Berlin Open Data](https://daten.berlin.de/datensaetze/standorte-der-%C3%B6ffentlichen-toiletten)(Official Website of the City of Berlin, the capital of Germany). The locations of all public restrooms run by Wall GmbH are included in this collection, along with some restrooms run by other service providers. Updates to this data occur at least once per year. The key features required for the application like the location coordinates and accessibilities of these toilets we available in the same dataset.

For the first phase, we made the decision to focus just on the initial Dataset before expanding to further possibilities. We also thought of giving users or private owners the opportunity to list the toilets available like in restaurants via a contact form. To clean the data, we mostly employed the techniques that we learned during the learning phase of the program.

We were able to combine, clean, and prepare our dataset swiftly without any issues, however, the panic started when we realized the requirement of having an algorithm to explore the model and predict the recommendations. Since we lacked a clear goal variable that could be predicted, we explored clustering the toilets according to their location distance.

### Model

At first, we started googling for recommendation algorithms and could not succeed as those do not make any sense for our problem. Then we looked at the past projects available on Techlab’s GitHub and found some useful hints. And then we realized that clustering will make real sense to our issues and worked on the K-Means algorithm to cluster the toilets based on their distance. For this, we would like to acknowledge some past projects initiated by Techlabs techies, as we have taken inspiration from them.

We decided to make our own rating system by assigning different wights depending on the attributes of the toilets. One attribute is mock Google ratings as we could not scrap it and fixing this will be a priority in the future. A sum of all the attributes along with their weights give us a rating ranging from 1 to 30 for all toilets. The distribution of the ratings have been visualized in the graph below:

![Capture1](https://user-images.githubusercontent.com/83392053/180662927-382385aa-6c69-40ed-a98c-97fe85bc2ac4.JPG)

We tried different methods to find the best combination of k and clusters. The elbow method runs k-means clustering on the dataset for a range of values of k (say from 1-100) and then for each value of k computes an average score for all clusters. By default, the distortion score is computed, the sum of square distances from each point to its assigned center.

![elbow](https://user-images.githubusercontent.com/83392053/180662974-3149d281-9b17-4170-b6f6-0b334be46eb5.png)

By the elbow method, we are not getting the best results and hence we decided for using silhouette score to estimate the best k and number of clusters. We understood from the higher Silhouette scores that, the number of clusters would be optimum in and around 75.

![image (2)](https://user-images.githubusercontent.com/83392053/180663041-70b5fa04-ddd7-4ad8-be4e-ee9876a8700f.png)


![image (3)](https://user-images.githubusercontent.com/83392053/180663013-839c3085-11fc-4a1a-b08e-5ebff052764f.png)

Since we also had to keep in mind the distance of the Toilet from the user location, we decided to go with 98 clusters.

Our final recommendation gives us the best results depending on the user location and our rating system.

Our first output gives us the closest 5 toilets based on distance and our second output gives us the top 5 rated toilets in a cluster. Both the results are combined and the user can see a result of a minimum of 5 and a maximum of 10 toilets to choose from.

### Hosting

Our data was hosted in Mongo DB and the back end was built in Node. Our team tried to implement a structure to respond to incoming requests from the user for recommendations on the nearest toilet by interprocess communication between the Node web server and the Python script, but we quickly ran into problems with this approach. Thereafter, we decide to decouple the model and host it on a separate server. To integrate the Python recommendation model we used the Python framework Flask which gets data hosted on the database using a node endpoint. The recommended toilets are thereafter returned in JSON to the node server using another Restful API endpoint.

![Flask server](https://user-images.githubusercontent.com/83392053/180663128-4df8e6c7-90de-445b-adec-f552bdf275d9.png)

## Web development (Frontend)

Peedom frontend is a responsive website created by using HTML5, CSS3, Bootstrap5, Javascript and Google Maps API.

The website works on different screens and devices: desktops, tablets and mobile devices.

![map-desktop](https://user-images.githubusercontent.com/83392053/180663165-8f07c0ff-b227-4ffd-8c1a-2aee4862f5ab.png)
![map-mobile](https://user-images.githubusercontent.com/83392053/180663170-942a22be-7c43-4734-93b5-e7c5d8c273c6.png)
![whatis-desktop](https://user-images.githubusercontent.com/83392053/180663178-f31c9583-9283-4669-af79-85e3797e2de7.png)
![whatis-mobile](https://user-images.githubusercontent.com/83392053/180663183-f401a284-c17b-4bc3-9ef2-4536e8dac99f.png)

Bootstrap5 is used for responsiveness as well as providing many components like Cards, Carousel, Buttons and Badges. 

Google Maps Javascript API is used to provide the main map layout, show markers of the toilets and also the current user location.


Markers clustering is used for a better user experience while using the map and if the user zoomin they can see an individual marker for each toilet

Javascript is used to connect the website with the backend, implement the map features like listing the toilets and filter them out based on the selected filters.

![filter-desktop](https://user-images.githubusercontent.com/83392053/180663248-c78f8218-ebe7-4861-9b7d-1d1a7b2f7b75.png)

To help the user choose a suitable toilet, Peedom shows the list of nearest toilets and gives the user all needed details like address, price, working hours and more  with detailed directions from their location to the selected toilet with the help of Google Maps Directions.

![list-desktop](https://user-images.githubusercontent.com/83392053/180663275-4485c02e-1845-4bff-ad32-a8ac0275b20d.png)
/180663248-c78f8218-ebe7-4861-9b7d-1d1a7b2f7b75.png)
![direction](https://user-images.githubusercontent.com/83392053/180663282-3dd25107-bee7-437e-9038-73c321bdbb60.png)

Peedom provides our users the ability to add reviews and comments on specific toilet and make then available for the rest of users 

![user-reviews-desktop](https://user-images.githubusercontent.com/83392053/180663314-704eed02-4e4f-4954-a9fd-c66d3f94abff.png)

## Web Development - Backend

The development of the backend for Peedom was a learning experience from a programming, but also from a communication and teamwork standpoint. Overall, the backend structure was developed quite early in the Project phase but as the requirements for the product and the programme became more clear, complexity in the structure increased. Initially, there was a lot of communication with the frontend about the requirements and how best to set up the endpoints. It was only until later in the project phase that explicit coordination with the Data Science track was made, which led to time constraints and difficulties incorporating the Data Science algorithm.

### Technical journey:

The creation of the backend is divided into the following 5 phases:

1. Finish academic phase

In retrospect, I wish that I had used the first 1~2 Weeks of the project phase to finish the learning track. Because I felt that I needed to start developing the backend immediately, I skipped this and only finished the remainder of the learning phase in the last week of the project phase. The result of this was that I spent a lot more time researching things online than was necessary. Most of the information I was looking for online was information that was referenced in part in those last few videos on Udemy. It would have saved a lot of time if I had focused on finished the learning before trying to start coding for the project.

2. Creating Database

From the start, I knew that I wanted to implement the things I had learned and push myself further in the project phase. Therefore, I was keen to use NodeJS/Express and MongoDB for my Techstack. After doing some research I thought it would be a good idea to use MongoDB atlas – a cloud DB for the Project, this would better reflect a real-world application in my view. It was possible because the free tier of MongoDB Atlas was used.

After Data Science finished scrapping their first set of Data and converted into a csv, I uploaded this into our MongoDB Atlas Collection. We had a Collection with 440 Documents with fields such as Price, Opening_hours and isHandicappedAccessible.

<img width="452" alt="Peedom_DB" src="https://user-images.githubusercontent.com/83392053/180663372-aea0e097-c5c4-462b-a8b4-afb6d5cc41a0.png">

3. Connecting backend to frontend

In the third phase, my backend was to be connected to the frontend. Mohamed and I regularly exchanged feedback for this. The setup was relatively simple as at the time we just required straightforward endpoints to all the data in the Database.

4. Connecting website with Data Science algorithm

The goal at this stage was to link Datascience's algorithm to the website. My original idea was that I would call the algorithm within my node endpoint using child-processes. This worked on my end initially, but did not work for the Data Science team. We never found out what the issue was, as all the code and installed libraries seemed to be the same. Due to the issues with this approach though, we decided to go for what was always the more straightforward route of Data Science, using flask to make their own endpoint. Within my node endpoint, I call their endpoint and pass them the parameters, then I send the results to the frontend.

In the end, we used the following API structure:

![All routes](https://user-images.githubusercontent.com/83392053/180663395-53092862-de31-426e-b7b6-0b272c303f14.png)

5. MVP finalization

In this phase, I implemented the review feature and finished the last details. Implementing the review feature created more issues than was anticipated. This was because the MongoDB was saving the Comments' field as a string when it should be an array. After getting the feature itself to work with the frontend, issues with the algorithm were encountered. Because previously the Database just had strings and integers, adding the Comments as strings within arrays added complexity that caused errors in the algorithm.

## UX :

Being responsible for the UX part of the project, I started my analysis on the topic with online research. I was looking for information on who in particular is affected by the subject we decided to work on, which social groups, in which situations, and whether there are solutions to improve the current situation

After the initial investigation, I had a vision of who I would like to interview in the next process. The problem concerns two groups, people who spend time outdoors, and people with all kinds of illnesses that result in the need to use the toilet frequently. It was quite noticeable that the problem we are working on hits women particularly hard.

The next step was to conduct interviews and create personas. In this case, I enlisted the help of friends, through them I reached out to people representing the two social groups I mentioned. I asked about their experience in that area we were working on. For each person, a user scenario was created in the form of a user journey map, in this way I wanted to represent the emotions and pains of the users. 

The screen creation process started on paper, and then I worked on all the ideas in Figma, where the details of the design were gradually worked out. During this process, I returned to the users I had spoken to earlier with a request to test the prototype. This resulted in detailed feedback and ideas for improving the design, which were put into practice by the WD team.

I faced many challenges during my work on the project. As the only UX in the team, I didn't always know if my work was going in the right direction. Bringing the project to completion is a big personal success for me.


![A4 - 1](https://user-images.githubusercontent.com/83392053/180667271-bf9d5856-ae81-496a-8cd0-c99b04466e0f.jpg)
![A4 - 2](https://user-images.githubusercontent.com/83392053/180667273-40f8a509-503b-4e94-9901-63a9708473c2.jpg)
![A4 - 3](https://user-images.githubusercontent.com/83392053/180667276-49533465-fdfd-4e38-8b44-73276eade71c.jpg)
![A4 - 4](https://user-images.githubusercontent.com/83392053/180667278-8c80f620-6122-4e46-ae90-01ee37ecd79a.jpg)
![CINDY](https://user-images.githubusercontent.com/83392053/180667281-c8d3b7e2-f9cf-414d-baf6-e8fe6617aab4.jpg)

![logopeed](https://user-images.githubusercontent.com/83392053/180667598-52d14e86-c5a3-4fa3-b798-7e68f100596c.png)

![PeedomWireframes](https://user-images.githubusercontent.com/83392053/180667298-6db3a7de-1ddc-4970-939b-8e5caa31b1e0.png)

![Frame 216](https://user-images.githubusercontent.com/83392053/180667286-6f97f872-dde3-4978-aac5-73e36d52f70e.jpg)

![glownyprez](https://user-images.githubusercontent.com/83392053/180667418-f4a88d34-6531-4502-a6d9-2cc6021358ce.jpg)

![mapa prez](https://user-images.githubusercontent.com/83392053/180667295-a22b5c6c-06b2-448b-9367-1cbf1319ab09.jpg)

![wyszukprez](https://user-images.githubusercontent.com/83392053/180667301-a2c28d26-9d34-4418-9104-66ad2f877fd0.jpg)

### Conclusion

We are very happy with the result of our website. We learnt more working on this project with the team than we ever could have by ourselves. Frequent coordination  of Frontend with UX members and Backend with the Frontend and Data Science members allowed for the project to come to fruition.



## [Demo Video](https://www.youtube.com/watch?v=buiBnvV3mys)






