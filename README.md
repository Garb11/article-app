# Fullstack Vue.js + Node.js (REST API) Project

This project is a simple fullstack application built using Node.js (Express) for the backend and Vue.js for the frontend.

## Technologies Used

- **Backend**: Node.js, Express, Sequelize, PostgreSQL
- **Frontend**: Vue.js, Vue Router, Vuex, Vuetify, Axios
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Garb11/article-app.git
    cd article-app
    ```

2. **Start the application using Docker Compose:**

    ```bash
    docker-compose up --build -d
    ```

3. **Run migrations:**

    After the containers are running, you may need to run migrations:

    ```bash
    docker-compose exec backend npm run migrate
    ```

4. **Seed the database (optional):**

    If you want to populate the database with initial data, execute the following command:

    ```bash
    docker-compose exec backend npm run seed
    ```

5. **Access the application:**

    Open your browser and navigate to [http://localhost:80](http://localhost:80) to access the application.

---

## Features and API Endpoints

By default, the backend runs on port 3000.

### Articles Management

- **Features**:
  - Create, Read, Update, and Delete articles.
  - Each article contains:
    - ID
    - Title
    - Content
    - Created Date
    - Modified Date

- **API Endpoints**:
  - **Create Article**: `POST /article/`
  - **Get Article**: `GET /article/#ID#/`
  - **Get All Articles**: `GET /articles/`
  - **Update Article**: `PATCH /article/#ID#/`
  - **Delete Article**: `DELETE /article/#ID#/`

### Comments Management

- **Features**:
  - Create, Read, Update, and Delete comments for articles.
  - Each comment contains:
    - ID
    - Content
    - Article ID
    - Created Date
    - Modified Date

- **API Endpoints**:
  - **Create Comment**: `POST /article/#ARTICLE_ID#/comment/`
  - **Get Comment**: `GET /article/#ARTICLE_ID#/comment/#ID#/`
  - **Get All Comments for Article**: `GET /article/#ARTICLE_ID#/comments/`
  - **Update Comment**: `PATCH /article/#ARTICLE_ID#/comment/#ID#/`
  - **Delete Comment**: `DELETE /article/#ARTICLE_ID#/comment/#ID#/`

### Analytics

- **Features**:
  - Retrieve comments within a specified period, grouped by articles.

- **API Endpoint**:
  - **Get Comments by Period**: `GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#`

---

**Note:** This project is created for demonstration purposes.
