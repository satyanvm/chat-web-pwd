interface PageProps{
    params: {
        roomId: string
    }
}

export default async function ChatRoom({ params }: PageProps){
    const { roomId } = await params;
    const messages = await prismaClient
    return (
        <div>
             
        </div>
    )
}