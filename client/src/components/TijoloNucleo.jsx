export default function TijoloNUC({ color, avatar, userName, userID }) {
  return (
    <div
      className={`w-[18rem] h-[6.5rem] rounded-lg border-4 border-[#000000] bg-center bg-no-repeat bg-cover flex items-center gap-x-[5rem] px-[1rem] bg-origin-border ${color}`}
    >
      <img
        className="border-4 border-[#000000] rounded-full w-[4rem] h-[4rem]"
        src={avatar}
        alt="avatar-user"
      />
      <span className="font-bold bg-[#000000] px-[1rem] rounded-lg ">
        {userName}
      </span>
    </div>
  )
}
