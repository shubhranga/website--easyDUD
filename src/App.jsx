import { ChevronDown, Car, Bus, Plane, Hotel } from 'lucide-react'
import { useState, useEffect } from 'react'

function App() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / 1728
      const scaleY = window.innerHeight / 1220
      setScale(Math.min(scaleX, scaleY, 1))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="relative w-[1728px] h-[1220px]" style={{ background: 'linear-gradient(180deg, rgba(221, 230, 250, 1) 0%, rgba(240, 234, 242, 1) 100%)', transform: `scale(${scale})`, transformOrigin: 'center center', flexShrink: 0 }}>
      {/* ===== SIDEBAR NAV ===== */}
      <SidebarNav />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO HEADING ===== */}
      <h1 className="absolute left-[60px] top-[143px] w-[844px] text-[75px] font-normal text-[#2D2D2D] leading-[1.05] font-['Satoshi',sans-serif]">
        Ride smarter where every trip feels effortless....
      </h1>

      {/* ===== DESCRIPTION ===== */}
      <p className="absolute left-[1101px] top-[227px] w-[588px] text-[24px] font-normal text-black leading-[1.35] font-['Satoshi',sans-serif]">
        Plan seamless rides with real-time booking, transparent pricing, and smooth journeys designed for comfort from pickup to destination.
      </p>

      {/* ===== HERO IMAGE ===== */}
      <img
        src="/images/hero-main.png"
        alt="Hero illustration"
        className="absolute left-[137px] top-[383px] w-[700px] h-[700px] object-cover rounded-[43px]"
      />

      {/* ===== WHITE OVERLAY CARD ===== */}
      <div className="absolute left-[589px] top-[383px] w-[248px] h-[173px] rounded-[32px] bg-white/70" />
      <p className="absolute left-[605px] top-[415px] w-[216px] text-[20px] font-light text-[#666666] leading-[1.35] font-['Satoshi',sans-serif]">
        Travel is about the stories you collect along the way and also make the memories
      </p>

      {/* ===== FEATURE TAGS ===== */}
      {/* Row 1 */}
      <div className="absolute left-[172px] top-[953px] w-[128px] h-[42px] rounded-[43px] bg-white/10" />
      <span className="absolute left-[189px] top-[963px] text-[16px] font-light text-white/87 font-['General_Sans',sans-serif]">Easy Booking</span>
      <div className="absolute left-[304px] top-[953px] w-[119px] h-[42px] rounded-[43px] bg-white/10" />
      <span className="absolute left-[317px] top-[963px] text-[16px] font-light text-white font-['General_Sans',sans-serif]">Flexible Plans</span>
      {/* Row 2 */}
      <div className="absolute left-[172px] top-[1005px] w-[137px] h-[42px] rounded-[43px] bg-white/10" />
      <span className="absolute left-[187px] top-[1015px] text-[16px] font-light text-white font-['General_Sans',sans-serif]">Verified Guides</span>
      <div className="absolute left-[317px] top-[1005px] w-[116px] h-[42px] rounded-[43px] bg-white/10" />
      <span className="absolute left-[329px] top-[1015px] text-[16px] font-light text-white font-['General_Sans',sans-serif]">24/7 Support</span>
      <div className="absolute left-[441px] top-[1005px] w-[149px] h-[42px] rounded-[43px] bg-white/10" />
      <span className="absolute left-[450px] top-[1015px] text-[16px] font-light text-white font-['General_Sans',sans-serif]">Custom Itineraries</span>

      {/* ===== BOOKING PANEL BACKGROUND ===== */}
      <img
        src="/images/booking-bg.png"
        alt=""
        className="absolute left-[860px] top-[383px] w-[596px] h-[703px] rounded-[45px] object-cover opacity-70"
      />

      {/* ===== RIDE TYPE TABS ===== */}
      <div className="absolute left-[906px] top-[418px] w-[177px] h-[52px] rounded-[21.5px] bg-[#F0EAF2]" />
      <span className="absolute left-[929px] top-[432px] text-[20px] font-light text-black font-['Gilroy',sans-serif]">Reserve a ride</span>
      <div className="absolute left-[1092px] top-[418px] w-[177px] h-[52px] rounded-[21.5px] bg-[#F0EAF2]" />
      <span className="absolute left-[1113px] top-[432px] text-[20px] font-light text-black font-['Gilroy',sans-serif]">Request a ride</span>
      <div className="absolute left-[1278px] top-[418px] w-[156px] h-[52px] rounded-[21.5px] bg-[#F0EAF2]" />
      <span className="absolute left-[1300px] top-[432px] text-[20px] font-light text-black font-['Gilroy',sans-serif]">Bike Pooling</span>

      {/* ===== BOOKING HEADING ===== */}
      <p className="absolute left-[906px] top-[504px] w-[528px] text-[48px] font-light text-black leading-[1.1] font-['Satoshi',sans-serif]">
        Request a ride for now or later.... !!
      </p>

      {/* ===== PICKUP INPUT ===== */}
      <div className="absolute left-[906px] top-[667px] w-[414px] h-[63px] rounded-[21.5px] border border-[rgba(0,0,0,0.19)]" />
      <svg className="absolute left-[931px] top-[685px] w-[22px] h-[27px]" viewBox="0 0 22 27" fill="none">
        <path d="M11 0C4.93 0 0 4.93 0 11c0 8.25 11 16 11 16s11-7.75 11-16c0-6.07-4.93-11-11-11zm0 14.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" fill="rgba(110,110,110,0.7)"/>
      </svg>
      <span className="absolute left-[964px] top-[687px] text-[20px] font-light text-[rgba(110,110,110,0.78)] font-['Gilroy',sans-serif]">Enter Your Pickup Location</span>

      {/* ===== DROPOFF INPUT ===== */}
      <div className="absolute left-[906px] top-[763px] w-[414px] h-[63px] rounded-[21.5px] border border-[rgba(0,0,0,0.19)]" />
      <svg className="absolute left-[932px] top-[785px] w-[19px] h-[19px]" viewBox="0 0 19 19" fill="none">
        <circle cx="9.5" cy="9.5" r="9" stroke="rgba(110,110,110,0.7)" strokeWidth="1"/>
        <circle cx="9.5" cy="9.5" r="4" fill="rgba(110,110,110,0.7)"/>
      </svg>
      <span className="absolute left-[964px] top-[783px] text-[20px] font-light text-[rgba(110,110,110,0.7)] font-['Gilroy',sans-serif]">Dropoff Location</span>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="absolute left-[906px] top-[859px] w-[163px] h-[63px] rounded-[21.5px] bg-[#F0EAF2]" />
      <span className="absolute left-[941px] top-[879px] text-[20px] font-light text-black font-['Gilroy',sans-serif]">Book Ride</span>
      <div className="absolute left-[1134px] top-[859px] w-[186px] h-[63px] rounded-[21.5px] bg-[#F0EAF2]" />
      <span className="absolute left-[1154px] top-[879px] text-[20px] font-light text-black font-['Gilroy',sans-serif]">Schedule a ride</span>

      {/* ===== INSTRUCTION ===== */}
      <span className="absolute left-[906px] top-[952px] text-[16px] font-light text-[#1E1E1E] font-['Satoshi',sans-serif]">Instruction:</span>

      {/* ===== MAP IMAGE ===== */}
      <img
        src="/images/booking-map.png"
        alt="Route map"
        className="absolute left-[1363px] top-[675px] w-[324px] h-[412px] object-cover rounded-[45px]"
      />

      {/* ===== SPECIAL FAIRS CARD ===== */}
      <SpecialFairsCard />

      {/* ===== SEARCH ICON (top right) ===== */}
      <div className="absolute left-[1337px] top-[82px] w-[38px] h-[38px] rounded-full bg-black flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="6" stroke="white" strokeWidth="2"/>
          <path d="M12 12l4.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
    </div>
  )
}

/* ─────────── NAVBAR ─────────── */
function Navbar() {
  return (
    <>
      {/* Nav pill */}
      <div className="absolute left-[625px] top-[70px] w-[570px] h-[61px] rounded-[146px] bg-white border-[0.48px] border-[rgba(103,103,103,0.29)]" />
      {/* Nav links */}
      <span className="absolute left-[664px] top-[89px] text-[18px] font-normal text-[#464646] font-['Satoshi',sans-serif]">Home</span>
      <span className="absolute left-[748px] top-[89px] text-[18px] font-normal text-[#464646] font-['Satoshi',sans-serif]">About Us</span>
      <span className="absolute left-[857px] top-[89px] text-[18px] font-normal text-[#464646] font-['Satoshi',sans-serif]">Our Services</span>
      <span className="absolute left-[994px] top-[89px] text-[18px] font-normal text-[#464646] font-['Satoshi',sans-serif]">Blog</span>
      <span className="absolute left-[1066px] top-[89px] text-[18px] font-normal text-[#464646] font-['Satoshi',sans-serif]">Contact Us</span>

      {/* See all plans pill */}
      <div className="absolute left-[1395px] top-[70px] w-[134px] h-[61px] rounded-[146px] bg-white border-[0.48px] border-[rgba(103,103,103,0.29)]" />
      <span className="absolute left-[1413px] top-[89px] text-[18px] font-normal text-black font-['Satoshi',sans-serif]">See all plans</span>

      {/* Login pill */}
      <div className="absolute left-[1537px] top-[70px] w-[151px] h-[61px] rounded-[146px] bg-white border-[0.48px] border-[rgba(103,103,103,0.29)]" />
      <span className="absolute left-[1552px] top-[89px] text-[18px] font-normal text-black font-['Satoshi',sans-serif]">Login & Signup</span>

      {/* User avatar */}
      <div className="absolute left-[1326px] top-[70px] w-[61px] h-[61px] rounded-full bg-white border-[0.48px] border-[rgba(103,103,103,0.29)]" />
    </>
  )
}

/* ─────────── SPECIAL FAIRS CARD ─────────── */
function SpecialFairsCard() {
  return (
    <>
      {/* Card background */}
      <div className="absolute left-[1464px] top-[383px] w-[224px] h-[276px] rounded-[22.5px] bg-white" />

      {/* Title */}
      <span className="absolute left-[1481px] top-[401px] text-[16px] font-light text-black font-['Satoshi',sans-serif]">Special Fairs</span>

      {/* Dashed lines */}
      <div className="absolute left-[1464px] top-[430px] w-[224px] border-t border-dashed border-[rgba(0,0,0,0.15)]" />
      <div className="absolute left-[1464px] top-[478px] w-[224px] border-t border-dashed border-[rgba(0,0,0,0.15)]" />
      <div className="absolute left-[1464px] top-[524px] w-[224px] border-t border-dashed border-[rgba(0,0,0,0.15)]" />
      <div className="absolute left-[1464px] top-[570px] w-[224px] border-t border-dashed border-[rgba(0,0,0,0.15)]" />
      <div className="absolute left-[1464px] top-[618px] w-[224px] border-t border-dashed border-[rgba(0,0,0,0.15)]" />

      {/* Items */}
      <div className="absolute left-[1481px] top-[447px] w-[24px] h-[24px] rounded-full bg-[rgba(38,38,38,0.15)] border-[0.45px] border-white/10" />
      <span className="absolute left-[1514px] top-[449px] text-[14px] font-light text-black font-['Satoshi',sans-serif]">Students</span>
      <ChevronDown className="absolute left-[1655px] top-[452px] w-[16px] h-[16px] text-[rgba(30,30,30,0.49)]" />

      <div className="absolute left-[1481px] top-[493px] w-[24px] h-[24px] rounded-full bg-[rgba(38,38,38,0.15)] border-[0.45px] border-white/10" />
      <span className="absolute left-[1514px] top-[495px] text-[14px] font-light text-black font-['Satoshi',sans-serif]">Senior Citizen</span>
      <ChevronDown className="absolute left-[1655px] top-[497px] w-[16px] h-[16px] text-[rgba(30,30,30,0.49)]" />

      <div className="absolute left-[1481px] top-[539px] w-[24px] h-[24px] rounded-full bg-[rgba(38,38,38,0.15)] border-[0.45px] border-white/10" />
      <span className="absolute left-[1514px] top-[541px] text-[14px] font-light text-black font-['Satoshi',sans-serif]">Doctor & Nurses</span>
      <ChevronDown className="absolute left-[1655px] top-[542px] w-[16px] h-[16px] text-[rgba(30,30,30,0.49)]" />

      <div className="absolute left-[1481px] top-[587px] w-[24px] h-[24px] rounded-full bg-[rgba(38,38,38,0.15)] border-[0.45px] border-white/10" />
      <span className="absolute left-[1514px] top-[589px] text-[14px] font-light text-black font-['Satoshi',sans-serif]">School & Girls</span>
      <ChevronDown className="absolute left-[1655px] top-[587px] w-[16px] h-[16px] text-[rgba(30,30,30,0.49)]" />
    </>
  )
}

/* ─────────── SIDEBAR NAV ─────────── */
function SidebarNav() {
  return (
    <div className="absolute left-[-104px] top-[383px] w-[207px] h-[704px] rounded-r-[51px] bg-[#FAF9FB]" style={{ boxShadow: '1px 6px 53.3px 0px rgba(0, 0, 0, 0.25), -1px -6px 53.3px 0px rgba(0, 0, 0, 0.25)' }}>
      {/* Cab */}
      <div className="absolute left-[120px] top-[113px] w-[68px] h-[69px] rounded-[20px] bg-white border-[0.45px] border-[rgba(0,0,0,0.28)] flex items-center justify-center">
        <Car className="w-7 h-7 text-black" />
      </div>
      <span className="absolute left-[137px] top-[191px] text-[16px] font-light text-black font-['Gilroy',sans-serif]">Cab</span>

      {/* Bus */}
      <div className="absolute left-[120px] top-[241px] w-[68px] h-[69px] rounded-[20px] bg-white border-[0.45px] border-[rgba(0,0,0,0.28)] flex items-center justify-center">
        <Bus className="w-7 h-7 text-[rgba(26,26,26,0.46)]" />
      </div>
      <span className="absolute left-[140px] top-[319px] text-[16px] font-light text-[rgba(102,102,102,0.48)] font-['Gilroy',sans-serif]">Bus</span>

      {/* Hotels */}
      <div className="absolute left-[120px] top-[368px] w-[68px] h-[69px] rounded-[20px] bg-white border-[0.45px] border-[rgba(0,0,0,0.28)] flex items-center justify-center">
        <Hotel className="w-7 h-7 text-[rgba(26,26,26,0.46)]" />
      </div>
      <span className="absolute left-[131px] top-[445px] text-[16px] font-light text-[rgba(102,102,102,0.48)] font-['Gilroy',sans-serif]">Hotels</span>

      {/* Flights */}
      <div className="absolute left-[120px] top-[493px] w-[68px] h-[69px] rounded-[20px] bg-white border-[0.45px] border-[rgba(0,0,0,0.28)] flex items-center justify-center">
        <Plane className="w-7 h-7 text-[rgba(26,26,26,0.46)]" />
      </div>
      <span className="absolute left-[131px] top-[569px] text-[16px] font-light text-[rgba(102,102,102,0.48)] font-['Gilroy',sans-serif]">Flights</span>
    </div>
  )
}

export default App
