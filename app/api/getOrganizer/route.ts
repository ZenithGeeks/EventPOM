export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing organizer ID' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        const response = await fetch(`http://localhost:3001/organizers/${id}`, {
            cache: "no-store"
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : "Unknown error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}