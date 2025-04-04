import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getCustomerRentals, getFilmDetails, deleteRental } from '../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, AlertCircle } from 'lucide-react';

const RentalHistory = () => {
  const { selectedUser } = useUser();
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchRentals = async () => {
      if (!selectedUser?.customer_id) return;

      try {
        setIsLoading(true);
        setError(null);

        const rentalsData = await getCustomerRentals(selectedUser.customer_id);
        const rentalsWithTitles = await Promise.all(
          rentalsData.map(async (rental) => {
            try {
              const film = await getFilmDetails(rental.film_id);
              return { ...rental, film_title: film.title };
            } catch {
              return { ...rental, film_title: 'Película no disponible' };
            }
          })
        );

        setRentals(rentalsWithTitles);
      } catch (err) {
        setError("No se pudieron cargar las rentas.");
        if (import.meta.env.DEV) {
          setRentals([
            {
              rental_id: 1,
              rental_date: "2023-05-10T12:00:00Z",
              return_date: "2023-05-17T12:00:00Z",
              film_id: 1,
              film_title: "ACADEMY DINOSAUR"
            }
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentals();
  }, [selectedUser]);

  const handleDeleteRental = async (rentalId) => {
    if (!window.confirm(`¿Eliminar renta #${rentalId}?`)) return;
    try {
      setDeletingId(rentalId);
      await deleteRental(rentalId);
      setRentals(prev => prev.filter(r => r.rental_id !== rentalId));
      alert(`Renta #${rentalId} eliminada`);
    } catch (error) {
      setError("Error al eliminar la renta");
    } finally {
      setDeletingId(null);
    }
  };

  if (!selectedUser?.customer_id) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-semibold mb-4">Por favor selecciona un usuario</h2>
        <Button onClick={() => navigate('/')}>Seleccionar Usuario</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Historial de Rentas</h1>
          <p className="text-muted-foreground">{selectedUser.first_name} {selectedUser.last_name}</p>
        </div>
        <Button onClick={() => navigate('/rental')}>Nueva Renta</Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 border border-red-300 p-4 rounded-md mb-6">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse h-24 bg-muted" />
          ))}
        </div>
      ) : rentals.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No hay rentas registradas</p>
          <Button onClick={() => navigate('/rental')}>Realizar primera renta</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {rentals.map(rental => (
            <Card key={rental.rental_id} className="hover:shadow-md transition">
              <CardContent className="flex justify-between items-center py-4">
                <div>
                  <h3 className="font-medium text-lg">{rental.film_title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Renta: {new Date(rental.rental_date).toLocaleDateString()} | Devolución: {new Date(rental.return_date).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={deletingId === rental.rental_id}
                  onClick={() => handleDeleteRental(rental.rental_id)}
                >
                  {deletingId === rental.rental_id ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalHistory;
