export async function GET() {
    try {
        const response = await fetch("http://localhost:3001/getEvents", {
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