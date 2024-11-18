import axios from "axios"

export const fetchFromOpenAip = async <TItem>(resource: string, extraParams: object = {}): Promise<Array<TItem>> => {
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

  const data = await (await axios.get(`https://api.core.openaip.net/api/${resource}`, config)).data
  return data.items as Array<TItem>
}
