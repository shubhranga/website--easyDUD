import { useState } from "react";

type TabId = "flights" | "cab" | "bike" | "hotels";

const TABS: { id: TabId; label: string; emoji: string; disabled: boolean }[] = [
  { id: "flights", label: "Flights", emoji: "✈️", disabled: true },
  { id: "cab", label: "Cab", emoji: "🚕", disabled: true },
  { id: "bike", label: "Bike", emoji: "🏍️", disabled: true },
  { id: "hotels", label: "Hotels", emoji: "🏨", disabled: false },
];

const ROOM_TYPES = ["Standard", "Deluxe", "Suite"] as const;
type RoomType = (typeof ROOM_TYPES)[number];

const POPULAR_CITIES = [
  "Mumbai",
  "Delhi",
  "Goa",
  "Jaipur",
  "Bangalore",
  "Manali",
  "Udaipur",
  "Rishikesh",
];

const inputClass =
  "border border-gray-200 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800";
const labelClass = "block text-sm font-medium text-gray-600 mb-1";

function HotelsForm() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState<RoomType>("Standard");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="md:col-span-2">
        <label htmlFor="destination" className={labelClass}>
          City / Destination
        </label>
        <input
          id="destination"
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="checkin" className={labelClass}>
          Check-in
        </label>
        <input
          id="checkin"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="checkout" className={labelClass}>
          Check-out
        </label>
        <input
          id="checkout"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="md:col-span-2 border-t border-gray-100 my-4" />

      <div>
        <label htmlFor="rooms" className={labelClass}>
          Rooms
        </label>
        <input
          id="rooms"
          type="number"
          min={1}
          max={10}
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="guests" className={labelClass}>
          Guests
        </label>
        <input
          id="guests"
          type="number"
          min={1}
          max={20}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className={inputClass}
        />
      </div>

      <div className="md:col-span-2">
        <label className={labelClass}>Room Type</label>
        <div className="flex gap-2">
          {ROOM_TYPES.map((type) => {
            const selected = roomType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setRoomType(type)}
                className={
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors " +
                  (selected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200")
                }
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg transition-colors"
        >
          Search Hotels
        </button>
      </div>

      <div className="md:col-span-2 mt-2">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Popular destinations
        </p>
        <div className="flex flex-wrap gap-2 mt-3 overflow-x-auto">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setDestination(city)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}

export function ServiceTabs() {
  const [active, setActive] = useState<TabId>("hotels");

  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 rounded-2xl bg-white/80 backdrop-blur p-2 shadow-md">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={
                "flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-colors cursor-pointer " +
                (isActive
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-100")
              }
            >
              <span>
                <span className="mr-1">{tab.emoji}</span>
                {tab.label}
              </span>
              {isActive && tab.disabled && (
                <span className="animate-pulse bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                  Coming Soon 🚧
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-[200px] bg-white rounded-2xl shadow-md p-6 mt-2">
        {activeTab.disabled ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
            <div className="text-6xl">{activeTab.emoji}</div>
            <h3 className="text-2xl font-bold text-gray-800">Coming Soon</h3>
            <p className="text-gray-500">
              We're building this — check back soon!
            </p>
            <span className="animate-pulse bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">
              In Development 🚧
            </span>
          </div>
        ) : (
          <HotelsForm />
        )}
      </div>
    </div>
  );
}
