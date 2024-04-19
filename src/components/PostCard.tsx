// tsrfc - when building a new component
import { PostType, UserType } from '../types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

type PostCardProps = {
    post: PostType,
    currentUser: UserType|null
}

export default function PostCard({ post, currentUser }: PostCardProps) {
    console.log(post)
    // want to display post in a nice way 
  return (
    <Card className='my-3' bg='dark' text='white'>
        <Card.Header className='bg-custom'>{post.dateCreated}</Card.Header>
        <Card.Body>
            <Card.Title>{ post.title }</Card.Title>
            <Card.Subtitle>{ post.author.username }</Card.Subtitle>
            <Card.Text>{ post.body }</Card.Text>
            {post.author.id === currentUser?.id &&<Button variant='primary'>Edit Post</Button> }
        </Card.Body>
    </Card>
  )
}