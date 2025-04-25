import { redirect } from "next/navigation"
import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ budgetId: string; expenseId: string }> }
) {
  const session = await verifySession()
  if (!session?.user) {
    redirect("/auth/login")
  }
  const { budgetId, expenseId } = await params
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(url, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
  const json = await req.json()

  if (!req.ok) {
    return Response.json(json.error, { status: 403 })
  }
  return Response.json(json)
}
