import { type PageResponse } from '@/api/model/baseModel'

export interface GetPostInfoResponse {
  postInfo: PostInfo
  replyInfos?: PageResponse<ReplyInfo> | null
}

export interface PostInfo {
  postId: string
  creator: string
  creatorId: string
  title: string
  content: string
  clickCount: number
  likeCount: number
  dislikeCount: number
  createTime: Date
  lastUpdatedTime?: Date | null
}

export interface ReplyInfo {
  replyId: string
  creator: string
  creatorId: string
  title?: string | null
  content: string
  likeCount: number
  dislikeCount: number
  createTime: Date
  commentInfos: CommentInfo[]
}

export interface CommentInfo {
  commentId: string
  creator: string
  creatorId: string
  content: string
  likeCount: number
  dislikeCount: number
  createTime: Date
}
