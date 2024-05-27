import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Stock, createStock, getStocks } from "~/api/stocks";

export const loader = async ({}: LoaderFunctionArgs) => {
  const stockList = await getStocks();
  return json({ stockList });
};

export const action = async({
  request
}: ActionFunctionArgs) => {
  const body = await request.formData()
  await createStock(Object.fromEntries(body))
  return redirect('/stocks')

}

export default function StocksList() {
  const { stockList } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        {stockList?.length ? (
          <div>
            {stockList.map((stock: Stock) => (
              <div key={stock.id}>
                <span style={{"paddingRight": "10px"}}>{stock.attributes.code}</span>
                <span style={{"paddingRight": "10px"}}>{stock.attributes.currentPrice}</span>
                <span style={{"paddingRight": "10px"}}>{stock.attributes.stockQuantity}</span>
                <span style={{"paddingRight": "10px"}}>{stock.attributes.totalValue}</span>
                <Form action={"delete/"+ stock.id.toString()} method="post" >
                  <button style={{"paddingRight": "10px"}} onClick={() => console.log(stock.id)}>Delete</button>
                </Form>
              </div>
            ))}
          </div>
        ) : (
          <span>no stock</span>
        )}
      </div>
      <br></br>
      <div>
        <Form method="post" onSubmit={(e: any) => e.target.form}>
          <span>Add new stock</span>
          <div>
            <span>Code</span>
            <input type="text" name="code" />
          </div>
          <div>
            <span>Current price</span>
            <input type="number" name="currentPrice"/>
          </div>
          <div>
            <span>Quantity</span>
            <input type="number" name="stockQuantity"/>
          </div>
          <div>
            <span>Total value</span>
            <input type="number" disabled name="totalValue"/>
          </div>
          <button type="submit">Add Stock</button>
        </Form>
      </div>
    </div>
  );
}
