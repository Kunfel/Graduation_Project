interface ForumPostProps {
    title: string
    author: string
    content: string
  }
  
  export default function ForumPost({ title, author, content }: ForumPostProps) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">Posted by: {author}</p>
        <p>{content}</p>
      </div>
    )
  }
  