export type Comment = {
    c_id: number
    u_id: string
    i_id: number
    content: string
    rating: number
    created?: Date
    updated?: Date
    avatar: string
    firstName: string
    lastName: string
}