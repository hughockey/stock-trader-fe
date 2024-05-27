
const url = process.env.BACKEND_URL || 'http://localhost:1337/api'

export type Stock = {
  id: number;
  attributes: {
    code: string;
    currentPrice: number;
    stockQuantity: number;
    totalValue: number
  }
}

export async function getStocks(): Promise<Stock[] | undefined> {
  try {
    const response = await fetch(url + "/stocks")
    const data = await response.json()
    return data.data as Stock[]
  } catch (error) {
    console.log(error)
    throw new Error("Oh no, can't get the stocks!")
  }
}

export async function createStock(stock: any): Promise<Stock> { //TODO: change any to real type
  try {
    const response = await fetch(url + "/stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: stock }),
    });
    const responseData = await response.json();
    return responseData.data
  } catch (error) {
    console.log(error)
    throw new Error("Oh no, can't add the new stock, sorry!")
  }
} 

export async function deleteStock(stockId: number): Promise<any> {
  try {
    console.log(stockId)
    const response = await fetch(url + "/stocks/" + stockId, {
      method: "DELETE"
    });
    const responseData = await response.json();
    console.log(responseData.data)
  } catch (error) {
    console.log(error)
    throw new Error("Oh no, can't delete stock, sorry!")
  }
}