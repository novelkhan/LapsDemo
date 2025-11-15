using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale.Ami;
using Utilities;

namespace Laps.Passengers.Service.Interface
{
    public interface IPassengerRepository
    {
        List<Trains> PopulateTrainsCombo();
        List<TrainRoutes> PopulateRoutesCombo();
        List<TrainClass> PopulateClasssCombo();
        string SavePassenger(Passenger psngr);
        string DeletePassenger(int id);
        GridEntity<Passenger> PassengerGrid(GridOptions options);
        List<Passenger> GetPassengerReport();
    }
}
