
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import SettingsForm from "./components/settings-form"
import getUser from "@/actions/getUser"

interface SettingspageProps {
  params: {
    storeId : string,
  }
}


const Settings = async ({params} : SettingspageProps) => {

  const {userId} = auth()

  if(!userId){
    redirect("/sign-in")
  }

  const users = await getUser()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-8 pt-6">
        <SettingsForm users={users} />
      </div>
    </div>
  )
}

export default Settings