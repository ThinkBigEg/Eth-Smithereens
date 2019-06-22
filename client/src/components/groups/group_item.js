import React, { Component } from 'react'
import { Link } from "react-router-dom";

const GroupItem = (props) => {

  const { group } = props;
  return (
    <div className="flex border-b border-solid border-grey-light">

      <div className="pl-2 py-2 w-full">
        <Link to={`/group/${group[5]}`} >
          <div className="flex justify-between">
            <div>
              <div className="text-teal font-bold">{group[1]}  </div>
              <small>{group[6]} - Members</small>
            </div>
            {/* <div>
                      <div  className="text-grey hover:text-grey-dark"><i className="fa fa-times" /></div>
                    </div> */}
          </div>
        </Link>
        <div className="flex items-end justify-end">
          
          <button onClick={() => { props.action(group[5]) }} className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
            {props.isMember?"Leave":"Join"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupItem;