## SheCrushes Backend

Instructions for getting the backend up and running.

## Getting started

1. First, set the current working directory to `/server`. Then run `npm install`

2. Once that has finished running, create a file in the `/server` dir called `config.env`. Inside it, paste the following:

```
NODE_ENV=development

HOSTNAME=
REDISPORT=16007
PASSWORD=

POSTGRES_CONNECTION_DEV=postgres://<username>:<password>@localhost/shecrushes
POSTGRES_CONNECTION_PROD=postgresql://<username>:<password>@localhost:5432/shecrushes


FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRVIATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASEAUTH_PROVIDER=
FIREBASE_CLIENT_CERT=
```

The 2 main services you will have to set up will be Redis and PostgreSQL.

Redis is used to store & cache videos. Basically, for each category a Redis key exists and inside it is a serialized json string that contains all the videos for that category. It is also used to cache that response on the frontend. This cache will expire every hour when new videos are scraped.

PostgreSQL is used to store all the videos ever scraped. If a user wants to go back to a video, then the postgres database is used to search and return that videos information. The postgres database is also able to store likes and comments.

## Setting up Redis

1. To keep things simple, we'll be using Redis cloud to store the data. You can sign up at [https://redis.com/try-free/](https://redis.com/try-free/).

Once you signup, create a database and copy the endpoint. Paste it into:

```
HOSTNAME=PASTE ENDPOINT HERE
REDISPORT=16007
PASSWORD=
```

Then, click onto the database and scroll to the "Security" section. Copy the default password and paste it here:

```
HOSTNAME=PASTE ENDPOINT HERE
REDISPORT=16007
PASSWORD=PASTE PASSWORD HERE
```

## Setting up postgreSQL

The first step is to create a database called `shecrushes`

### 1. Create database

```
CREATE DATABASE shecrushes;
```

### 2. Create videos table

```
CREATE TABLE videos (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    video_id text NOT NULL,
    title text NOT NULL,
    video_hd text NOT NULL,
    video_sd text NOT NULL,
    pornstar text NOT NULL,
    tags text NOT NULL,
    createdate integer NOT NULL
    thumbnail text NOT NULL,
    views integer,
    likes integer
);
```

### 3. Create comment table

    CREATE TABLE comments (
        comment_id INT GENERATED ALWAYS AS IDENTITY,
        user_id VARCHAR(255) NOT NULL,
        username VARCHAR(15) NOT NULL,
        content VARCHAR(350) NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
        video_id VARCHAR(255) references videos(video_id),
        reply_to INT
    );

### 4. Create the video like table

    CREATE TABLE likes (
        user_id VARCHAR(255) NOT NULL,
        username: VARCHAR(15) NOT NULL,
        video_id VARCHAR(255),
        comment_id INT,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
        UNIQUE (user_id, video_id),
        UNIQUE (user_id, comment_id)
    );

### 5. Add indexes to postgres columns

    // Add index to likes comment_id column
    CREATE INDEX likes_comment_id_key ON likes (comment_id);

    // Add index to likes video_id column
    CREATE INDEX likes_video_id_key ON likes (video_id);
