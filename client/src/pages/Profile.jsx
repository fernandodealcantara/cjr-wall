function Profile() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-NIP- grid overflow-hidden grid-cols-3 grid-rows-2 gap-2 w-[50vw] h-[70vh] rounded-lg p-8">
        <div className="bg-NIP-Card box m-[8%] rounded-lg">1</div>
        <div className="bg-NIP-Card box col-start-1 m-[8%] rounded-lg">2</div>
        <div className="bg-NIP-Card box row-start-1 row-end-3 col-start-2 m-[8%] rounded-lg">
          3
        </div>
        <div className="bg-NIP-Card box row-start-1 row-end-3 col-start-3 m-[8%] rounded-lg">
          4
        </div>
      </div>
    </div>
  )
}

export default Profile
