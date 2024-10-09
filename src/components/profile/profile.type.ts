export type User = {
    name: string
    username: string
    avatar: string
    bio: string
    location: string
    website: string
    email: string
    joinDate: string
    posts: Post[]
    followers: number
    following: number
  }
  
  export type Post = {
    id: number
    image: string
    likes: number
    comments: number
  }
  