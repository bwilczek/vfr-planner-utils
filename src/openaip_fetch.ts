import axios from "axios"

export interface IOpenAipItem {
  name?: string | undefined
}

export interface IOpenAipCollection {
  items: Array<IOpenAipItem>
}

export const fetchFromOpenAip = async <C extends IOpenAipCollection, I extends IOpenAipItem>(resource: string, extraParams: object = {}): Promise<Array<I>> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-openaip-api-key": process.env.OPENAIP_API_TOKEN
    },
    params: {
      "page": 1,
      "limit": 1000,
      "sortBy": "name",
      "sortDesc": false,
      "country": "PL",
      "searchOptLwc": true
    }
  }

  config.params = {...config.params, ...extraParams}

  const data: C = await (await axios.get(`https://api.core.openaip.net/api/${resource}`, config)).data
  return data.items as Array<I>
}
