export interface ForumListItemProps {
  title: string
  abstract: string
  author: {
    userId: string
    userName: string
  }
  date: Date
  viewCount: number
  like: number
}