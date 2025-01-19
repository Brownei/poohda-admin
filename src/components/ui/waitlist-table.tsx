import React from 'react'

type Waitlist = {
  name: string
  number: string
  email: string
}

const WaitlistTable = ({ waitlist }: { waitlist: Waitlist[] }) => {
  return (
    <div className="overflow-x-auto font-Lato">
      <table className="min-w-full divide-y divide-border rounded-md shadow-sm bg-background text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Full Name</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Email</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Phone Number</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Country</th>
          </tr>
        </thead>
        <tbody className="[&>tr]:border-b [&>tr]:last-child:border-0 divide-y divide-border">
          {waitlist?.length === 0 ? (
            <div className='absolute top-[50%] left-[50%] lg:left-[59%] translate-x-[-50%] translate-y-[-50%] z-30 font-bold font-Railway text-[1.3rem]'>No one's waiting</div>
          ) : (
            <>
              {waitlist?.map((item, index) => {
                const countryCode = item.number.slice(0, 3)
                const phoneNumber = item.number.slice(3)
                return (
                  <tr
                    key={index}
                    className={`hover:bg-muted transition-colors`}
                  >
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3 line-clamp-1">0{phoneNumber}</td>
                    <td className="px-4 py-3 ">+{countryCode}</td>
                  </tr>
                )
              })}
            </>
          )}
        </tbody>
      </table>
    </div >)
}

export default WaitlistTable;
