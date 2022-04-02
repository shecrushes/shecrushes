
// Front page
export interface frontPageVideo {
  id: string;
  thumbnail:  string;
  video_url:  string;
  video_width: number;
  video_height: number;
  tags: [string],
  creator: string,
  views: number,
  likes: number 
}

// Watch page
export interface watchVideo {
  video_id: string;
  title: string;
  video_hd: string;
  video_sd: string;
  thumbnail: string;
  pornstar: string;
  createDate: number;
  tags: string;
  views?: number;
  likes?: number;
}

export interface relatedVideos {
  video_id: string;
  title: string;
  thumbnail: string;
  pornstar: string;
  tags: string;
  views?: number;
}

// Likes
export interface likes {
  videoId: string;
}

export interface commentLike {
  comment_id: number;
  likes_count: number;
}

// Comments
export interface comments {
  comment_id: number,
  username: string
  content: string;
  likes_count: string;
  reply_count: string;
  created_at: string;
}

export interface replies {
  comment_id: number,
  username: string
  content: string;
  created_at: string;
  likes_count: string;
}

export interface replyLike {
  comment_id: number;
  likes_count: number;
}

// Profile likes & comments
export interface profileVideoLikes {
  username: string,
  created_at: string
  thumbnail: string;
  video_id: string;
}

export interface profileComments {
  comment_id: number,
  user_id: string,
  username: string
  content: string;
  reply_to: number | null;
  video_id: string;
  created_at: string;
}