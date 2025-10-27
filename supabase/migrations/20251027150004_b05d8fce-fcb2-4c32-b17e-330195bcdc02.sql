-- Create stores table
CREATE TABLE public.stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  address_text TEXT NOT NULL,
  niche_estimate TEXT,
  signals TEXT[],
  evidence_urls TEXT[],
  cpq_score DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (stores are publicly viewable)
CREATE POLICY "Stores are viewable by everyone" 
ON public.stores 
FOR SELECT 
USING (true);

-- Insert the store data
INSERT INTO public.stores (name, website, address_text, niche_estimate, signals, evidence_urls, cpq_score) VALUES
('A&C Super', 'https://www.aandcsuper.com/', '292 Leonard St, Brooklyn, NY 11211', 'Bread-forward neighborhood bakery–deli–grocery hybrid; house-made breads/pastries + coffee & sandos with a small grocery selection', ARRAY['Site tagline mentions bread, pastries, coffee & sandwiches', 'Lists itself as ''Bakery | Deli | Grocery'' on Instagram bio'], ARRAY['https://www.aandcsuper.com/', 'https://www.aandcsuper.com/about', 'https://www.instagram.com/aandcsuper/'], 0.50),
('Pop Up Grocer (Flagship + Café)', 'https://popupgrocer.com/', '205 Bleecker St, New York, NY 10012 (current flagship; past Williamsburg pop-ups)', 'Discovery grocery for emerging CPG brands + full café; rotating multi-brand assortment', ARRAY['Describes itself as ''discovery destination'' for new, better-for-you products', 'Flagship store + café with hundreds of emerging brands; public brand directory'], ARRAY['https://popupgrocer.com/pages/locations', 'https://popupgrocer.com/pages/cafe', 'https://popupgrocer.com/pages/directory'], 1.00),
('A.L.C. Italian Grocery', 'https://www.alcitaliangrocery.com/', '8613 3rd Ave, Brooklyn, NY 11209 (Bay Ridge)', 'Italian–American specialty grocery with prepared foods & sandwiches; broad imported brands', ARRAY['Neighborhood Italian grocery with prepared foods program', 'Sells imported and domestic Italian pantry items'], ARRAY['https://www.alcitaliangrocery.com/', 'https://www.facebook.com/ALCItalianGrocery/'], 0.80),
('Pecoraro Latteria', 'https://pecoraronyc.com/', '636 Metropolitan Ave, Brooklyn, NY 11211', 'Italian café + specialty grocery + restaurant; fresh mozzarella, Italian imports, and baked goods', ARRAY['Self-described ''unique cafe, specialty grocery, and restaurant''', 'Emphasizes quality Italian imports and domestic artisan products'], ARRAY['https://pecoraronyc.com/brooklyn-williamsburg-pecoraro-latteria-about', 'https://pecoraronyc.com/brooklyn-williamsburg-pecoraro-latteria-food-menu', 'https://www.instagram.com/pecoraro_latterianyc/'], 0.40),
('Campbell & Co. (Cheese • Café • Grocery • Catering)', 'https://campbellandco.nyc/', '502 Lorimer St, Brooklyn, NY 11211 (Williamsburg café)', 'Women-owned cheese shop + café + grocery + catering; heavy on local/indie brands (cheese, beer/cider, pantry)', ARRAY['Self-described ''café, grocery, and cheese shop'' with catering', 'Cheese case 100+ curated cheeses; beer & cider selection focused on local brews'], ARRAY['https://campbellandco.nyc/', 'https://campbellandco.nyc/campbell-cheese-502lorimer/', 'https://www.instagram.com/campbellandco.nyc/'], 0.75),
('Un Posto Italiano', 'https://www.unpostoitaliano.com/', '206 Garfield Pl, Brooklyn, NY 11215 (Park Slope)', 'Italian café + fresh pasta lab + grocery with wine/beer', ARRAY['Homepage header: ''Cafè Grocery Fresh Pasta, Wine and Beer''', 'Operates as both café service and retail grocery for Italian goods'], ARRAY['https://www.unpostoitaliano.com/', 'https://www.yelp.com/biz/un-posto-italiano-brooklyn'], 0.50),
('Dépanneur', 'https://www.depanneur.com/', '242 Wythe Ave, Brooklyn, NY 11249', 'Québécois-inspired sandwich café + fine-foods grocery + culinary gift shop; many external indie brands', ARRAY['Site tagline lists sandwiches, coffee/pastries + ''find that missing ingredient, gift or guilty pleasure''', 'Gift baskets / grocery and wine, plus café menu'], ARRAY['https://www.depanneur.com/', 'https://www.depanneur.com/menu', 'https://www.depanneur.com/gift-baskets'], 0.85),
('Ten Ichi Mart & Deli', 'https://www.instagram.com/tenichimart/', '188 Berry St, Brooklyn, NY 11249', 'Japanese grocery + deli/hot foods; snacks, onigiri, sushi, prepared bento', ARRAY['Instagram and Yelp show Japanese grocery plus deli with hot food & sushi', 'Daily half-price sushi/hot food after 8pm indicates robust prepared-food program'], ARRAY['https://www.instagram.com/tenichimart/', 'https://www.yelp.com/biz/ten-ichi-mart-and-deli-brooklyn'], 0.90),
('Yun Hai Shop – A Taiwanese General Store', 'https://yunhai.shop/pages/yun-hai-shop-a-taiwanese-general-store', '170 Montrose Ave, Brooklyn, NY 11206', 'Taiwanese imports–only general store; pantry goods and lifestyle items, events', ARRAY['Positions as a ''Taiwanese General Store'' with Taiwanese pantry imports', 'Hosts events/collabs and carries multiple Taiwanese brands'], ARRAY['https://yunhai.shop/pages/yun-hai-shop-a-taiwanese-general-store', 'https://yunhai.shop/', 'https://www.yelp.com/biz/yun-hai-shop-brooklyn-3'], 0.70),
('Ubi Market', 'https://www.instagram.com/ubimarket_nyc/', '655 Grand St, Brooklyn, NY 11211', 'Asian grocery (Japan/Korea focus) + juice/bubble-tea bar', ARRAY['Instagram post announces ''Asian Grocery store specializing in a variety of imported goods from Japan, Korea, and other…''', 'Delivery menus show smoothies/juices and bubble tea alongside grocery'], ARRAY['https://www.instagram.com/p/CyeJ36fu5jV/', 'https://www.grubhub.com/restaurant/ubi-market-655-grand-st-brooklyn/6945992', 'https://www.yelp.com/biz/ubi-market-brooklyn'], 0.80),
('Marlow & Daughters', 'https://www.marlowanddaughters.com/', '95 Broadway, Brooklyn, NY 11249', 'Whole-animal butcher + local-farm grocery + prepared foods; strong local purveyor network', ARRAY['Describes groceries and prepared foods in addition to the butcher counter', 'Online shop shows meats plus breads/pantry; works with local farms/purveyors'], ARRAY['https://www.marlowanddaughters.com/', 'https://www.marlowanddaughters.com/store/?p=7'], 0.60);