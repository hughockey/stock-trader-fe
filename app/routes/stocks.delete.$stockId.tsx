import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { deleteStock } from "~/api/stocks";

export const action = async ({params}: ActionFunctionArgs) => {
  await deleteStock(Number(params.stockId))
  return redirect("/stocks")
}