// tsrfc - when building a new component
import { PostType } from '../types'
import Card from 'react-bootstrap/Card'

type PostCardProps = {
    post: PostType
}

export default function PostCard({ post }: PostCardProps) {
    console.log(post)
    // want to display post in a nice way 
  return (
    <Card className='my-3' bg='dark' text='white'>
        <Card.Header className='bg-custom'>{post.dateCreated}</Card.Header>
        <Card.Body>
            <Card.Title>{ post.title }</Card.Title>
            <Card.Subtitle>{ post.author.username }</Card.Subtitle>
            <Card.Text>{ post.body }</Card.Text>
        </Card.Body>
    </Card>
  )
}