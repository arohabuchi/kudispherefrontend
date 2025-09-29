import TikTokIcon from "../../assets/images/tiktok.svg";
// /assets/images/tiktok.svg";
import FacebookIcon from "../../assets/images/facebook.svg";
import InstagramIcon from "../../assets/images/instagram.svg";
import WhatsAppIcon from "../../assets/images/whatsapp.svg";
import WhatsAppChannelIcon from "../../assets/images/whatsapp.svg";

export default function DemographicCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Connect Your Social Media
          </h3>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {/* TikTok */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={TikTokIcon} alt="TikTok" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              TikTok
            </p>
          </div>
        </div>

        {/* Facebook */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={FacebookIcon} alt="Facebook" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Facebook
            </p>
          </div>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
            Connect
          </button>
        </div>

        {/* Instagram */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={InstagramIcon} alt="Instagram" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Instagram
            </p>
          </div>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
            Connect
          </button>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={WhatsAppIcon} alt="WhatsApp" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              WhatsApp
            </p>
          </div>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
            Connect
          </button>
        </div>

        {/* WhatsApp Channel */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img
              src={WhatsAppChannelIcon}
              alt="WhatsApp Channel"
              className="w-8 h-8"
            />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              WhatsApp Channel
            </p>
          </div>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
            Connect
          </button>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Connecting your social media allows for personalized insights and easier
        sharing.
      </p>
    </div>
  );
}





// import { useState } from "react";
// import { Dropdown } from "../ui/dropdown/Dropdown";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { MoreDotIcon } from "../../icons";
// import CountryMap from "./CountryMap";

// export default function DemographicCard() {
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleDropdown() {
//     setIsOpen(!isOpen);
//   }

//   function closeDropdown() {
//     setIsOpen(false);
//   }
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
//       <div className="flex justify-between">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//             Customers Demographic
//           </h3>
//           <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
//             Number of customer based on country
//           </p>
//         </div>
//         <div className="relative inline-block">
//           <button className="dropdown-toggle" onClick={toggleDropdown}>
//             <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
//           </button>
//           <Dropdown
//             isOpen={isOpen}
//             onClose={closeDropdown}
//             className="w-40 p-2"
//           >
//             <DropdownItem
//               onItemClick={closeDropdown}
//               className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               View More
//             </DropdownItem>
//             <DropdownItem
//               onItemClick={closeDropdown}
//               className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               Delete
//             </DropdownItem>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
//         <div
//           id="mapOne"
//           className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
//         >
//           <CountryMap />
//         </div>
//       </div>

//       <div className="space-y-5">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="items-center w-full rounded-full max-w-8">
//               <img src="./images/country/country-01.svg" alt="usa" />
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
//                 USA
//               </p>
//               <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                 2,379 Customers
//               </span>
//             </div>
//           </div>

//           <div className="flex w-full max-w-[140px] items-center gap-3">
//             <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
//               <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
//             </div>
//             <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
//               79%
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="items-center w-full rounded-full max-w-8">
//               <img src="./images/country/country-02.svg" alt="france" />
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
//                 France
//               </p>
//               <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                 589 Customers
//               </span>
//             </div>
//           </div>

//           <div className="flex w-full max-w-[140px] items-center gap-3">
//             <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
//               <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
//             </div>
//             <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
//               23%
//             </p>
//           </div>
//         </div>
//       </div> 
//     </div>
//   );
// }
