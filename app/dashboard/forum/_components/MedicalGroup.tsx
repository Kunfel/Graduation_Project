import { useState } from 'react'
import ForumPost from './ForumPost'

interface Post {
    id: number
    title: string
    author: string
    content: string
}

interface MedicalGroupProps {
    name: string
    initialPosts: Post[]
}

export default function MedicalGroup({ name, initialPosts }: MedicalGroupProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [newPost, setNewPost] = useState({ title: '', content: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const post: Post = {
            id: Date.now(),
            title: newPost.title,
            author: 'Current User', // In a real app, this would be the logged-in user
            content: newPost.content
        }
        setPosts([post, ...posts])
        setNewPost({ title: '', content: '' })
    }

    return (
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">{name}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Post Content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Publish Post
                </button>
            </form>
            <div className="space-y-4">
                {posts.map((post) => (
                    <ForumPost key={post.id} {...post} />
                ))}
            </div>
        </div>
    )
}

