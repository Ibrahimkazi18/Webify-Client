
import Box from "@/components/box"
import Container from "@/components/container"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import Gallery from "./components/gallery/gallery"
import Info from "./components/info"
import getWebsite from "@/actions/getWebsite"


interface MorePageProps {
  params : {
      websiteId : string
      storeId : string
  }
}

const MorePage = async ({params} : MorePageProps) => {
  
  let website = await getWebsite(params.websiteId)


     website =  {
      id : website.id,
      name : website.name,
      price : website.price,
      url : website.url,
      owner : website.owner,
      ownerId : website.ownerId,
      category : website.category,
      images : website.images,
      isFeatured : website.isFeatured,
      createdAt: website.createdAt
    }

  

  return (
    <Container className="rounded-lg my-4 px-4">
            <Box className="text-sm items-center mt-12">
                <Link href={`/${params.storeId}`} className="flex items-center gap-2">
                    <Home className="w-4 h-4"/>
                    Main Page
                </Link>

                <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                <Link href={`/${params.storeId}/websites`} className="flex items-center gap-2">
                    Websites
                </Link>
                <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                <Link href={`/${params.storeId}/websites/${website.id}`} className="flex items-center gap-2">
                    {website.name}
                </Link>
            </Box>

            <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-10">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <Gallery images={website.images}/>

                    <div className="mt-20 px-4 sm:px-0">
                        <Info website={website}/>
                    </div>
                </div>
            </div>
    </Container>
  )
}

export default MorePage