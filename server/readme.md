# Database changes documentation

The changes we will be adding to the database will be to allow users to like and comment on posts. It's important to note that **you need to make a backup of the current database**. This will also mark the 1 minor version release as the changes made will be able to work over all videos.

### 1. Create comment table

    CREATE TABLE comments (
        comment_id INT GENERATED ALWAYS AS IDENTITY,
        user_id VARCHAR(255) NOT NULL,
        username VARCHAR(15) NOT NULL,
        content VARCHAR(350) NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
        video_id VARCHAR(255) references videos(video_id),
        reply_to INT,
    );

### 2. Create the video like table

    CREATE TABLE likes (
        user_id VARCHAR(255) NOT NULL,
        username: VARCHAR(15) NOT NULL,
        video_id VARCHAR(255),
        comment_id INT,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
        UNIQUE (user_id, video_id),
        UNIQUE (user_id, comment_id)
    );

### 3. Alter the video table to make columns not null

    ALTER TABLE videos ALTER COLUMN pornstar SET NOT NULL;
    ALTER TABLE videos ALTER COLUMN tags SET NOT NULL;
    ALTER TABLE videos ALTER COLUMN createdate SET NOT NULL;
    ALTER TABLE videos ALTER COLUMN thumbnail SET NOT NULL;
    ALTER TABLE videos ADD COLUMN likes INTEGER;

### 4. Optimize postgrese

    `// work_mem tells the server that up to 4 MB can be used per operation`
    SET work_mem TO '250 MB';

    // Add index to likes comment_id column
    CREATE INDEX likes_comment_id_key ON likes (comment_id);

    // Add index to likes video_id column
    CREATE INDEX likes_video_id_key ON likes (video_id);
