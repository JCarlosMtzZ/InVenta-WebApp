import NumberAnimation from "./NumberAnimation";

import { roundToK } from "../utilities/dashboard";

function MetricCard({ bgColor, icon, text, data }) {
  return (
    <div className={`${bgColor} h-[140px] w-[160px] rounded-lg shadow-md flex flex-col gap-0.5 p-4 justify-between`}>
      {icon}
      <div>
        <NumberAnimation
          textSize="text-2xl"
          textColor="text-white"
          fontWeight="font-semibold"
          endValue={roundToK(data)}
          prefix=''
          suffix={Math.floor(data / 1000) >= 1 ? 'K' : ''}
          duration={1000}
        />
        <p className="text-md text-white">{text}</p>
      </div>
    </div>
  );
};

export default MetricCard;