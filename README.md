# LocalLens - Explore Like a Local, Experience Like a Native

LocalLens is a unique platform designed to connect tourists with local experts, offering authentic local experiences that go beyond the typical tourist attractions. Through LocalLens, tourists can explore a variety of local offerings, from guided tours and culinary adventures to artisan workshops and hidden gems known only to residents.

## Technologies Used

- **Frontend:** React
- **Backend:** Django
- **Database:** PostgreSQL
- **Containerization:** Docker

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to run the website:

- Docker
- Docker Compose

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/GENESESHB/LocalLens.git
```

2. Navigate to the project directory:
```bash
   cd LocalLens
```

2. Use Docker Compose to build and start the Website in dev mode:
```bash
   docker-compose -f docker-compose.local.yml up --build
```

### Usage

After running the containers, the web application should be accessible via:

Frontend: **http://localhost:3000**

Backend: **http://localhost:8000**
