# TechLabs Berlin Summer Term 2022

# Peedom

Whatever the reason, we can help you in any case. With Peedom, you can find the nearest toilet without any trouble, check the distance and even adjust your choice to make it as comfortable as possible.

Peedom allows you to browse all toilets in Berlin or filter to find the most suitable options according to your preference and your distance based on your location. The end results will be displayed on a map or viewed in a list and you can select your preference which will route you to the location.

The Data Science team collected and cleaned the data and created the machine learning models, while the Web Development team created the back and front-end. The website was designed by our UX Designer.

## How to use it

#### Requirements:
- Node (Version v16.15.1 tested and working)
- Python  (Version v3.10.5 tested and working)

#### Node Server
- $ Git clone https://github.com/TechLabs-Berlin/st22-peedom.git

-This clones the repository locally

- Cd into st22-peedom/server and run $ npm install

-This will install the dependencies for node

- To start node server, run $ node server.js

-If working, “Server running at http://localhost:3000 Database connection established!” will be printed in terminal

#### Python Server

- To activate a virtual environment named .venv

- Cd into st22-peedom/Reco-Model and run the following command (as appropriate to your computer) 

#### Linux
sudo apt-get install python3-venv    # If needed
python3 -m venv .venv
source .venv/bin/activate

#### macOS
python3 -m venv .venv
source .venv/bin/activate

#### Windows
py -3 -m venv .venv
.venv\scripts\activate

- To install requirements
python -m pip install requirements.txt

- To start python server , run $ python app.py

-If working, “Running on http://127.0.0.1:5000 (Press CTRL+C to quit)” will be printed in the terminal

#### Run Application

After NodeJS and Flask servers are running, use live server extension in VS Code [Live Server - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to run application

#### User Research, testing and User Flow can be found [here](https://github.com/TechLabs-Berlin/st22-peedom/tree/main/UX%20FILES)

## Team Members

Tomasz Janik - UX/UI

Noah Baumann - Web Development (Backend)

Mohamed Eslam - Web Development (Frontend)

Agnan John - Data Science

Rashmi Dsouza - Data Science

## Mentor

Bogdan Ciobotaru
