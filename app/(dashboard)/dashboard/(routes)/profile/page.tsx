import getUser from "@/actions/getUser";
import UserProfileCard from "./components/UserProfileCard";
import ProfileOverview from "./components/ProfileOverview";
import getRequests from "@/actions/getRequests";
import getAllWebsites from "@/actions/getAllWebsites";

export const revalidate = 0

const PrfofilePage = async ()  => {

    const users = await getUser()
    const requests = await getRequests()
    const websites = await getAllWebsites()

  return (
    <div className="flex mt-3 mx-auto max-w-[90rem] max-h-[85vh] overflow-hidden">
      <UserProfileCard users={users} />
      
      <ProfileOverview users={users} requests={requests} websites={websites}/>
    </div>
  );
}

export default PrfofilePage