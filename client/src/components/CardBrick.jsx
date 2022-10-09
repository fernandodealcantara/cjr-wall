export default function CardBrick({ color, picture, name }) {
  return (
    <div
      className={`flex  items-center pl-6 bg-center bg-no-repeat min-h-[86px] min-w-[244px] max-h-[86px] max-w-[244px] rounded ${color}`}
    >
      <img
        className="border-4 border-[#000000] rounded-full h-12 w-12"
        src={picture}
        alt="avatar-user"
      />
      <div className="flex justify-center w-full">
        <span className="font-bold bg-[#000000] px-[1rem] rounded-lg ">
          {name}
        </span>
      </div>
    </div>
  )
}

export function CardBrickSkeleton() {
  return (
    <div className="bg-center bg-no-repeat min-h-[86px] min-w-[244px] max-h-[86px] max-w-[244px] rounded  bg-slate-900  bg-gridTij">
     <div className="animate-pulse flex items-center pl-6 h-[88px] w-full">
      <div className="border-[#000000] rounded-full bg-slate-700 min-h-[2.5rem] min-w-[2.5rem]"></div>
      <div className="flex justify-center w-full">
        <span className="font-bold bg-slate-700 px-[1rem] rounded-lg h-4 w-20"></span>
      </div>
     </div>
    </div>
  )
}