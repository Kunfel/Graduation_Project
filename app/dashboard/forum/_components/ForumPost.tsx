import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ForumPostProps {
    title: string
    author: string
    content: string
}

export default function ForumPost({ title, author, content }: ForumPostProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <div>
                        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                        <p className="text-sm text-muted-foreground">Posted by {author}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{content}</p>
            </CardContent>
        </Card>
    )
}
