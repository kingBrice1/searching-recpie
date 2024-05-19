import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Loading from './Loading'
import ErrorMassege from './ErrorMassege'
import EmptyScreen from './EmptyScreen'
import Card from './Card'

export default function Home() {
  const [data, setData] = useState([]);
  const [isErrorStatus, setErrorStatus] = useState(false)
  const [isLoadingStatus, setLoadingStatus] = useState (false)

  const isThereAnyData = data && data.length > 0;
  return (
    <>
    <SearchBar isError={setErrorStatus} isLoading={setLoadingStatus} setData={setData}/>
    {isLoadingStatus ? <Loading /> : isErrorStatus ? <ErrorMassege /> : isThereAnyData ? ( 
         data.map((data) => {
           return <Card key={data.ingredients} {...data} />
         })) : <EmptyScreen /> }
    </>
  )
}
