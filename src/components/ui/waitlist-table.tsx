import React from 'react'

const WaitlistTable = ({ waitlist }: { waitlist: any }) => {
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
          {waitlist.length === 0 ? (
            <div className='absolute top-[50%] left-[59%] translate-x-[-50%] translate-y-[-50%] z-30 font-bold font-Railway text-[1.3rem]'>No one's waiting</div>
          ) : (
            <>
              {waitlist.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-muted transition-colors ${item.soldOut ? "text-muted-foreground" : "text-foreground"
                    }`}
                >
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-3 line-clamp-1">{item.description}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div >)
}

export default WaitlistTable;
