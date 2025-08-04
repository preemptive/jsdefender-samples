import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart, Star, Users, Globe, Film, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getPlanetData } from '@/lib/utils';

interface Planet {
  name: string;
  url: string;
  climate: string;
  terrain: string;
  population: string;
  gravity: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  films: string;
}

export default function StarWarsExplorer() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('starwars-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const resp = await getPlanetData();
        const mockPlanetsNew = resp?.data?.results ?? [];

        setPlanets(mockPlanetsNew);
        
        toast({
          title: "Data Loaded Successfully!",
          description: `Found ${mockPlanetsNew.length} planets from the galaxy far, far away...`,
        });
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error",
          description: "Failed to load Star Wars data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [toast]);

  // Toggle favorite
  const toggleFavorite = (planetUrl: string) => {
    const newFavorites = favorites.includes(planetUrl)
      ? favorites.filter(fav => fav !== planetUrl)
      : [...favorites, planetUrl];
    
    setFavorites(newFavorites);
    localStorage.setItem('starwars-favorites', JSON.stringify(newFavorites));
    
    toast({
      title: favorites.includes(planetUrl) ? "Removed from favorites" : "Added to favorites",
      description: "Your favorites have been updated.",
    });
  };

  // Filter and sort characters
  const filteredPlanets = useMemo(() => {

    const filtered = planets.filter(planet => {
      const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'population':
          return (parseInt(a.population) || 0) - (parseInt(b.population) || 0);
        case 'diameter':{
          return parseInt(a.diameter)- parseInt(b.diameter);
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [planets, searchTerm, sortBy]);

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredPlanets.length / itemsPerPage);
  const paginatedPlanets = filteredPlanets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Loading the Galaxy...</h2>
          <p className="text-muted-foreground">Fetching data from a galaxy far, far away</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-gradient">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Star Wars Explorer
            </h1>
          </div>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search planets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="population">Population</SelectItem>
                <SelectItem value="diameter">Diameter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {filteredPlanets.length} planets
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {favorites.length} favorites
            </span>
          </div>
        </div>
      </header>

      {/* Character Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedPlanets.map((planet) => (
            <Card
              key={planet.url}
              className="relative border-border/50 bg-card/90 backdrop-blur-sm hover:shadow-neon transition-all duration-300 hover:scale-105"
            >
              <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 p-2"
                  onClick={() => toggleFavorite(planet.url)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(planet.url)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {planet.name}
                </h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Climate:</span>{" "}
                    {planet.climate}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Terrain:</span>{" "}
                    {planet.terrain}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Population:</span>{" "}
                    {planet.population === "unknown" ? "Unknown" : Number(planet.population).toLocaleString()}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Gravity:</span>{" "}
                    {planet.gravity}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Diameter:</span>{" "}
                    {planet.diameter} km
                  </p>
                  <p>
                    <span className="text-muted-foreground">Orbital Period:</span>{" "}
                    {planet.orbital_period} days
                  </p>
                  <p>
                    <span className="text-muted-foreground">Rotation Period:</span>{" "}
                    {planet.rotation_period} hours
                  </p>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  Appears in {planet.films.length} films
                </div>
              </div>
            </Card>
          ))}
        </div>


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-primary" : ""}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredPlanets.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No planets found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}