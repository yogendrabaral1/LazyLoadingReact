import React from 'react';

import './DataList.css';

const DataList = ({data}) => {
  return (
    <ul className='dataList'>
        {
            data && data.map((itm,index) => (
            <li key={index} className='dataListItem'>
                <span className='cardIndicator'>{index+1}</span>
                <p className='title'>{itm.title}</p>
                <p>{itm.body}</p>
            </li>
            ))
        }
    </ul>
  )
}

export default DataList