
-- ============ TABLES ============
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  popular BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.buses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_name TEXT NOT NULL,
  is_government BOOLEAN NOT NULL DEFAULT false,
  bus_type TEXT NOT NULL, -- AC Sleeper, AC Semi-Sleeper, Non-AC Sleeper, Seater, Volvo
  amenities TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.0,
  total_rating_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id UUID NOT NULL REFERENCES public.buses(id) ON DELETE CASCADE,
  from_city_id UUID NOT NULL REFERENCES public.cities(id),
  to_city_id UUID NOT NULL REFERENCES public.cities(id),
  departure_time TEXT NOT NULL, -- HH:MM
  arrival_time TEXT NOT NULL,
  duration_mins INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  seats_total INTEGER NOT NULL DEFAULT 40,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  route_id UUID NOT NULL REFERENCES public.routes(id),
  journey_date DATE NOT NULL,
  seats TEXT[] NOT NULL,
  total_fare NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed | cancelled
  pnr TEXT NOT NULL UNIQUE,
  boarding_point TEXT,
  dropping_point TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  seat_number TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============ RLS ============
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passengers ENABLE ROW LEVEL SECURITY;

-- Public catalog readable by everyone
CREATE POLICY "cities readable by all" ON public.cities FOR SELECT USING (true);
CREATE POLICY "buses readable by all" ON public.buses FOR SELECT USING (true);
CREATE POLICY "routes readable by all" ON public.routes FOR SELECT USING (true);

-- Profiles: each user manages their own
CREATE POLICY "profiles select own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles insert own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles update own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Bookings: only owner
CREATE POLICY "bookings select own" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookings insert own" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookings update own" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Passengers: only via owned booking
CREATE POLICY "passengers select own" ON public.passengers FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid())
);
CREATE POLICY "passengers insert own" ON public.passengers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid())
);

-- ============ TRIGGERS ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE INDEX idx_routes_from_to ON public.routes(from_city_id, to_city_id);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
