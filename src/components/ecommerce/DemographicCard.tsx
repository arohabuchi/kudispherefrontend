// import TikTokIcon from "../../assets/images/tiktok.svg";
// /assets/images/tiktok.svg";
// import FacebookIcon from "../../assets/images/facebook.svg";
// import InstagramIcon from "../../assets/images/instagram.svg";
import WhatsAppIcon from "../../assets/images/whatsapp.svg";
import WhatsAppChannelIcon from "../../assets/images/whatsapp.svg";

export default function DemographicCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Connect With Us On Social Media
          </h3>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {/* TikTok */}
        {/* <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={TikTokIcon} alt="TikTok" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              TikTok
            </p>
          </div>
        </div> */}

        {/* Facebook */}
        {/* <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={FacebookIcon} alt="Facebook" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Facebook
            </p>
          </div>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
            Connect
          </button>
        </div> */}

        {/* Instagram */}
        {/* <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={InstagramIcon} alt="Instagram" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Instagram
            </p>
          </div>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
            Connect
          </button>
        </div> */}

        {/* WhatsApp */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img src={WhatsAppIcon} alt="WhatsApp" className="w-8 h-8" />
            <p className="font-medium text-gray-800 dark:text-gray-200">
              WhatsApp
            </p>
          </div>
            <a className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600" href="https://wa.me/+2348116306083" target="_blank" rel="noopener noreferrer">Connect</a>
          
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
            <a className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600" href="https://whatsapp.com/channel/0029VbBrnUPL7UVUkoKtP23q" target="_blank" rel="noopener noreferrer">Connect</a>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Connecting with us on social media allows for personalized insights and more seemless
        transaction.
      </p>
    </div>
  );
}


