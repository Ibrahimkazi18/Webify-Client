
import RequestForm from "./components/request-form"
import getRequests from "@/actions/getRequests"



const ProductPage = async ({params} : {params : {storeId : string, requestId : string}}) => {

  const request = await getRequests()

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <RequestForm 
              requestsData={request} 
            />
        </div>
    </div>
  )
}

export default ProductPage