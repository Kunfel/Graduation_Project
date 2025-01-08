import ForumPost from '@/app/dashboard/forum/_components/ForumPost'

const dummyPosts = [
  { id: 1, title: 'Welcome to our forum!', author: 'Admin', content: 'Feel free to start discussions and ask questions.' },
  { id: 2, title: 'How do I use the QR code generator?', author: 'NewUser', content: 'I\'m having trouble generating a QR code. Can someone help?' },
  { id: 3, title: 'Suggestion for new features', author: 'PowerUser', content: 'It would be great if we could customize the QR code colors.' },
]

export default function Forum() {
  return (
    <div>
      <h1 className="mb-6 text-xl text-blue-600">Forum</h1>
      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <ForumPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}