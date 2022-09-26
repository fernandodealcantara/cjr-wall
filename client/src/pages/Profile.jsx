function Profile() {
  const users = {
      avatar: 'https://ca.slack-edge.com/T08QYLWLU-U036SJP0GS2-81e995d5bf9d-512',
      userName: 'Cassio',
      userID: '1',
      nucleo: 'NAV'
    }

    return (
        <div className='grid place-items-center h-screen'>
          <div class="bg-NAV grid overflow-hidden grid-cols-3 grid-rows-2 gap-2 w-[150vh] h-[70vh] rounded-lg p-10">
          	<div class="bg-NAVCard box m-10">1</div>
          	<div class="bg-NAVCard box col-start-1 m-10">2</div>
          	<div class="bg-NAVCard box row-start-1 row-end-3 col-start-2 m-10">3</div>
          	<div class="bg-NAVCard box row-start-1 row-end-3 col-start-3 m-10">4</div>
          </div>
        </div>
    )
  }
  
  export default Profile
  