-- =========================================
-- ROOVIA DATABASE SCHEMA
-- =========================================

-- 1. Destinations
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    best_season TEXT NOT NULL,
    cost_level TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    theme TEXT DEFAULT 'light',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bucket Items
CREATE TABLE IF NOT EXISTS public.bucket_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, destination_id)
);

-- 4. Trips
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Trip Destinations
CREATE TABLE IF NOT EXISTS public.trip_destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    UNIQUE (trip_id, destination_id)
);

-- =========================================
-- ENABLE ROW LEVEL SECURITY
-- =========================================

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bucket_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_destinations ENABLE ROW LEVEL SECURITY;

-- =========================================
-- ROW LEVEL SECURITY POLICIES
-- =========================================

-- DESTINATIONS: Everyone can view destinations.
CREATE POLICY "Anyone can view destinations"
ON public.destinations
FOR SELECT
TO anon, authenticated
USING (true);

-- PROFILES
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = (select auth.uid()));

CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = (select auth.uid()))
WITH CHECK (id = (select auth.uid()));

-- BUCKET ITEMS
CREATE POLICY "Users can manage their own bucket items"
ON public.bucket_items
FOR ALL
TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

-- TRIPS
CREATE POLICY "Users can manage their own trips"
ON public.trips
FOR ALL
TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

-- TRIP DESTINATIONS
CREATE POLICY "Users can manage their own trip destinations"
ON public.trip_destinations
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.trips AS t
        WHERE t.id = trip_destinations.trip_id
        AND t.user_id = (select auth.uid())
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM public.trips AS t
        WHERE t.id = trip_destinations.trip_id
        AND t.user_id = (select auth.uid())
    )
);

-- =========================================
-- SEED DATA: 20 DESTINATIONS
-- =========================================

INSERT INTO public.destinations (
    name,
    country,
    region,
    category,
    description,
    image_url,
    best_season,
    cost_level
)
VALUES
(
    'Athens', 'Greece', 'Attica', 'history',
    'Explore ancient monuments, archaeological sites, and Greek culture.',
    'https://images.unsplash.com/photo-1779891425387-db3e9263a1a4?auto=format&fit=crop&fm=jpg&ixid=NHwxMjA3fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'April-June', 'low'
),
(
    'Bali', 'Indonesia', 'Bali', 'beach',
    'Visit tropical beaches, temples, and beautiful coastal villages.',
    'https://images.unsplash.com/photo-1746107386072-4c69a5bb5274?auto=format&fit=crop&w=1200&q=80',
    'April-October', 'low'
),
(
    'Banff', 'Canada', 'Alberta', 'mountains',
    'Discover mountain views, turquoise lakes, and hiking trails.',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    'June-September', 'medium'
),
(
    'Barcelona', 'Spain', 'Catalonia', 'city',
    'Enjoy colorful architecture, local markets, and lively city streets.',
    'https://images.unsplash.com/photo-1792319770711-e33c3e14c3b8?auto=format&fit=crop&w=1200&q=80',
    'May-June', 'medium'
),
(
    'Cancun', 'Mexico', 'Quintana Roo', 'beach',
    'Enjoy beautiful beaches, clear blue water, and relaxing resorts.',
    'https://images.unsplash.com/photo-1772656945540-77583e484667?auto=format&fit=crop&w=1200&q=80',
    'December-April', 'low'
),
(
    'Costa Rica', 'Costa Rica', 'Guanacaste', 'adventure',
    'Enjoy rainforests, wildlife, waterfalls, and outdoor activities.',
    'https://images.unsplash.com/photo-1682965740861-fdd2065bdd2e?auto=format&fit=crop&w=1200&q=80',
    'December-April', 'low'
),
(
    'Iceland', 'Iceland', 'Southern Region', 'adventure',
    'Experience waterfalls, glaciers, volcanoes, and northern lights.',
    'https://images.unsplash.com/photo-1661041524618-220a2a2b8b74?auto=format&fit=crop&w=1200&q=80',
    'June-August', 'high'
),
(
    'Kyoto', 'Japan', 'Kansai', 'history',
    'Visit traditional temples, historic streets, and peaceful gardens.',
    'https://images.unsplash.com/photo-1751497018015-74e13bba9ab6?auto=format&fit=crop&w=1200&q=80',
    'March-May', 'medium'
),
(
    'Machu Picchu', 'Peru', 'Cusco', 'adventure',
    'Explore ancient Inca ruins surrounded by mountain scenery.',
    'https://images.unsplash.com/photo-1789264139695-a256badf50b2?auto=format&fit=crop&w=1200&q=80',
    'May-September', 'low'
),
(
    'Maui', 'United States', 'Hawaii', 'beach',
    'Explore tropical beaches, scenic drives, and beautiful sunsets.',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'April-May', 'high'
),
(
    'New York City', 'United States', 'New York', 'city',
    'Visit famous landmarks, museums, restaurants, and shopping areas.',
    'https://images.unsplash.com/photo-1767342976245-b34c150bddf9?auto=format&fit=crop&w=1200&q=80',
    'April-June', 'high'
),
(
    'Paris', 'France', 'Ile-de-France', 'city',
    'Explore famous landmarks, art museums, cafes, and city streets.',
    'https://images.unsplash.com/photo-1521244550984-ab1883eb0ac2?auto=format&fit=crop&w=1200&q=80',
    'April-June', 'high'
),
(
    'Patagonia', 'Argentina', 'Santa Cruz', 'adventure',
    'Discover glaciers, mountain landscapes, and outdoor adventures.',
    'https://images.unsplash.com/photo-1736390739590-72fccb016af0?auto=format&fit=crop&w=1200&q=80',
    'November-March', 'medium'
),
(
    'Petra', 'Jordan', 'Ma-an', 'history',
    'Discover ancient architecture carved into beautiful red rock.',
    'https://images.unsplash.com/photo-1724618554459-a348dc6ffc8c?auto=format&fit=crop&w=1200&q=80',
    'March-May', 'low'
),
(
    'Rome', 'Italy', 'Lazio', 'history',
    'Discover historic landmarks, ancient ruins, and Italian culture.',
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80',
    'April-June', 'medium'
),
(
    'Santorini', 'Greece', 'South Aegean', 'beach',
    'Enjoy coastal views, blue-domed buildings, and seaside villages.',
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    'May-October', 'medium'
),
(
    'Serengeti', 'Tanzania', 'Mara', 'adventure',
    'Explore wildlife, open grasslands, and unforgettable safari experiences.',
    'https://images.unsplash.com/photo-1715945935232-0f9dd5bdcf01?auto=format&fit=crop&w=1200&q=80',
    'June-October', 'high'
),
(
    'Swiss Alps', 'Switzerland', 'Valais', 'mountains',
    'Experience mountain villages, snowy peaks, and scenic train rides.',
    'https://images.unsplash.com/photo-1687352868221-f0321319883b?auto=format&fit=crop&w=1200&q=80',
    'June-September', 'high'
),
(
    'Tokyo', 'Japan', 'Kanto', 'city',
    'Explore busy streets, traditional temples, and unique food spots.',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    'March-May', 'low'
),
(
    'Yosemite', 'United States', 'California', 'mountains',
    'Explore granite cliffs, waterfalls, forests, and hiking trails.',
    'https://images.unsplash.com/photo-1708913156945-df01fdf89809?auto=format&fit=crop&w=1200&q=80',
    'May-September', 'medium'
);
