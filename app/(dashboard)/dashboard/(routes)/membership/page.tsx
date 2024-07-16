import MembershipClient from "./components/client"

export const revalidate = 0

const MembershipPage = () => {

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <MembershipClient />
        </div>
    </div>
  )
}

export default MembershipPage