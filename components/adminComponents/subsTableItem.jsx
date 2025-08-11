import React from "react";


const SubsTableItem = ({ email,mongoId, date, deleteEmail }) => {
    const emailDate=new Date(date)

    return(
        <tr className="bg-white border-b text-left">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace">
                {email ? email : "no email"}
            </th>
            <td className="px-6 py-4 ">{emailDate.toDateString()}</td>
            <td className="px-6 py-4 cursor-pointer" onClick={()=>deleteEmail(mongoId)}>X</td>
        </tr>
    )
}


export default SubsTableItem;